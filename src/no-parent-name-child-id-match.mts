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
            validateConstructorBody(node, body.value, className, context);
          }
        }
      },
    };
  },
});

const validateConstructorBody = <T extends TSESTree.ClassBody>(
  node: T,
  expression: TSESTree.FunctionExpression,
  className: string,
  context: Context
) => {
  for (const statement of expression.body.body) {
    switch (statement.type) {
      case "VariableDeclaration": {
        const newExpression = statement.declarations[0].init;
        if (newExpression?.type !== "NewExpression") continue;
        validateConstructId(node, context, newExpression, className);
        break;
      }
      case "ExpressionStatement": {
        const newExpression = statement.expression;
        if (newExpression?.type !== "NewExpression") break;
        statementLoop({
          node,
          body: statement,
          className,
          context,
        });
        break;
      }
      case "IfStatement": {
        validationLoop({
          node,
          context,
          className,
          statement: statement.consequent,
        });
        break;
      }
      case "SwitchStatement": {
        for (const _statement of statement.cases) {
          for (const _consequent of _statement.consequent) {
            validationLoop({
              node,
              context,
              className,
              statement: _consequent,
            });
          }
        }
        break;
      }
    }
  }
};

const validationLoop = <T extends TSESTree.ClassBody>({
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
        statementLoop({ node, body, className, context });
      }
      break;
    }
    case "ExpressionStatement": {
      const newExpression = statement.expression;
      if (newExpression?.type !== "NewExpression") break;
      statementLoop({
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
      validateConstructId(node, context, newExpression, className);
      break;
    }
  }
};

const statementLoop = <T extends TSESTree.ClassBody>({
  node,
  body,
  className,
  context,
}: {
  node: T;
  body: TSESTree.Statement;
  className: string;
  context: Context;
}) => {
  switch (body.type) {
    case "VariableDeclaration": {
      const newExpression = body.declarations[0].init;
      if (newExpression?.type !== "NewExpression") break;
      validateConstructId(node, context, newExpression, className);
      break;
    }
    case "ExpressionStatement": {
      const newExpression = body.expression;
      if (newExpression?.type !== "NewExpression") break;
      validateConstructId(node, context, newExpression, className);
      break;
    }
    case "IfStatement": {
      ifStatementLoop({ node, ifStatement: body, className, context });
      break;
    }
    case "SwitchStatement": {
      switchStatementLoop({ node, switchStatement: body, className, context });
      break;
    }
  }
};

const ifStatementLoop = <T extends TSESTree.ClassBody>({
  node,
  ifStatement,
  className,
  context,
}: {
  node: T;
  ifStatement: TSESTree.IfStatement;
  className: string;
  context: Context;
}) => {
  validationLoop({
    node,
    context,
    className,
    statement: ifStatement.consequent,
  });
};

const switchStatementLoop = <T extends TSESTree.ClassBody>({
  node,
  switchStatement,
  className,
  context,
}: {
  node: T;
  switchStatement: TSESTree.SwitchStatement;
  className: string;
  context: Context;
}) => {
  for (const statement of switchStatement.cases) {
    for (const _consequent of statement.consequent) {
      validationLoop({ node, context, className, statement: _consequent });
    }
  }
};

const validateConstructId = <T extends TSESTree.ClassBody>(
  node: T,
  context: Context,
  expression: TSESTree.NewExpression,
  parentClassName: string
) => {
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
