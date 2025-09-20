import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import {
  ClassDeclaration,
  HeritageClause,
  Identifier,
  Node,
  PropertyAccessExpression,
  Type,
} from "typescript";

import { SYMBOL_FLAGS, SYNTAX_KIND } from "../constants/tsInternalFlags";
import { createRule } from "../utils/createRule";
import { isResourceType } from "../utils/typeCheck";

/**
 * Enforces the use of interface types instead of CDK Construct types in interface properties
 * @param context - The rule context provided by ESLint
 * @returns An object containing the AST visitor functions
 */
export const noConstructInInterface = createRule({
  name: "no-construct-in-interface",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow CDK Construct types in interface properties",
    },
    messages: {
      invalidInterfaceProperty:
        "Interface property '{{ propertyName }}' should not use CDK Construct type '{{ typeName }}'. Consider using an interface or type alias instead.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    return {
      TSInterfaceDeclaration(node) {
        for (const property of node.body.body) {
          if (
            property.type !== AST_NODE_TYPES.TSPropertySignature ||
            property.key.type !== AST_NODE_TYPES.Identifier
          ) {
            continue;
          }
          const type = parserServices.getTypeAtLocation(property);

          if (
            !isClassType(type) ||
            !isResourceType(type) ||
            !shouldReportError(type)
          ) {
            continue;
          }

          context.report({
            node: property,
            messageId: "invalidInterfaceProperty",
            data: {
              propertyName: property.key.name,
              typeName: type.symbol.name,
            },
          });
        }
      },
    };
  },
});

/**
 * Check if we should report an error for this type\
 * Error should be reported if the class implements an interface that matches the class name pattern
 */
const shouldReportError = (type: Type): boolean => {
  if (!type.symbol?.name) return false;

  const className = type.symbol.name;
  if (className === "Resource" || className === "Construct") return false;

  const implementedInterfaces = getImplementedInterfaceNames(type);

  // Check if any implemented interface matches the class name pattern
  return implementedInterfaces.some((interfaceName) => {
    // Extract the simple interface name (remove namespace if present)
    const simpleInterfaceName = interfaceName.includes(".")
      ? interfaceName.split(".").pop() ?? interfaceName
      : interfaceName;

    // Pattern 1: Class name with I prefix (e.g., Bucket -> IBucket, FargateService -> IFargateService)
    if (simpleInterfaceName === `I${className}`) return true;

    // Pattern 2: Class name without `Base` suffix / prefix with the `I` prefix (e.g., BucketBase -> IBucket, BaseService -> IService)
    const classNameWithoutBase = className.replace(/^Base|Base$/g, "");
    if (simpleInterfaceName === `I${classNameWithoutBase}`) return true;

    return false;
  });
};

const getImplementedInterfaceNames = (type: Type): string[] => {
  const interfaces = new Set<string>();
  const processedTypes = new Set<string>();

  const collectInterfaces = (currentType: Type): void => {
    const symbol = currentType.getSymbol?.() ?? currentType.symbol;
    if (!symbol?.name) return;

    if (processedTypes.has(symbol.name)) return;
    processedTypes.add(symbol.name);

    const declarations = symbol.getDeclarations
      ? symbol.getDeclarations()
      : symbol.declarations;
    if (!declarations?.length) return;

    declarations.forEach((declaration) => {
      if (!isClassDeclaration(declaration) || !declaration.heritageClauses) {
        return;
      }

      declaration.heritageClauses.forEach((hc) => {
        if (!checkHeritageClauseIsImplements(hc)) return;

        hc.types.forEach((typeNode) => {
          if (typeNode.expression) {
            if (isIdentifier(typeNode.expression)) {
              // Simple interface name (e.g., IFargateService)
              interfaces.add(typeNode.expression.text);
            } else if (isPropertyAccessExpression(typeNode.expression)) {
              // Namespace qualified interface name (e.g., ecs.IFargateService)
              const namespace = typeNode.expression.expression;
              const interfaceName = typeNode.expression.name;
              if (isIdentifier(namespace) && isIdentifier(interfaceName)) {
                interfaces.add(`${namespace.text}.${interfaceName.text}`);
              }
            }
          }
        });
      });
    });

    const baseTypes = currentType.getBaseTypes?.() ?? [];
    baseTypes.forEach((baseType) => {
      if (isClassType(baseType)) collectInterfaces(baseType);
    });
  };

  collectInterfaces(type);
  return Array.from(interfaces);
};

// NOTE: In order not to make it dependent on the typescript library, it defines its own unions.
//       Therefore, the type information structures do not match.

const isClassType = (type: Type): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
  return type.symbol?.flags === SYMBOL_FLAGS.CLASS;
};

const isClassDeclaration = (node: Node): node is ClassDeclaration => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
  return node.kind === SYNTAX_KIND.CLASS_DECLARATION;
};

const isIdentifier = (node: Node): node is Identifier => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
  return node.kind === SYNTAX_KIND.IDENTIFIER;
};

const isPropertyAccessExpression = (
  node: Node
): node is PropertyAccessExpression => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
  return node.kind === SYNTAX_KIND.PROPERTY_ACCESS_EXPRESSION;
};

const checkHeritageClauseIsImplements = (node: HeritageClause): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
  return node.token === SYNTAX_KIND.IMPLEMENTS_KEYWORD;
};
