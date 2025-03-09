import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESLint,
} from "@typescript-eslint/utils";

import { getConstructorPropertyNames } from "../utils/parseType";
import { isConstructType } from "../utils/typeCheck";

type MessageIds = "requirePassingThis";
type Options = [
  {
    allowNonThisAndDisallowScope?: boolean;
  }
];

type Context = TSESLint.RuleContext<MessageIds, Options>;

/**
 * Enforces that `this` is passed to the constructor
 * @param context - The rule context provided by ESLint
 * @returns An object containing the AST visitor functions
 * @see {@link https://eslint-cdk-plugin.dev/rules/require-passing-this} - Documentation
 */
export const requirePassingThis = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: "problem",
    docs: {
      description: "Require passing `this` in a constructor.",
    },
    messages: {
      requirePassingThis: "Require passing `this` in a constructor.",
    },
    schema: [
      {
        type: "object",
        properties: {
          allowNonThisAndDisallowScope: {
            type: "boolean",
            default: false,
          },
        },
        additionalProperties: false,
      },
    ],
    fixable: "code",
  },
  defaultOptions: [
    {
      allowNonThisAndDisallowScope: false,
    },
  ],
  create(context: Context) {
    // Note: We keep the option for backward compatibility and documentation purposes,
    // but the default behavior is now to allow non-this values for non-scope parameters
    const parserServices = ESLintUtils.getParserServices(context);
    return {
      NewExpression(node) {
        const type = parserServices.getTypeAtLocation(node);

        if (!isConstructType(type) || !node.arguments.length) return;

        const argument = node.arguments[0];
        if (argument.type === AST_NODE_TYPES.ThisExpression) return;

        const constructorPropertyNames = getConstructorPropertyNames(type);
        const firstParamName = constructorPropertyNames[0];

        // If the first parameter is not named 'scope', we don't enforce passing 'this'
        if (firstParamName !== "scope") return;

        context.report({
          node,
          messageId: "requirePassingThis",
          fix: (fixer) => {
            return fixer.replaceText(argument, "this");
          },
        });
      },
    };
  },
});
