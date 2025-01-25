import {
  ClassDeclaration,
  ConstructorDeclaration,
  Declaration,
  Node,
  Type,
} from "typescript";

import { SYNTAX_KIND } from "../constants/tsInternalFlags";

/**
 * Parses type to get the property names of the class constructor.
 * @returns The property names of the class constructor.
 */
export const getConstructorPropertyNames = (type: Type): string[] => {
  const declarations = type.symbol?.declarations;
  if (!declarations?.length) return [];

  const classDeclaration = declarations[0];
  if (!isClassDeclaration(classDeclaration)) return [];

  const constructor = classDeclaration.members.find((member) =>
    isConstructorDeclaration(member)
  );
  if (!constructor?.parameters.length) return [];

  return constructor.parameters.map((param) => param.name.getText());
};

/**
 * Implementing `isClassDeclaration` defined in typescript on your own, in order not to include TypeScript in dependencies
 */
const isClassDeclaration = (
  declaration: Declaration
): declaration is ClassDeclaration => {
  return declaration.kind === SYNTAX_KIND.CLASS_DECLARATION;
};

/**
 * Implementing `isConstructorDeclaration` defined in typescript on your own, in order not to include TypeScript in dependencies
 */
const isConstructorDeclaration = (
  node: Node
): node is ConstructorDeclaration => {
  return node.kind === SYNTAX_KIND.CONSTRUCTOR;
};
