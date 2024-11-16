import { Rule } from "eslint";
import { NewExpression, Node } from "estree";

import { toPascalCase } from "./utils/convertString";

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
      description: "Enforce that construct name does not match the id.",
    },
    messages: {
      constructNameIdMatch:
        "The configuration construct name must not match the id",
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
