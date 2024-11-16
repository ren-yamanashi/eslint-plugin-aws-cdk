import { Rule } from "eslint";
import { Expression, Node, SpreadElement } from "estree";

import { toPascalCase } from "./utils/convertString";

const QUOTE_TYPE = {
  SINGLE: "'",
  DOUBLE: '"',
} as const;

type QuoteType = (typeof QUOTE_TYPE)[keyof typeof QUOTE_TYPE];

/**
 * check if the string is PascalCase
 * @param str - The string to check
 * @returns true if the string is PascalCase, false otherwise
 */
const isPascalCase = (str: string) => {
  return /^[A-Z][a-zA-Z0-9]*$/.test(str);
};

const validateConstructId = <T extends Node>(
  node: T,
  context: Rule.RuleContext,
  args: (SpreadElement | Expression)[]
) => {
  if (args.length < 2) return;

  // NOTE: Treat the second argument as ID
  const secondArg = args[1];
  if (secondArg.type !== "Literal" || typeof secondArg.value !== "string") {
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

export const pascalCaseConstructId: Rule.RuleModule = {
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
  create(context) {
    return {
      ExpressionStatement(node) {
        if (node.expression.type !== "NewExpression") return;
        validateConstructId(node, context, node.expression.arguments);
      },
      VariableDeclaration(node) {
        if (!node.declarations.length) return;
        for (const declaration of node.declarations) {
          if (declaration.init?.type !== "NewExpression") return;
          validateConstructId(node, context, declaration.init.arguments);
        }
      },
    };
  },
};
