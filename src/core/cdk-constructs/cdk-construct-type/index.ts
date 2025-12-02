import { Type } from "typescript";

import { getArrayElementType } from "../../../utils/get-array-element-type";
import { getGenericsTypeArgument } from "../../../utils/get-generics-type-argument";
import { isClassType } from "../../../utils/typecheck/ts-type";

import { isResourceWithReadonlyInterface } from "./is-resource-with-readonly-interface";

type CdkConstructType = {
  /**
   * CDK Construct type
   */
  type: Type;
  /**
   * Type name for CDK Construct
   * @example "Bucket", "Table", "Function"
   */
  name: string;
};

/**
 * Recursively traverse the ts.Type to obtain type of CDK Construct class
 */
export const getCdkConstructType = (type: Type): CdkConstructType | undefined => {
  if (isClassType(type) && isResourceWithReadonlyInterface(type)) {
    return {
      type: type,
      name: type.symbol.name,
    };
  }
  return (
    getFromArray(type) ??
    getFromGenerics(type) ??
    getFromUnion(type) ??
    getFromIntersection(type)
  );
};

/**
 * Get Construct type from an array type (e.g. s3.Bucket[])
 */
const getFromArray = (
  type: Type
): CdkConstructType | undefined => {
  const arrElementType = getArrayElementType(type);
  if (!arrElementType) return undefined;

  return getCdkConstructType(arrElementType);
};

/**
 * Get Construct type from a generics type (e.g. Array<s3.Bucket>, Promise<s3.Bucket[]>)
 */
const getFromGenerics = (
  type: Type
): CdkConstructType | undefined => {
  const genericsArgument = getGenericsTypeArgument(type);
  if (!genericsArgument) return undefined;

  return getCdkConstructType(genericsArgument);
};

/**
 * Get Construct type from a union type (e.g. s3.Bucket | string)
 */
const getFromUnion = (
  type: Type
): CdkConstructType | undefined => {
  if (!type.isUnion()) return undefined;

  for (const unionType of type.types) {
    const foundType = getCdkConstructType(unionType);
    if (foundType) return foundType;
  }
};

/**
 * Get Construct type from an intersection type (e.g. s3.Bucket & { customProp: string })
 */
const getFromIntersection = (
  type: Type
): CdkConstructType | undefined => {
  if (!type.isIntersection()) return undefined;

  for (const intersectionType of type.types) {
    const foundType = getCdkConstructType(intersectionType);
    if (foundType) return foundType;
  }
};
