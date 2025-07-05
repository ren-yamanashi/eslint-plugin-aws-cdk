import {
  AST_NODE_TYPES,
  ESLintUtils,
  ParserServicesWithTypeInformation,
  TSESLint,
  TSESTree,
} from "@typescript-eslint/utils";
import { Type, TypeChecker } from "typescript";

import { createRule } from "../utils/createRule";
import { isConstructType } from "../utils/typeCheck";

type Context = TSESLint.RuleContext<"unusedProp", []>;

/**
 * Tracks usage of props properties
 */
class PropsUsageTracker {
  private readonly propUsages = new Map<string, boolean>();

  constructor(propertyNames: string[]) {
    for (const name of propertyNames) {
      this.propUsages.set(name, false);
    }
  }

  markAsUsed(propertyName: string): void {
    if (this.propUsages.has(propertyName)) {
      this.propUsages.set(propertyName, true);
    }
  }

  getUnusedProperties(): string[] {
    return Array.from(this.propUsages.entries())
      .filter(([, used]) => !used)
      .map(([name]) => name);
  }

  hasProperties(): boolean {
    return !!this.propUsages.size;
  }
}

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
    const typeChecker = parserServices.program.getTypeChecker();

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

        analyzePropsUsage(constructor, context, parserServices, typeChecker);
      },
    };
  },
});

/**
 * Analyzes props usage in the constructor
 */
const analyzePropsUsage = (
  constructor: TSESTree.MethodDefinition,
  context: Context,
  parserServices: ParserServicesWithTypeInformation,
  typeChecker: TypeChecker
): void => {
  const params = constructor.value.params;

  // NOTE: Check if constructor has props parameter (3rd parameter)
  if (params.length < 3) return;

  const propsParam = params[2];
  if (propsParam.type !== AST_NODE_TYPES.Identifier) return;

  const propsType = parserServices.getTypeAtLocation(propsParam);
  const propProperties = getPropsProperties(propsType, typeChecker);

  if (!propProperties.length) return;

  // Initialize usage tracking
  const tracker = new PropsUsageTracker(propProperties);

  if (!tracker.hasProperties()) return;

  // Check if constructor has a body
  if (!constructor.value.body) return;

  // Analyze constructor body for props usage
  analyzeConstructorBody(constructor.value.body, propsParam.name, tracker);

  // Report unused properties
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
 * Extracts property names from props type
 */
const getPropsProperties = (
  propsType: Type,
  typeChecker: TypeChecker
): string[] => {
  // Try to get properties from type checker first (more reliable)
  const typeProperties = typeChecker.getPropertiesOfType(propsType);
  if (typeProperties.length) {
    return typeProperties.reduce<string[]>((acc, prop) => {
      const name = prop.getName();
      if (!isInternalProperty(name)) {
        return [...acc, name];
      }
      return acc;
    }, []);
  }

  // Fallback: get properties from symbol members
  const symbol = propsType.getSymbol();
  if (!symbol?.members) return [];

  return Array.from(symbol.members.keys()).reduce<string[]>((acc, key) => {
    const name = String(key);
    if (!isInternalProperty(name)) {
      return [...acc, name];
    }
    return acc;
  }, []);
};

/**
 * Checks if a property is an internal TypeScript property
 */
const isInternalProperty = (propertyName: string): boolean => {
  return (
    propertyName.startsWith("__") ||
    propertyName === "constructor" ||
    propertyName === "prototype"
  );
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

/**
 * Type guard to check if a value is an array of unknown values
 */
const isUnknownArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};

/**
 * Safely gets child nodes from a TSESTree.Node
 */
const getChildNodes = (node: TSESTree.Node): TSESTree.Node[] => {
  const skipKeys = new Set(["parent", "range", "loc"]);

  return Object.entries(node).reduce<TSESTree.Node[]>((acc, [key, value]) => {
    if (skipKeys.has(key)) return acc;

    if (isESTreeNode(value)) {
      return [...acc, value];
    }
    if (isUnknownArray(value)) {
      const validNodes = value.filter(isESTreeNode);
      return [...acc, ...validNodes];
    }
    return acc;
  }, []);
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
        handleMemberExpression(node, propsParamName, tracker);
        break;
      case AST_NODE_TYPES.VariableDeclarator:
        handleVariableDeclarator(node, propsParamName, tracker);
        break;
      case AST_NODE_TYPES.AssignmentExpression:
        handleAssignmentExpression(node, propsParamName, tracker);
        break;
    }

    // Recursively visit child nodes
    const children = getChildNodes(node);
    for (const child of children) {
      visitNode(child);
    }
  };

  visitNode(body);
};

/**
 * Handles member expressions like props.propertyName or this.props.propertyName
 */
const handleMemberExpression = (
  node: TSESTree.MemberExpression,
  propsParamName: string,
  tracker: PropsUsageTracker
): void => {
  // Check for props.propertyName pattern
  if (
    node.object.type === AST_NODE_TYPES.Identifier &&
    node.object.name === propsParamName &&
    node.property.type === AST_NODE_TYPES.Identifier
  ) {
    tracker.markAsUsed(node.property.name);
    return;
  }

  // Check for this.props.propertyName pattern
  if (node.object.type !== AST_NODE_TYPES.MemberExpression) return;
  if (node.object.object.type !== AST_NODE_TYPES.ThisExpression) return;
  if (node.object.property.type !== AST_NODE_TYPES.Identifier) return;
  if (node.object.property.name !== "props") return;
  if (node.property.type !== AST_NODE_TYPES.Identifier) return;

  tracker.markAsUsed(node.property.name);
};

/**
 * Handles variable declarations with destructuring
 */
const handleVariableDeclarator = (
  node: TSESTree.VariableDeclarator,
  propsParamName: string,
  tracker: PropsUsageTracker
): void => {
  // Check for destructuring assignment: const { prop1, prop2 } = props
  if (node.id.type !== AST_NODE_TYPES.ObjectPattern) return;
  if (node.init?.type !== AST_NODE_TYPES.Identifier) return;
  if (node.init.name !== propsParamName) return;

  const propertyNames = node.id.properties.reduce<string[]>((acc, prop) => {
    if (
      prop.type === AST_NODE_TYPES.Property &&
      prop.key.type === AST_NODE_TYPES.Identifier
    ) {
      return [...acc, prop.key.name];
    }
    return acc;
  }, []);

  for (const name of propertyNames) {
    tracker.markAsUsed(name);
  }
};

/**
 * Handles assignment expressions like this.props = props or this.property = props.property
 */
const handleAssignmentExpression = (
  node: TSESTree.AssignmentExpression,
  propsParamName: string,
  tracker: PropsUsageTracker
): void => {
  // Check for this.property = props.property pattern
  if (node.right.type !== AST_NODE_TYPES.MemberExpression) return;
  if (node.right.object.type !== AST_NODE_TYPES.Identifier) return;
  if (node.right.object.name !== propsParamName) return;
  if (node.right.property.type !== AST_NODE_TYPES.Identifier) return;

  tracker.markAsUsed(node.right.property.name);

  // Note: this.props = props pattern doesn't mark all properties as used
  // because we still need to check which properties are actually accessed later
};
