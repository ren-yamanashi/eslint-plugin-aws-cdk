import {
  AST_NODE_TYPES,
  ESLintUtils,
  ParserServicesWithTypeInformation,
  TSESLint,
  TSESTree,
} from "@typescript-eslint/utils";

import { isConstructOrStackType } from "../core/cdk-construct/type-checker/is-construct-or-stack";
import { findTypeOfCdkConstruct } from "../core/cdk-construct/type-finder";
import { findConstructor } from "../shared/ast-node-finder/constructor";
import { createRule } from "../shared/create-rule";

type Context = TSESLint.RuleContext<"invalidPublicPropertyOfConstruct", []>;

/**
 * Disallow Construct types in public property of Construct
 * @param context - The rule context provided by ESLint
 * @returns An object containing the AST visitor functions
 */
export const noConstructInPublicPropertyOfConstruct = createRule({
  name: "no-construct-in-public-property-of-construct",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow Construct types in public property of Construct",
    },
    messages: {
      invalidPublicPropertyOfConstruct:
        "Public property '{{ propertyName }}' of Construct should not use Construct type '{{ typeName }}'. Consider using an interface or type alias instead.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    return {
      ClassDeclaration(node) {
        const type = parserServices.getTypeAtLocation(node);
        if (!isConstructOrStackType(type)) return;
        checkPublicPropertyInClassElement(node, context, parserServices);
        checkParameterPropertiesInConstructor(node, context, parserServices);
      },
    };
  },
});

const checkPublicPropertyInClassElement = (
  node: TSESTree.ClassDeclaration,
  context: Context,
  parserServices: ParserServicesWithTypeInformation
) => {
  for (const property of node.body.body) {
    validateProperty(property, context, parserServices);
  }
};

const checkParameterPropertiesInConstructor = (
  node: TSESTree.ClassDeclaration,
  context: Context,
  parserServices: ParserServicesWithTypeInformation
) => {
  const constructor = findConstructor(node);
  if (!constructor) return;
  for (const property of constructor.value.params) {
    validateProperty(property, context, parserServices);
  }
};

const validateProperty = (
  property: TSESTree.Parameter | TSESTree.ClassElement,
  context: Context,
  parserServices: ParserServicesWithTypeInformation
) => {
  const publicProperty = getPublicProperty(property);
  if (!publicProperty) return;

  const type = parserServices.getTypeAtLocation(publicProperty.type);
  const constructType = findTypeOfCdkConstruct(type);
  if (constructType) {
    context.report({
      node: property,
      messageId: "invalidPublicPropertyOfConstruct",
      data: {
        propertyName: publicProperty.name,
        typeName: constructType.symbol.name,
      },
    });
  }
};

const getPublicProperty = <
  T extends TSESTree.Parameter | TSESTree.ClassElement
>(
  property: T
): { name: string; type: T } | undefined => {
  switch (property.type) {
    case AST_NODE_TYPES.TSParameterProperty: {
      if (property.parameter.type !== AST_NODE_TYPES.Identifier) {
        return;
      }
      if (["private", "protected"].includes(property.accessibility ?? "")) {
        return;
      }
      if (!property.parameter.typeAnnotation) return;
      return {
        name: property.parameter.name,
        type: property,
      };
    }
    case AST_NODE_TYPES.PropertyDefinition: {
      if (property.key.type !== AST_NODE_TYPES.Identifier) {
        return;
      }
      if (["private", "protected"].includes(property.accessibility ?? "")) {
        return;
      }
      if (!property.typeAnnotation) return;
      return {
        name: property.key.name,
        type: property,
      };
    }
  }
};
