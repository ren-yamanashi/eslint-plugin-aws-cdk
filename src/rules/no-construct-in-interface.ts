import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import type { Type } from "typescript";

import { createRule } from "../utils/create-rule";
import { getArrayElementType } from "../utils/get-array-element-type";
import { getGenericsTypeArgument } from "../utils/get-generics-type-argument";
import { isResourceWithReadonlyInterface } from "../utils/is-resource-with-readonly-interface";
import { isClassType } from "../utils/typecheck/ts-type";

type ConstructTypeInfo = {
  /** The found CDK Construct type */
  type: Type;
  /** The formatted type name for error message */
  name: string;
};

/**
 * Enforces the use of interface types instead of CDK Construct types in interface properties
 * @param context - The rule context provided by ESLint
 * @returns An object containing the AST visitor functions
 */
export const noConstructInInterface = createRule({
  name: "no-construct-in-interface",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow CDK Construct types in interface properties",
    },
    messages: {
      invalidInterfaceProperty:
        "Interface property '{{ propertyName }}' should not use CDK Construct type '{{ typeName }}'. Consider using an interface or type alias instead.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    return {
      TSInterfaceDeclaration(node) {
        for (const property of node.body.body) {
          if (
            property.type !== AST_NODE_TYPES.TSPropertySignature ||
            property.key.type !== AST_NODE_TYPES.Identifier
          ) {
            continue;
          }

          const type = parserServices.getTypeAtLocation(property);
          const result = getConstructTypeInfo(type);

          if (result) {
            context.report({
              node: property,
              messageId: "invalidInterfaceProperty",
              data: {
                propertyName: property.key.name,
                typeName: result.name,
              },
            });
          }
        }
      },
    };
  },
});

/**
 * Recursively checks if a type contains a CDK Construct class type
 */
const getConstructTypeInfo = (type: Type): ConstructTypeInfo | undefined => {
  if (isClassType(type) && isResourceWithReadonlyInterface(type)) {
    return {
      type: type,
      name: type.symbol.name,
    };
  }
  return (
    getConstructTypeInfoFromArray(type) ??
    getConstructTypeInfoFromGenerics(type) ??
    getConstructTypeInfoFromUnion(type) ??
    getConstructTypeInfoFromIntersection(type)
  );
};

/**
 * Get Construct type from an array type (e.g. s3.Bucket[])
 */
const getConstructTypeInfoFromArray = (
  type: Type
): ConstructTypeInfo | undefined => {
  const arrElementType = getArrayElementType(type);
  if (!arrElementType) return undefined;

  return getConstructTypeInfo(arrElementType);
};

/**
 * Get Construct type from a generics type (e.g. Array<s3.Bucket>, Promise<s3.Bucket[]>)
 */
const getConstructTypeInfoFromGenerics = (
  type: Type
): ConstructTypeInfo | undefined => {
  const genericsArgument = getGenericsTypeArgument(type);
  if (!genericsArgument) return undefined;

  return getConstructTypeInfo(genericsArgument);
};

/**
 * Get Construct type from a union type (e.g. s3.Bucket | string)
 */
const getConstructTypeInfoFromUnion = (
  type: Type
): ConstructTypeInfo | undefined => {
  if (!type.isUnion()) return undefined;

  for (const unionType of type.types) {
    const foundType = getConstructTypeInfo(unionType);
    if (foundType) return foundType;
  }
};

/**
 * Get Construct type from an intersection type (e.g. s3.Bucket & { customProp: string })
 */
const getConstructTypeInfoFromIntersection = (
  type: Type
): ConstructTypeInfo | undefined => {
  if (!type.isIntersection()) return undefined;

  for (const intersectionType of type.types) {
    const foundType = getConstructTypeInfo(intersectionType);
    if (foundType) return foundType;
  }
};
