/**
 * Implementing `SymbolFlags` defined in typescript on your own, in order not to include TypeScript in dependencies
 */
export enum SymbolFlags {
  Class = 32,
}

/**
 * Implementing `SyntaxKind` defined in typescript on your own, in order not to include TypeScript in dependencies
 */
export enum SyntaxKind {
  ClassDeclaration = 263,
  Constructor = 176,
}
