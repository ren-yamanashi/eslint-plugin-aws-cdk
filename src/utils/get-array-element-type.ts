import { Type } from "typescript";

import { isArrayType } from "./typecheck/ts-type";

export const getArrayElementType = (type: Type): Type | undefined => {
  if (!isArrayType(type)) return undefined;

  // Get type arguments for Array<T>
  if ("typeArguments" in type && Array.isArray(type.typeArguments)) {
    return (type.typeArguments as Type[])[0];
  }

  return undefined;
};
