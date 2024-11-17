import { Rule } from "eslint";
import {
  FunctionExpression,
  IfStatement,
  NewExpression,
  Node,
  Statement,
  SwitchStatement,
} from "estree";

import { toPascalCase } from "./utils/convertString.mjs";

export const noParentNameChildIdMatch: Rule.RuleModule = {
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
  create(context) {
    return {
      ClassBody(node) {
        const parent = node.parent;
        if (parent?.type !== "ClassDeclaration") return;

        for (const body of node.body) {
          if (body.type !== "MethodDefinition") continue;
          if (
            body.kind === "constructor" &&
            body.value.type === "FunctionExpression"
          ) {
            validateConstructorBody(node, body.value, parent.id.name, context);
          }
        }
      },
    };
  },
};

const validateConstructorBody = <T extends Node>(
  node: T,
  expression: FunctionExpression,
  className: string,
  context: Rule.RuleContext
) => {
  for (const statement of expression.body.body) {
    switch (statement.type) {
      case "VariableDeclaration": {
        const newExpression = statement.declarations[0].init;
        if (newExpression?.type !== "NewExpression") continue;
        validateConstructId(node, context, newExpression, className);
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

const validationLoop = <T extends Node>({
  node,
  statement,
  className,
  context,
}: {
  node: T;
  statement: Statement;
  className: string;
  context: Rule.RuleContext;
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

const ifStatementLoop = <T extends Node>({
  node,
  ifStatement,
  className,
  context,
}: {
  node: T;
  ifStatement: IfStatement;
  className: string;
  context: Rule.RuleContext;
}) => {
  validationLoop({
    node,
    context,
    className,
    statement: ifStatement.consequent,
  });
};

const switchStatementLoop = <T extends Node>({
  node,
  switchStatement,
  className,
  context,
}: {
  node: T;
  switchStatement: SwitchStatement;
  className: string;
  context: Rule.RuleContext;
}) => {
  for (const statement of switchStatement.cases) {
    for (const _consequent of statement.consequent) {
      validationLoop({ node, context, className, statement: _consequent });
    }
  }
};

const statementLoop = <T extends Node>({
  node,
  body,
  className,
  context,
}: {
  node: T;
  body: Statement;
  className: string;
  context: Rule.RuleContext;
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

const validateConstructId = <T extends Node>(
  node: T,
  context: Rule.RuleContext,
  expression: NewExpression,
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
