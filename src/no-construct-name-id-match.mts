import { Rule } from "eslint";
import { NewExpression, Node } from "estree";

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

const validateConstructId = <T extends Node>(
  node: T,
  context: Rule.RuleContext,
  expression: NewExpression
) => {
  if (expression.arguments.length < 2) return;

  // NOTE: Treat the second argument as ID
  const secondArg = expression.arguments[1];
  if (secondArg.type !== "Literal" || typeof secondArg.value !== "string") {
    return;
  }

  const constructId = toPascalCase(secondArg.value as string);
  const constructName = toPascalCase(
    (() => {
      const callee = expression.callee;
      if (callee.type === "Identifier") return callee.name;
      if (
        callee.type === "MemberExpression" &&
        callee.property.type === "Identifier"
      ) {
        return callee.property.name;
      }
      return "";
    })()
  );

  if (constructName === constructId) {
    context.report({
      node,
      messageId: "constructNameIdMatch",
    });
  }
};

export const noConstructNameIdMatch: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce that the construct name does not match the ID.",
    },
    messages: {
      constructNameIdMatch:
        "The configuration construct name must not match the ID",
    },
    schema: [],
  },
  create(context) {
    return {
      ExpressionStatement(node) {
        if (node.expression.type !== "NewExpression") return;
        validateConstructId(node, context, node.expression);
      },
      VariableDeclaration(node) {
        if (!node.declarations.length) return;
        for (const declaration of node.declarations) {
          if (declaration.init?.type !== "NewExpression") return;
          validateConstructId(node, context, declaration.init);
        }
      },
    };
  },
};
