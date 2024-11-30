import { Type } from "typescript";

export const SUPPORTED_SUPER_CLASS_SUFFIXES = ["Construct", "Stack"];

/**
 * Check if the type extends Construct or Stack
 * @param type - The type to check
 * @returns True if the type extends Construct or Stack, otherwise false
 */
export const isConstructOrStackType = (type: Type): boolean => {
  if (!type.symbol) return false;

  // NOTE: Check if the current type ends in Construct or Stack
  if (
    SUPPORTED_SUPER_CLASS_SUFFIXES.some((suffix) =>
      type.symbol.name.endsWith(suffix)
    )
  ) {
    return true;
  }

  // NOTE: Check the base type
  const baseTypes = type.getBaseTypes() || [];
  return baseTypes.some((baseType) => isConstructOrStackType(baseType));
};
