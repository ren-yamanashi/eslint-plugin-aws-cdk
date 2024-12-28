import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import { isConstructType, isStackType } from "./utils/typeCheck.js";

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
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    return {
      NewExpression(node) {
        const type = parserServices.getTypeAtLocation(node);

        if (
          !isConstructType(type) ||
          isStackType(type) ||
          !node.arguments.length
        ) {
          return;
        }

        const argument = node.arguments[0];
        if (argument.type === AST_NODE_TYPES.ThisExpression) return;

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
