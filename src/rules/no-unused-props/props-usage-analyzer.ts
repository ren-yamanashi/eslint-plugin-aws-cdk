import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";

import { getChildNodes } from "../../utils/get-child-nodes";

import { IPropsUsageTracker } from "./props-usage-tracker";

interface IPropsUsageAnalyzer {
  analyze(
    constructor: TSESTree.MethodDefinition,
    propsParam: TSESTree.Identifier
  ): void;
}

export class PropsUsageAnalyzer implements IPropsUsageAnalyzer {
  private readonly propsUsageTracker: IPropsUsageTracker;
  private visitedNodes: Set<TSESTree.Node>;

  constructor(propsUsageTracker: IPropsUsageTracker) {
    this.propsUsageTracker = propsUsageTracker;
    this.visitedNodes = new Set<TSESTree.Node>();
  }

  public analyze(
    constructor: TSESTree.MethodDefinition,
    propsParam: TSESTree.Identifier
  ): void {
    const constructorBody = constructor.value.body;
    const classNode = constructor.parent;
    const propsParamName = propsParam.name;
    if (!constructorBody) return;

    this.visitNodes(constructorBody, propsParamName);
    this.analyzeClassBody(classNode, constructor, propsParamName);
    this.analyzePrivateMethodsCalledFromConstructor(
      constructorBody,
      classNode,
      propsParamName
    );
  }

  private analyzeClassBody(
    classBody: TSESTree.ClassBody,
    constructor: TSESTree.MethodDefinition,
    propsParamName: string
  ) {
    if (!constructor.value.body) return;
    const instanceVarName = this.findPropsInstanceVariable(
      constructor.value.body,
      propsParamName
    );
    if (!instanceVarName) return;

    for (const member of classBody.body) {
      if (
        member.type === AST_NODE_TYPES.MethodDefinition &&
        member.value.body
      ) {
        this.visitNodes(member.value.body, instanceVarName);
      }
    }
  }

  private analyzePrivateMethodsCalledFromConstructor(
    constructorBody: TSESTree.BlockStatement,
    classBody: TSESTree.ClassBody,
    propsParamName: string
  ): void {
    // NOTE: Find method calls in constructor
    const methodCallsWithProps = this.findMethodCallsWithProps(
      constructorBody,
      propsParamName
    );

    // NOTE: For each method call, find the method definition and analyze it
    for (const { methodName, propsArgIndices } of methodCallsWithProps) {
      const methodDef = this.findMethodDefinition(classBody, methodName);
      if (!methodDef?.value.body) continue;

      // NOTE: Get the actual parameter names from the method definition
      for (const argIndex of propsArgIndices) {
        const param = methodDef.value.params[argIndex];
        if (param && param.type === AST_NODE_TYPES.Identifier) {
          this.visitNodes(methodDef.value.body, param.name);
        }
      }
    }
  }

  private visitNodes(node: TSESTree.Node, propsParamName: string): void {
    if (this.visitedNodes.has(node)) return;
    this.visitedNodes.add(node);

    switch (node.type) {
      case AST_NODE_TYPES.MemberExpression:
        this.propsUsageTracker.markAsUsedForMemberExpression(
          node,
          propsParamName
        );
        break;
      case AST_NODE_TYPES.VariableDeclarator:
        this.propsUsageTracker.markAsUsedForVariableDeclarator(
          node,
          propsParamName
        );
        break;
      case AST_NODE_TYPES.AssignmentExpression:
        this.propsUsageTracker.markAsUsedForAssignmentExpression(
          node,
          propsParamName
        );
        break;
    }

    // NOTE: Recursively visit child nodes
    const children = getChildNodes(node);
    for (const child of children) {
      this.visitNodes(child, propsParamName);
    }
  }

  private findPropsInstanceVariable(
    body: TSESTree.BlockStatement,
    propsParamName: string
  ): string | null {
    for (const statement of body.body) {
      // NOTE: Handle expression statements (e.g., this.props = props;)
      if (
        statement.type === AST_NODE_TYPES.ExpressionStatement &&
        statement.expression.type === AST_NODE_TYPES.AssignmentExpression &&
        statement.expression.left.type === AST_NODE_TYPES.MemberExpression &&
        statement.expression.left.object.type ===
          AST_NODE_TYPES.ThisExpression &&
        statement.expression.left.property.type === AST_NODE_TYPES.Identifier &&
        statement.expression.right.type === AST_NODE_TYPES.Identifier &&
        statement.expression.right.name === propsParamName
      ) {
        return statement.expression.left.property.name;
      }
    }
    return null;
  }

  /**
   * Finds method definition in class body
   */
  private findMethodDefinition(
    classBody: TSESTree.ClassBody,
    methodName: string
  ): TSESTree.MethodDefinition | null {
    for (const member of classBody.body) {
      if (
        member.type === AST_NODE_TYPES.MethodDefinition &&
        member.key.type === AST_NODE_TYPES.Identifier &&
        member.key.name === methodName
      ) {
        return member;
      }
    }
    return null;
  }

  /**
   * Finds method calls in constructor body that receive props as argument
   */
  private findMethodCallsWithProps(
    body: TSESTree.BlockStatement,
    propsParamName: string
  ): { methodName: string; propsArgIndices: number[] }[] {
    const result: { methodName: string; propsArgIndices: number[] }[] = [];
    const visited = new Set<TSESTree.Node>();

    const visitNode = (node: TSESTree.Node): void => {
      if (visited.has(node)) return;
      visited.add(node);

      // NOTE: Check for this.methodName(...) pattern
      if (
        node.type === AST_NODE_TYPES.CallExpression &&
        node.callee.type === AST_NODE_TYPES.MemberExpression &&
        node.callee.object.type === AST_NODE_TYPES.ThisExpression &&
        node.callee.property.type === AST_NODE_TYPES.Identifier
      ) {
        const methodName = node.callee.property.name;
        const propsArgIndices: number[] = node.arguments.reduce<number[]>(
          (acc, arg, index) =>
            arg.type === AST_NODE_TYPES.Identifier &&
            arg.name === propsParamName
              ? // NOTE: props is passed directly (e.g., this.method(props))
                [...acc, index]
              : acc,
          []
        );
        if (propsArgIndices.length) {
          result.push({ methodName, propsArgIndices });
        }
      }

      // NOTE: Recursively visit child nodes
      const children = getChildNodes(node);
      for (const child of children) {
        visitNode(child);
      }
    };

    visitNode(body);
    return result;
  }
}
