import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/utils";
import { Type } from "typescript";

import {
  isClassDeclaration,
  isConstructorDeclaration,
} from "./typecheck/ts-node";

/**
 * Retrieves the property names from an array of properties.
 *
 * @param properties An array of properties to extract names from.
 * @returns An array of property names.
 */
export const getPropertyNames = (
  properties: (TSESTree.Property | TSESTree.RestElement)[]
): string[] => {
  return properties.reduce<string[]>(
    (acc, prop) =>
      prop.type === AST_NODE_TYPES.Property &&
      prop.key.type === AST_NODE_TYPES.Identifier
        ? [...acc, prop.key.name]
        : acc,
    []
  );
};

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
