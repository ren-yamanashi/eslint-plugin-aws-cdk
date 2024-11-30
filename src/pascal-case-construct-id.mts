import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESLint,
  TSESTree,
} from "@typescript-eslint/utils";

import { toPascalCase } from "./utils/convertString.mjs";
import { isConstructOrStackType } from "./utils/isConstructOrStackType.mjs";

const QUOTE_TYPE = {
  SINGLE: "'",
  DOUBLE: '"',
} as const;

type QuoteType = (typeof QUOTE_TYPE)[keyof typeof QUOTE_TYPE];

type Context = TSESLint.RuleContext<"pascalCaseConstructId", []>;

/**
/**
 * Enforce PascalCase for Construct ID.
 * @param context - The rule context provided by ESLint
 * @returns An object containing the AST visitor functions
 * @see {@link https://eslint-cdk-plugin.dev/rules/pascal-case-construct-id} - Documentation
 */
export const pascalCaseConstructId = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: "problem",
    docs: {
      description: "Enforce PascalCase for Construct ID.",
    },
    messages: {
      pascalCaseConstructId: "Construct ID must be PascalCase.",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();
    return {
      // ExpressionStatement(node) {
      //   if (node.expression.type !== AST_NODE_TYPES.NewExpression) return;
      //   validateConstructId(node, context, node.expression.arguments);
      // },
      // VariableDeclaration(node) {
      //   if (!node.declarations.length) return;
      //   for (const declaration of node.declarations) {
      //     if (declaration.init?.type !== AST_NODE_TYPES.NewExpression) return;
      //     validateConstructId(node, context, declaration.init.arguments);
      //   }
      // },
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
 * check if the string is PascalCase
 * @param str - The string to check
 * @returns true if the string is PascalCase, false otherwise
 */
const isPascalCase = (str: string) => {
  return /^[A-Z][a-zA-Z0-9]*$/.test(str);
};

/**
 * Check the construct ID is PascalCase
 */
const validateConstructId = (
  node: TSESTree.Node,
  context: Context,
  expression: TSESTree.NewExpression
) => {
  if (expression.arguments.length < 2) return;

  // NOTE: Treat the second argument as ID
  const secondArg = expression.arguments[1];
  if (
    secondArg.type !== AST_NODE_TYPES.Literal ||
    typeof secondArg.value !== "string"
  ) {
    return;
  }

  const quote: QuoteType = secondArg.raw?.startsWith('"')
    ? QUOTE_TYPE.DOUBLE
    : QUOTE_TYPE.SINGLE;

  if (!isPascalCase(secondArg.value)) {
    context.report({
      node,
      messageId: "pascalCaseConstructId",
      fix: (fixer) => {
        const pascalCaseValue = toPascalCase(secondArg.value as string);
        return fixer.replaceText(
          secondArg,
          `${quote}${pascalCaseValue}${quote}`
        );
      },
    });
  }
};
