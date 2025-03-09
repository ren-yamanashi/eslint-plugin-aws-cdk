import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESLint,
  TSESTree,
} from "@typescript-eslint/utils";

import { isConstructType } from "../utils/typeCheck";

type Options = [];
type MessageIds = "invalidConstructorSignature";

/**
 * Enforces that constructors of classes extending Construct have the signature "scope, id" or "scope, id, props"
 * @param context - The rule context provided by ESLint
 * @returns An object containing the AST visitor functions
 * @see {@link https://eslint-cdk-plugin.dev/rules/construct-constructor-signature} - Documentation
 */
export const constructConstructorSignature =
  ESLintUtils.RuleCreator.withoutDocs<Options, MessageIds>({
    meta: {
      type: "problem",
      docs: {
        description:
          "Enforces that constructors of classes extending Construct have the signature 'scope, id' or 'scope, id, props'",
      },
      messages: {
        invalidConstructorSignature:
          "Constructor of a class extending Construct must have the signature 'scope, id' or 'scope, id, props'",
      },
      schema: [],
    },
    defaultOptions: [],
    create(context) {
      const parserServices = ESLintUtils.getParserServices(context);

      return {
        ClassDeclaration(node) {
          // Skip if the class doesn't have a superclass
          if (!node.superClass) return;

          // Get the type of the superclass
          const superClassType = parserServices.getTypeAtLocation(
            node.superClass
          );

          // Skip if the class doesn't extend Construct
          if (!isConstructType(superClassType)) return;

          // Find the constructor method
          const constructor = node.body.body.find(
            (member): member is TSESTree.MethodDefinition =>
              member.type === AST_NODE_TYPES.MethodDefinition &&
              member.kind === "constructor"
          );

          // Skip if there's no constructor
          if (!constructor) return;

          validateConstructorSignature(constructor, context);
        },
      };
    },
  });

/**
 * Validates that the constructor has the signature "scope, id" or "scope, id, props"
 */
const validateConstructorSignature = (
  constructor: TSESTree.MethodDefinition,
  context: TSESLint.RuleContext<MessageIds, Options>
): void => {
  const params = constructor.value.params;

  // Check if the constructor has at least 2 parameters
  if (params.length < 2) {
    context.report({
      node: constructor,
      messageId: "invalidConstructorSignature",
    });
    return;
  }

  // Check if the constructor has more than 3 parameters
  if (params.length > 3) {
    context.report({
      node: constructor,
      messageId: "invalidConstructorSignature",
    });
    return;
  }

  // Check if the first parameter is named "scope"
  const firstParam = params[0];
  if (
    firstParam.type === AST_NODE_TYPES.Identifier &&
    firstParam.name !== "scope"
  ) {
    context.report({
      node: constructor,
      messageId: "invalidConstructorSignature",
    });
    return;
  }

  // Check if the second parameter is named "id"
  const secondParam = params[1];
  if (
    secondParam.type === AST_NODE_TYPES.Identifier &&
    secondParam.name !== "id"
  ) {
    context.report({
      node: constructor,
      messageId: "invalidConstructorSignature",
    });
    return;
  }

  // If there's a third parameter, check if it's named "props"
  if (params.length === 3) {
    const thirdParam = params[2];
    if (
      thirdParam.type === AST_NODE_TYPES.Identifier &&
      thirdParam.name !== "props"
    ) {
      context.report({
        node: constructor,
        messageId: "invalidConstructorSignature",
      });
      return;
    }
  }
};
