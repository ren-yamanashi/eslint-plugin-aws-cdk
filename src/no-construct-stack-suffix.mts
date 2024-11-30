import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESLint,
  TSESTree,
} from "@typescript-eslint/utils";

import { toPascalCase } from "./utils/convertString.mjs";
import { isConstructOrStackType } from "./utils/isConstructOrStackType.mjs";

type Context = TSESLint.RuleContext<"noConstructStackSuffix", []>;

/**
 * Enforces that Construct IDs do not end with 'Construct' or 'Stack' suffix
 * @param context - The rule context provided by ESLint
 * @returns An object containing the AST visitor functions
 * @see {@link https://eslint-cdk-plugin.dev/rules/no-construct-stack-suffix} - Documentation
 */
export const noConstructStackSuffix = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: "problem",
    docs: {
      description:
        "Effort to avoid using 'Construct' and 'Stack' suffix in construct id.",
    },
    messages: {
      noConstructStackSuffix:
        "{{ classType }} ID '{{ id }}' should not include {{ suffix }} suffix.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();
    return {
      NewExpression(node) {
        const type = checker.getTypeAtLocation(
          parserServices.esTreeNodeToTSNodeMap.get(node)
        );
        if (!isConstructOrStackType(type)) {
          return;
        }

        if (node.arguments.length < 2) return;

        validateConstructId(node, context, node);
      },
    };
  },
});

/**
 * Validate that construct ID does not end with "Construct" or "Stack"
 */
const validateConstructId = (
  node: TSESTree.Node,
  context: Context,
  expression: TSESTree.NewExpression
): void => {
  if (expression.arguments.length < 2) return;

  // NOTE: Treat the second argument as ID
  const secondArg = expression.arguments[1];
  if (
    secondArg.type !== AST_NODE_TYPES.Literal ||
    typeof secondArg.value !== "string"
  ) {
    return;
  }

  const formattedConstructId = toPascalCase(secondArg.value as string);

  if (formattedConstructId.endsWith("Construct")) {
    context.report({
      node,
      messageId: "noConstructStackSuffix",
      data: {
        classType: "Construct",
        id: secondArg.value,
        suffix: "Construct",
      },
    });
  } else if (formattedConstructId.endsWith("Stack")) {
    context.report({
      node,
      messageId: "noConstructStackSuffix",
      data: {
        classType: "Stack",
        id: secondArg.value,
        suffix: "Stack",
      },
    });
  }
};
