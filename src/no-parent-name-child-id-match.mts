import { ESLintUtils, TSESLint, TSESTree } from "@typescript-eslint/utils";

import { toPascalCase } from "./utils/convertString.mjs";

type Context = TSESLint.RuleContext<"noParentNameChildIdMatch", []>;

export const noParentNameChildIdMatch = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce that child construct id name does not match the parent construct name.",
    },
    messages: {
      noParentNameChildIdMatch:
        "Child Construct ID '{{ childId }}' should not match parent Construct name '{{ parentName }}'. Use a more specific identifier.",
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
            validateConstructorBody({
              node,
              expression: body.value,
              className,
              context,
            });
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
const validateConstructorBody = <T extends TSESTree.ClassBody>({
  node,
  expression,
  className,
  context,
}: {
  node: T;
  expression: TSESTree.FunctionExpression;
  className: string;
  context: Context;
}): void => {
  for (const statement of expression.body.body) {
    switch (statement.type) {
      case "VariableDeclaration": {
        const newExpression = statement.declarations[0].init;
        if (newExpression?.type !== "NewExpression") continue;
        validateConstructId({
          node,
          context,
          expression: newExpression,
          parentClassName: className,
        });
        break;
      }
      case "ExpressionStatement": {
        if (statement.expression?.type !== "NewExpression") break;
        validateStatement({
          node,
          body: statement,
          className,
          context,
        });
        break;
      }
      case "IfStatement": {
        traverseStatements({
          node,
          context,
          className,
          statement: statement.consequent,
        });
        break;
      }
      case "SwitchStatement": {
        for (const switchCase of statement.cases) {
          for (const statement of switchCase.consequent) {
            traverseStatements({
              node,
              context,
              className,
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
  className,
  context,
}: {
  node: T;
  statement: TSESTree.Statement;
  className: string;
  context: Context;
}) => {
  switch (statement.type) {
    case "BlockStatement": {
      for (const body of statement.body) {
        validateStatement({ node, body, className, context });
      }
      break;
    }
    case "ExpressionStatement": {
      const newExpression = statement.expression;
      if (newExpression?.type !== "NewExpression") break;
      validateStatement({
        node,
        body: statement,
        className,
        context,
      });
      break;
    }
    case "VariableDeclaration": {
      const newExpression = statement.declarations[0].init;
      if (newExpression?.type !== "NewExpression") break;
      validateConstructId({
        node,
        context,
        expression: newExpression,
        parentClassName: className,
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
  className,
  context,
}: {
  node: T;
  body: TSESTree.Statement;
  className: string;
  context: Context;
}): void => {
  switch (body.type) {
    case "VariableDeclaration": {
      const newExpression = body.declarations[0].init;
      if (newExpression?.type !== "NewExpression") break;
      validateConstructId({
        node,
        context,
        expression: newExpression,
        parentClassName: className,
      });
      break;
    }
    case "ExpressionStatement": {
      const newExpression = body.expression;
      if (newExpression?.type !== "NewExpression") break;
      validateConstructId({
        node,
        context,
        expression: newExpression,
        parentClassName: className,
      });
      break;
    }
    case "IfStatement": {
      validateIfStatement({ node, ifStatement: body, className, context });
      break;
    }
    case "SwitchStatement": {
      validateSwitchStatement({
        node,
        switchStatement: body,
        className,
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
  className,
  context,
}: {
  node: T;
  ifStatement: TSESTree.IfStatement;
  className: string;
  context: Context;
}): void => {
  traverseStatements({
    node,
    context,
    className,
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
  className,
  context,
}: {
  node: T;
  switchStatement: TSESTree.SwitchStatement;
  className: string;
  context: Context;
}): void => {
  for (const statement of switchStatement.cases) {
    for (const _consequent of statement.consequent) {
      traverseStatements({ node, context, className, statement: _consequent });
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
  if (secondArg.type !== "Literal" || typeof secondArg.value !== "string") {
    return;
  }

  const formattedConstructId = toPascalCase(secondArg.value as string);
  const formattedParentClassName = toPascalCase(parentClassName);

  if (formattedParentClassName === formattedConstructId) {
    context.report({
      node,
      messageId: "noParentNameChildIdMatch",
      data: {
        childId: secondArg.value,
        parentName: parentClassName,
      },
    });
  }
};
