import { Rule } from "eslint";

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

/**
 * Convert a string to PascalCase
 * @param str - The string to convert
 * @returns The PascalCase string
 */
const toPascalCase = (str: string) => {
  return str
    .split(/[-_\s]/)
    .map((word) => {
      // Consider camelCase, split by uppercase letters
      return word
        .replace(/([A-Z])/g, " $1")
        .split(/\s+/)
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join("");
    })
    .join("");
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
        if (
          node.type !== "ExpressionStatement" ||
          node.expression.type !== "NewExpression"
        ) {
          return;
        }

        const args = node.expression.arguments;
        if (args.length < 2) return;

        // NOTE: Treat the second argument as ID
        const secondArg = args[1];
        if (
          secondArg.type !== "Literal" ||
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
      },
    };
  },
};
