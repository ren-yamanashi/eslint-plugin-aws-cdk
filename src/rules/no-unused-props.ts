import {
  AST_NODE_TYPES,
  ESLintUtils,
  ParserServicesWithTypeInformation,
  TSESLint,
  TSESTree,
} from "@typescript-eslint/utils";

import { createRule } from "../utils/createRule";
import { getPropertyNames } from "../utils/getPropertyNames";
import {
  PropsUsageTracker,
  propsUsageTrackerFactory,
} from "../utils/propsUsageTracker";
import { isConstructType } from "../utils/typeCheck";

type Context = TSESLint.RuleContext<"unusedProp", []>;

/**
 * Enforces that all properties defined in props type are used within the constructor
 * @param context - The rule context provided by ESLint
 * @returns An object containing the AST visitor functions
 */
export const noUnusedProps = createRule({
  name: "no-unused-props",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforces that all properties defined in props type are used within the constructor",
    },
    messages: {
      unusedProp: "Property '{{propName}}' is defined in props but never used",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);

    return {
      ClassDeclaration(node) {
        const type = parserServices.getTypeAtLocation(node);
        if (!isConstructType(type)) return;

        const constructor = node.body.body.find(
          (member): member is TSESTree.MethodDefinition =>
            member.type === AST_NODE_TYPES.MethodDefinition &&
            member.kind === "constructor"
        );
        if (!constructor) return;

        analyzePropsUsage(constructor, context, parserServices);
      },
    };
  },
});

/**
 * Reports unused properties to ESLint
 */
const reportUnusedProperties = (
  tracker: PropsUsageTracker,
  propsParam: TSESTree.Parameter,
  context: Context
): void => {
  for (const propName of tracker.getUnusedProperties()) {
    context.report({
      node: propsParam,
      messageId: "unusedProp",
      data: {
        propName,
      },
    });
  }
};

/**
 * Analyzes props usage in the constructor
 */
const analyzePropsUsage = (
  constructor: TSESTree.MethodDefinition,
  context: Context,
  parserServices: ParserServicesWithTypeInformation
): void => {
  const params = constructor.value.params;

  // NOTE: Check if constructor has props parameter (3rd parameter)
  if (params.length < 3) return;

  const propsParam = params[2];

  switch (propsParam.type) {
    case AST_NODE_TYPES.Identifier: {
      // NOTE: Standard props parameter (e.g. props: MyConstructProps)
      const propsType = parserServices.getTypeAtLocation(propsParam);
      const tracker = propsUsageTrackerFactory(propsType);
      if (!tracker || !constructor.value.body) return;

      analyzeConstructorBody(constructor.value.body, propsParam.name, tracker);
      reportUnusedProperties(tracker, propsParam, context);
      return;
    }
    case AST_NODE_TYPES.ObjectPattern: {
      // NOTE: Inline destructuring (e.g. { bucketName, enableVersioning }: MyConstructProps)
      if (!propsParam.typeAnnotation?.typeAnnotation) return;

      const propsType = parserServices.getTypeAtLocation(
        propsParam.typeAnnotation.typeAnnotation
      );
      const tracker = propsUsageTrackerFactory(propsType);
      if (!tracker) return;

      // NOTE: Mark destructured properties as used
      for (const propName of getPropertyNames(propsParam.properties)) {
        tracker.markAsUsed(propName);
      }

      reportUnusedProperties(tracker, propsParam, context);
      return;
    }
    default:
      return;
  }
};

/**
 * Analyzes constructor body for props usage patterns
 */
const analyzeConstructorBody = (
  body: TSESTree.BlockStatement,
  propsParamName: string,
  tracker: PropsUsageTracker
): void => {
  const visited = new Set<TSESTree.Node>();

  const visitNode = (node: TSESTree.Node): void => {
    if (visited.has(node)) return;
    visited.add(node);

    switch (node.type) {
      case AST_NODE_TYPES.MemberExpression:
        tracker.markAsUsedForMemberExpression(node, propsParamName);
        break;
      case AST_NODE_TYPES.VariableDeclarator:
        tracker.markAsUsedForVariableDeclarator(node, propsParamName);
        break;
      case AST_NODE_TYPES.AssignmentExpression:
        tracker.markAsUsedForAssignmentExpression(node, propsParamName);
        break;
    }

    // NOTE: Recursively visit child nodes
    const children = getChildNodes(node);
    for (const child of children) {
      visitNode(child);
    }
  };

  visitNode(body);
};

/**
 * Safely gets child nodes from a TSESTree.Node
 */
const getChildNodes = (node: TSESTree.Node): TSESTree.Node[] => {
  const skipKeys = new Set(["parent", "range", "loc"]);

  return Object.entries(node).reduce<TSESTree.Node[]>((acc, [key, value]) => {
    if (skipKeys.has(key)) return acc;
    if (isESTreeNode(value)) return [...acc, value];
    if (Array.isArray(value)) {
      const validNodes = value.filter(isESTreeNode);
      return [...acc, ...validNodes];
    }
    return acc;
  }, []);
};

/**
 * Type guard to check if a value is a TSESTree.Node
 */
const isESTreeNode = (value: unknown): value is TSESTree.Node => {
  return (
    value !== null &&
    typeof value === "object" &&
    "type" in value &&
    typeof (value as { type: unknown }).type === "string"
  );
};
