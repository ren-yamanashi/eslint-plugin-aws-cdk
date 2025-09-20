/**
 * Implementing `SymbolFlags` defined in typescript on your own, in order not to include TypeScript in dependencies
 */
export const SYMBOL_FLAGS = {
  CLASS: 32,
  Interface: 64,
} as const;

/**
 * Implementing `SyntaxKind` defined in typescript on your own, in order not to include TypeScript in dependencies
 */
export const SYNTAX_KIND = {
  CLASS_DECLARATION: 263,
  CONSTRUCTOR: 176,
  IMPLEMENTS_KEYWORD: 119,
} as const;
