import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import { ClassDeclaration, Node, Type, isIdentifier } from "typescript";

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
          // NOTE: check property signature
          if (
            property.type !== AST_NODE_TYPES.TSPropertySignature ||
            property.key.type !== AST_NODE_TYPES.Identifier
          ) {
            continue;
          }
          const type = parserServices.getTypeAtLocation(property);

          // NOTE: In order not to make it dependent on the typescript library, it defines its own unions.
          //       Therefore, the type information structures do not match.
          // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
          const isClass = type.symbol?.flags === SYMBOL_FLAGS.CLASS;
          if (!isClass) continue;

          // Check if it inherits from Resource
          if (!isResourceType(type)) continue;

          // Check if it implements an interface that matches the class name
          if (!shouldReportError(type)) continue;

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
 * Check if we should report an error for this type
 * Error should be reported if the class implements an interface that matches the class name pattern
 */
const shouldReportError = (type: Type): boolean => {
  if (!type.symbol?.name) return false;

  const className = type.symbol.name;

  // Skip specific class names
  if (className === "Resource" || className === "Construct") return false;

  const implementedInterfaces = getImplementedInterfaceNames(type);
  console.log(
    "🚀 ~ shouldReportError ~ implementedInterfaces:",
    implementedInterfaces
  );

  // Check if any implemented interface matches the class name pattern
  return implementedInterfaces.some((interfaceName) => {
    // Pattern 1: Class name with I prefix (e.g., Bucket -> IBucket)
    if (interfaceName === `I${className}`) return true;

    // Pattern 2: Remove Base suffix and add I prefix (e.g., BaseService -> IService)
    if (className.endsWith("Base")) {
      const nameWithoutBase = className.slice(0, -4); // Remove "Base"
      if (interfaceName === `I${nameWithoutBase}`) return true;
    }

    return false;
  });
};

const getImplementedInterfaceNames = (type: Type): string[] => {
  const interfaces: string[] = [];

  // Get the symbol from the type
  const symbol = type.getSymbol ? type.getSymbol() : type.symbol;
  if (!symbol) {
    return interfaces;
  }

  // Get declarations from the symbol
  const declarations = symbol.getDeclarations
    ? symbol.getDeclarations()
    : symbol.declarations;
  if (!declarations || declarations.length === 0) {
    return interfaces;
  }

  // Find the class declaration and check heritage clauses
  for (const declaration of declarations) {
    // Check if this is a class declaration with heritage clauses
    if (isClassDeclaration(declaration) && declaration.heritageClauses) {
      // Look for implements clauses
      for (const heritageClause of declaration.heritageClauses) {
        // NOTE: In order not to make it dependent on the typescript library, it defines its own unions.
        //       Therefore, the type information structures do not match.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
        if (heritageClause.token === SYNTAX_KIND.IMPLEMENTS_KEYWORD) {
          // Get the name of each implemented interface
          for (const typeNode of heritageClause.types) {
            if (typeNode.expression && isIdentifier(typeNode.expression)) {
              const interfaceName = typeNode.expression.text;
              interfaces.push(interfaceName);
            }
          }
        }
      }
    }
  }

  return interfaces;
};

const isClassDeclaration = (node: Node): node is ClassDeclaration => {
  // NOTE: In order not to make it dependent on the typescript library, it defines its own unions.
  //       Therefore, the type information structures do not match.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
  return node.kind === SYNTAX_KIND.CLASS_DECLARATION;
};
