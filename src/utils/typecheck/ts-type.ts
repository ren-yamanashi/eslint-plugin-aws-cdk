import { Symbol, Type } from "typescript";

import { SYMBOL_FLAGS } from "../../constants/tsInternalFlags";

// NOTE: In order not to make it dependent on the typescript library, it defines its own unions.
//       Therefore, the type information structures do not match.
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

const getSymbol = (type: Type): Symbol | undefined => {
  return type.getSymbol?.() ?? type.symbol;
};

export const isClassType = (type: Type): boolean => {
  return getSymbol(type)?.flags === SYMBOL_FLAGS.CLASS;
};
