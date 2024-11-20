import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESLint,
  TSESTree,
} from "@typescript-eslint/utils";

import { toPascalCase } from "./utils/convertString.mjs";

type Context = TSESLint.RuleContext<"noParentNameConstructIdMatch", []>;

/**
 * Enforce that construct IDs does not match the parent construct name.
 * @param context - The rule context provided by ESLint
 * @returns An object containing the AST visitor functions
 * @see {@link https://eslint-cdk-plugin.dev/rules/no-parent-name-construct-id-match} - Documentation
 */
export const noParentNameConstructIdMatch = ESLintUtils.RuleCreator.withoutDocs(
  {
    meta: {
      type: "problem",
      docs: {
        description:
          "Enforce that construct IDs does not match the parent construct name.",
      },
      messages: {
        noParentNameConstructIdMatch:
          "Construct ID '{{ constructId }}' should not match parent construct name '{{ parentConstructName }}'. Use a more specific identifier.",
      },
      schema: [],
    },
    defaultOptions: [],
    create(context) {
      return {
        ClassBody(node) {
          const parent = node.parent;
          if (parent?.type !== AST_NODE_TYPES.ClassDeclaration) return;

          const parentClassName = parent.id?.name;
          if (!parentClassName) return;

          for (const body of node.body) {
            // NOTE: Ignore if neither method nor constructor.
            if (
              body.type !== AST_NODE_TYPES.MethodDefinition ||
              !["method", "constructor"].includes(body.kind) ||
              body.value.type !== AST_NODE_TYPES.FunctionExpression
            ) {
              continue;
            }
            validateConstructorBody({
              node,
              expression: body.value,
              parentClassName,
              context,
            });
          }
        },
      };
    },
  }
);

/**
 * Validate the constructor body for the parent class
 * - validate each statement in the constructor body
 */
const validateConstructorBody = <T extends TSESTree.ClassBody>({
  node,
  expression,
  parentClassName,
  context,
}: {
  node: T;
  expression: TSESTree.FunctionExpression;
  parentClassName: string;
  context: Context;
}): void => {
  for (const statement of expression.body.body) {
    switch (statement.type) {
      case AST_NODE_TYPES.VariableDeclaration: {
        const newExpression = statement.declarations[0].init;
        if (newExpression?.type !== AST_NODE_TYPES.NewExpression) continue;
        validateConstructId({
          node,
          context,
          expression: newExpression,
          parentClassName,
        });
        break;
      }
      case AST_NODE_TYPES.ExpressionStatement: {
        if (statement.expression?.type !== AST_NODE_TYPES.NewExpression) break;
        validateStatement({
          node,
          body: statement,
          parentClassName,
          context,
        });
        break;
      }
      case AST_NODE_TYPES.IfStatement: {
        traverseStatements({
          node,
          context,
          parentClassName,
          statement: statement.consequent,
        });
        break;
      }
      case AST_NODE_TYPES.SwitchStatement: {
        for (const switchCase of statement.cases) {
          for (const statement of switchCase.consequent) {
            traverseStatements({
              node,
              context,
              parentClassName,
              statement,
            });
          }
        }
        break;
      }
    }
  }
};

/**
 * Recursively traverse and validate statements in the AST
 * - Handles BlockStatement, ExpressionStatement, and VariableDeclaration
 * - Validates construct IDs against parent class name
 */
const traverseStatements = <T extends TSESTree.ClassBody>({
  node,
  statement,
  parentClassName,
  context,
}: {
  node: T;
  statement: TSESTree.Statement;
  parentClassName: string;
  context: Context;
}) => {
  switch (statement.type) {
    case AST_NODE_TYPES.BlockStatement: {
      for (const body of statement.body) {
        validateStatement({
          node,
          body,
          parentClassName,
          context,
        });
      }
      break;
    }
    case AST_NODE_TYPES.ExpressionStatement: {
      const newExpression = statement.expression;
      if (newExpression?.type !== AST_NODE_TYPES.NewExpression) break;
      validateStatement({
        node,
        body: statement,
        parentClassName,
        context,
      });
      break;
    }
    case AST_NODE_TYPES.VariableDeclaration: {
      const newExpression = statement.declarations[0].init;
      if (newExpression?.type !== AST_NODE_TYPES.NewExpression) break;
      validateConstructId({
        node,
        context,
        expression: newExpression,
        parentClassName,
      });
      break;
    }
  }
};

/**
 * Validate a single statement in the AST
 * - Handles different types of statements (Variable, Expression, If, Switch)
 * - Extracts and validates construct IDs from new expressions
 */
const validateStatement = <T extends TSESTree.ClassBody>({
  node,
  body,
  parentClassName,
  context,
}: {
  node: T;
  body: TSESTree.Statement;
  parentClassName: string;
  context: Context;
}): void => {
  switch (body.type) {
    case AST_NODE_TYPES.VariableDeclaration: {
      const newExpression = body.declarations[0].init;
      if (newExpression?.type !== AST_NODE_TYPES.NewExpression) break;
      validateConstructId({
        node,
        context,
        expression: newExpression,
        parentClassName,
      });
      break;
    }
    case AST_NODE_TYPES.ExpressionStatement: {
      const newExpression = body.expression;
      if (newExpression?.type !== AST_NODE_TYPES.NewExpression) break;
      validateConstructId({
        node,
        context,
        expression: newExpression,
        parentClassName,
      });
      break;
    }
    case AST_NODE_TYPES.IfStatement: {
      validateIfStatement({
        node,
        ifStatement: body,
        parentClassName,
        context,
      });
      break;
    }
    case AST_NODE_TYPES.SwitchStatement: {
      validateSwitchStatement({
        node,
        switchStatement: body,
        parentClassName,
        context,
      });
      break;
    }
  }
};

/**
 * Validate the `if` statement
 * - Validate recursively if `if` statements are nested
 */
const validateIfStatement = <T extends TSESTree.ClassBody>({
  node,
  ifStatement,
  parentClassName,
  context,
}: {
  node: T;
  ifStatement: TSESTree.IfStatement;
  parentClassName: string;
  context: Context;
}): void => {
  traverseStatements({
    node,
    context,
    parentClassName,
    statement: ifStatement.consequent,
  });
};

/**
 * Validate the `switch` statement
 * - Validate recursively if `switch` statements are nested
 */
const validateSwitchStatement = <T extends TSESTree.ClassBody>({
  node,
  switchStatement,
  parentClassName,
  context,
}: {
  node: T;
  switchStatement: TSESTree.SwitchStatement;
  parentClassName: string;
  context: Context;
}): void => {
  for (const statement of switchStatement.cases) {
    for (const _consequent of statement.consequent) {
      traverseStatements({
        node,
        context,
        parentClassName,
        statement: _consequent,
      });
    }
  }
};

/**
 * Validate that parent construct name and child id do not match
 */
const validateConstructId = <T extends TSESTree.ClassBody>({
  node,
  context,
  expression,
  parentClassName,
}: {
  node: T;
  context: Context;
  expression: TSESTree.NewExpression;
  parentClassName: string;
}): void => {
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
  const formattedParentClassName = toPascalCase(parentClassName);

  if (formattedParentClassName === formattedConstructId) {
    context.report({
      node,
      messageId: "noParentNameConstructIdMatch",
      data: {
        constructId: secondArg.value,
        parentConstructName: parentClassName,
      },
    });
  }
};
