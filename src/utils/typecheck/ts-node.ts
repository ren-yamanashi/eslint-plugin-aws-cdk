import {
  ClassDeclaration,
  ConstructorDeclaration,
  HeritageClause,
  Identifier,
  Node,
  PropertyAccessExpression,
} from "typescript";

import { SYNTAX_KIND } from "../../constants/tsInternalFlags";

// NOTE: In order not to make it dependent on the typescript library, it defines its own unions.
//       Therefore, the type information structures do not match.
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

// NOTE: Implementing type check method defined in typescript on your own, in order not to include TypeScript in dependencies

export const isClassDeclaration = (node: Node): node is ClassDeclaration => {
  return node.kind === SYNTAX_KIND.CLASS_DECLARATION;
};

export const isIdentifier = (node: Node): node is Identifier => {
  return node.kind === SYNTAX_KIND.IDENTIFIER;
};

export const isPropertyAccessExpression = (
  node: Node
): node is PropertyAccessExpression => {
  return node.kind === SYNTAX_KIND.PROPERTY_ACCESS_EXPRESSION;
};

export const checkHeritageClauseIsImplements = (
  node: HeritageClause
): boolean => {
  return node.token === SYNTAX_KIND.IMPLEMENTS_KEYWORD;
};

export const isConstructorDeclaration = (
  node: Node
): node is ConstructorDeclaration => {
  return node.kind === SYNTAX_KIND.CONSTRUCTOR;
};
