import { Symbol, Type } from "typescript";

import { SYMBOL_FLAGS } from "../../constants/ts-internal-flags";

// NOTE: In order not to make it dependent on the typescript library, it defines its own unions.
//       Therefore, the type information structures do not match.
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

const getSymbol = (type: Type): Symbol | undefined => {
  return type.getSymbol?.() ?? type.symbol;
};

export const isClassType = (type: Type): boolean => {
  return getSymbol(type)?.flags === SYMBOL_FLAGS.CLASS;
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
