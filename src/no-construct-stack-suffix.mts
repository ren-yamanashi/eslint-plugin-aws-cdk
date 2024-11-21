import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESLint,
  TSESTree,
} from "@typescript-eslint/utils";

import { toPascalCase } from "./utils/convertString.mjs";

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
    return {
      ClassBody(node) {
        const parent = node.parent;
        if (parent?.type !== "ClassDeclaration") return;
        const className = parent.id?.name;
        if (!className) return;

        for (const body of node.body) {
          // NOTE: Ignore if neither method nor constructor.
          if (
            body.type !== AST_NODE_TYPES.MethodDefinition ||
            !["method", "constructor"].includes(body.kind) ||
            body.value.type !== AST_NODE_TYPES.FunctionExpression
          ) {
            continue;
          }
          validateConstructorBody(node, body.value, context);
        }
      },
    };
  },
});

/**
 * Validate the constructor body for the parent class
 * - validate each statement in the constructor body
 */
const validateConstructorBody = (
  node: TSESTree.ClassBody,
  expression: TSESTree.FunctionExpression,
  context: Context
): void => {
  for (const statement of expression.body.body) {
    switch (statement.type) {
      case AST_NODE_TYPES.VariableDeclaration: {
        const newExpression = statement.declarations[0].init;
        if (newExpression?.type !== AST_NODE_TYPES.NewExpression) continue;
        validateConstructId(node, context, newExpression);
        break;
      }
      case AST_NODE_TYPES.ExpressionStatement: {
        if (statement.expression?.type !== AST_NODE_TYPES.NewExpression) break;
        validateStatement(node, statement, context);
        break;
      }
      case AST_NODE_TYPES.IfStatement: {
        traverseStatements(node, statement.consequent, context);
        break;
      }
      case AST_NODE_TYPES.SwitchStatement: {
        for (const switchCase of statement.cases) {
          for (const statement of switchCase.consequent) {
            traverseStatements(node, statement, context);
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
 * - Validates construct IDs
 */
const traverseStatements = (
  node: TSESTree.ClassBody,
  statement: TSESTree.Statement,
  context: Context
): void => {
  switch (statement.type) {
    case AST_NODE_TYPES.BlockStatement: {
      for (const body of statement.body) {
        validateStatement(node, body, context);
      }
      break;
    }
    case AST_NODE_TYPES.ExpressionStatement: {
      const newExpression = statement.expression;
      if (newExpression?.type !== AST_NODE_TYPES.NewExpression) break;
      validateStatement(node, statement, context);
      break;
    }
    case AST_NODE_TYPES.VariableDeclaration: {
      const newExpression = statement.declarations[0].init;
      if (newExpression?.type !== AST_NODE_TYPES.NewExpression) break;
      validateConstructId(node, context, newExpression);
      break;
    }
  }
};

/**
 * Validate a single statement in the AST
 * - Handles different types of statements (Variable, Expression, If, Switch)
 * - Extracts and validates construct IDs from new expressions
 */
const validateStatement = (
  node: TSESTree.ClassBody,
  body: TSESTree.Statement,
  context: Context
): void => {
  switch (body.type) {
    case AST_NODE_TYPES.VariableDeclaration: {
      const newExpression = body.declarations[0].init;
      if (newExpression?.type !== AST_NODE_TYPES.NewExpression) break;
      validateConstructId(node, context, newExpression);
      break;
    }
    case AST_NODE_TYPES.ExpressionStatement: {
      const newExpression = body.expression;
      if (newExpression?.type !== AST_NODE_TYPES.NewExpression) break;
      validateConstructId(node, context, newExpression);
      break;
    }
    case AST_NODE_TYPES.IfStatement: {
      validateIfStatement(node, body, context);
      break;
    }
    case AST_NODE_TYPES.SwitchStatement: {
      validateSwitchStatement(node, body, context);
      break;
    }
  }
};

/**
 * Validate the `if` statement
 * - Validate recursively if `if` statements are nested
 */
const validateIfStatement = (
  node: TSESTree.ClassBody,
  ifStatement: TSESTree.IfStatement,
  context: Context
): void => {
  traverseStatements(node, ifStatement.consequent, context);
};

/**
 * Validate the `switch` statement
 * - Validate recursively if `switch` statements are nested
 */
const validateSwitchStatement = (
  node: TSESTree.ClassBody,
  switchStatement: TSESTree.SwitchStatement,
  context: Context
): void => {
  for (const statement of switchStatement.cases) {
    for (const _consequent of statement.consequent) {
      traverseStatements(node, _consequent, context);
    }
  }
};

/**
 * Validate that construct ID does not end with "Construct" or "Stack"
 */
const validateConstructId = (
  node: TSESTree.ClassBody,
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
