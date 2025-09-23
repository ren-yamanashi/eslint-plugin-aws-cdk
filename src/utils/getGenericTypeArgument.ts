import { Type } from "typescript";

/**
 * Extracts the type argument from a generic type reference
 * @param type - The type to check
 * @returns The first type argument if it's a generic type reference, undefined otherwise
 */
export const getGenericTypeArgument = (type: Type): Type | undefined => {
  // NOTE: Check for type alias (e.g. Readonly<T>, Partial<T>)
  if (
    "aliasSymbol" in type &&
    type.aliasSymbol &&
    "aliasTypeArguments" in type &&
    type.aliasTypeArguments?.length
  ) {
    return type.aliasTypeArguments[0];
  }

  // NOTE: Check if type has typeArguments (generic types like Array<T>, etc.)
  //       This works for TypeReference types
  if (
    "typeArguments" in type &&
    Array.isArray(type.typeArguments) &&
    type.typeArguments?.length
  ) {
    return type.typeArguments[0] as Type;
  }

  // NOTE: Alternative approach: check for target property (some generic types have this)
  if (
    "target" in type &&
    type.target &&
    "typeArguments" in type &&
    Array.isArray(type.typeArguments) &&
    type.typeArguments?.length
  ) {
    return type.typeArguments[0] as Type;
  }

  // NOTE: For mapped types like Readonly<T> and Partial<T>
  //       These are represented differently in TypeScript's type system
  if ("modifiersType" in type && type.modifiersType) {
    return type.modifiersType as Type;
  }

  return undefined;
};
