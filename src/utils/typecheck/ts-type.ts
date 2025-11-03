import { Symbol, SymbolFlags, Type } from "typescript";

const getSymbol = (type: Type): Symbol | undefined => {
  return type.getSymbol?.() ?? type.symbol;
};

export const isClassType = (type: Type): boolean => {
  return getSymbol(type)?.flags === SymbolFlags.Class;
};

export const isArrayType = (type: Type): boolean => {
  const symbol = getSymbol(type);
  if (symbol?.name === "Array") return true;

  if ("target" in type && type.target) {
    const targetSymbol = getSymbol(type.target as Type);
    return targetSymbol?.name === "Array";
  }

  return false;
};
