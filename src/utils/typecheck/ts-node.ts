import { HeritageClause, SyntaxKind } from "typescript";

export const checkHeritageClauseIsImplements = (
  node: HeritageClause
): boolean => {
  return node.token === SyntaxKind.ImplementsKeyword;
};
