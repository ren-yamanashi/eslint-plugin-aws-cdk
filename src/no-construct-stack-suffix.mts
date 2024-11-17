import { ESLintUtils, TSESLint, TSESTree } from "@typescript-eslint/utils";

import { toPascalCase } from "./utils/convertString.mjs";

type Context = TSESLint.RuleContext<"noConstructStackSuffix", []>;

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
          if (body.type !== "MethodDefinition") continue;
          if (
            body.kind === "constructor" &&
            body.value.type === "FunctionExpression"
          ) {
            validateConstructorBody(node, body.value, context);
          }
        }
      },
    };
  },
});

/**
 * Validate the constructor body for the parent class
 * - validate each statement in the constructor body
 */
const validateConstructorBody = <T extends TSESTree.ClassBody>(
  node: T,
  expression: TSESTree.FunctionExpression,
  context: Context
): void => {
  for (const statement of expression.body.body) {
    switch (statement.type) {
      case "VariableDeclaration": {
        const newExpression = statement.declarations[0].init;
        if (newExpression?.type !== "NewExpression") continue;
        validateConstructId(node, context, newExpression);
        break;
      }
      case "ExpressionStatement": {
        if (statement.expression?.type !== "NewExpression") break;
        validateStatement(node, statement, context);
        break;
      }
      case "IfStatement": {
        traverseStatements(node, statement.consequent, context);
        break;
      }
      case "SwitchStatement": {
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
const traverseStatements = <T extends TSESTree.ClassBody>(
  node: T,
  statement: TSESTree.Statement,
  context: Context
): void => {
  switch (statement.type) {
    case "BlockStatement": {
      for (const body of statement.body) {
        validateStatement(node, body, context);
      }
      break;
    }
    case "ExpressionStatement": {
      const newExpression = statement.expression;
      if (newExpression?.type !== "NewExpression") break;
      validateStatement(node, statement, context);
      break;
    }
    case "VariableDeclaration": {
      const newExpression = statement.declarations[0].init;
      if (newExpression?.type !== "NewExpression") break;
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
const validateStatement = <T extends TSESTree.ClassBody>(
  node: T,
  body: TSESTree.Statement,
  context: Context
): void => {
  switch (body.type) {
    case "VariableDeclaration": {
      const newExpression = body.declarations[0].init;
      if (newExpression?.type !== "NewExpression") break;
      validateConstructId(node, context, newExpression);
      break;
    }
    case "ExpressionStatement": {
      const newExpression = body.expression;
      if (newExpression?.type !== "NewExpression") break;
      validateConstructId(node, context, newExpression);
      break;
    }
    case "IfStatement": {
      validateIfStatement(node, body, context);
      break;
    }
    case "SwitchStatement": {
      validateSwitchStatement(node, body, context);
      break;
    }
  }
};

/**
 * Validate the `if` statement
 * - Validate recursively if `if` statements are nested
 */
const validateIfStatement = <T extends TSESTree.ClassBody>(
  node: T,
  ifStatement: TSESTree.IfStatement,
  context: Context
): void => {
  traverseStatements(node, ifStatement.consequent, context);
};

/**
 * Validate the `switch` statement
 * - Validate recursively if `switch` statements are nested
 */
const validateSwitchStatement = <T extends TSESTree.ClassBody>(
  node: T,
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
const validateConstructId = <T extends TSESTree.ClassBody>(
  node: T,
  context: Context,
  expression: TSESTree.NewExpression
): void => {
  if (expression.arguments.length < 2) return;

  // NOTE: Treat the second argument as ID
  const secondArg = expression.arguments[1];
  if (secondArg.type !== "Literal" || typeof secondArg.value !== "string") {
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
