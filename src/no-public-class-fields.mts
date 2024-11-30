import {
  AST_NODE_TYPES,
  ESLintUtils,
  ParserServicesWithTypeInformation,
  TSESLint,
  TSESTree,
} from "@typescript-eslint/utils";
import { SymbolFlags, TypeChecker } from "typescript";

import { isConstructOrStackType } from "./utils/isConstructOrStackType.mjs";

type Context = TSESLint.RuleContext<"noPublicClassFields", []>;

/**
 * Disallow class types in public class fields
 * @param context - The rule context provided by ESLint
 * @returns An object containing the AST visitor functions
 * @see {@link https://eslint-cdk-plugin.dev/rules/no-public-class-fields} - Documentation
 */
export const noPublicClassFields = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow class types in public class fields",
    },
    messages: {
      noPublicClassFields:
        "Public field '{{ propertyName }}' should not use class type '{{ typeName }}'. Consider using an interface or type alias instead.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const typeChecker = parserServices.program.getTypeChecker();
    return {
      ClassDeclaration(node) {
        const type = typeChecker.getTypeAtLocation(
          parserServices.esTreeNodeToTSNodeMap.get(node)
        );
        if (!isConstructOrStackType(type)) {
          return;
        }

        // NOTE: Check class members
        validateClassMember({
          node,
          context,
          parserServices,
          typeChecker,
        });

        // NOTE: Check constructor parameter properties
        const constructor = node.body.body.find(
          (member): member is TSESTree.MethodDefinition =>
            member.type === AST_NODE_TYPES.MethodDefinition &&
            member.kind === "constructor"
        );
        if (
          !constructor ||
          constructor.value.type !== AST_NODE_TYPES.FunctionExpression
        ) {
          return;
        }
        validateConstructorParameterProperty({
          constructor,
          context,
          parserServices,
          typeChecker,
        });
      },
    };
  },
});

/**
 * check the public variable of the class
 * - if it is a class type, report an error
 */
const validateClassMember = ({
  node,
  context,
  parserServices,
  typeChecker,
}: {
  node: TSESTree.ClassDeclaration;
  context: Context;
  parserServices: ParserServicesWithTypeInformation;
  typeChecker: TypeChecker;
}) => {
  for (const member of node.body.body) {
    if (
      member.type !== AST_NODE_TYPES.PropertyDefinition ||
      member.key.type !== AST_NODE_TYPES.Identifier
    ) {
      continue;
    }

    // NOTE: Skip private and protected fields
    if (["private", "protected"].includes(member.accessibility ?? "")) {
      continue;
    }

    // NOTE: Skip fields without type annotation
    if (!member.typeAnnotation) {
      continue;
    }

    const tsNode = parserServices.esTreeNodeToTSNodeMap.get(member);
    const type = typeChecker.getTypeAtLocation(tsNode);

    if (!type.symbol) continue;

    const isClass = type.symbol.flags === SymbolFlags.Class;
    if (!isClass) continue;

    context.report({
      node: member,
      messageId: "noPublicClassFields",
      data: {
        propertyName: member.key.name,
        typeName: type.symbol.name,
      },
    });
  }
};

/**
 * check the constructor parameter property
 * - if it is a class type, report an error
 */
const validateConstructorParameterProperty = ({
  constructor,
  context,
  parserServices,
  typeChecker,
}: {
  constructor: TSESTree.MethodDefinition;
  context: Context;
  parserServices: ParserServicesWithTypeInformation;
  typeChecker: TypeChecker;
}) => {
  for (const param of constructor.value.params) {
    if (
      param.type !== AST_NODE_TYPES.TSParameterProperty ||
      param.parameter.type !== AST_NODE_TYPES.Identifier
    ) {
      continue;
    }

    // NOTE: Skip private and protected parameters
    if (["private", "protected"].includes(param.accessibility ?? "")) {
      continue;
    }

    // NOTE: Skip parameters without type annotation
    if (!param.parameter.typeAnnotation) {
      continue;
    }

    const tsNode = parserServices.esTreeNodeToTSNodeMap.get(param);
    const type = typeChecker.getTypeAtLocation(tsNode);

    if (!type.symbol) continue;

    const isClass = type.symbol.flags === SymbolFlags.Class;
    if (!isClass) continue;

    context.report({
      node: param,
      messageId: "noPublicClassFields",
      data: {
        propertyName: param.parameter.name,
        typeName: type.symbol.name,
      },
    });
  }
};
