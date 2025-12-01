import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import { RuleContext } from "@typescript-eslint/utils/ts-eslint";
import { Type } from "typescript";
import { createRule } from "../utils/create-rule";
import { getArrayElementType } from "../utils/get-array-element-type";
import { getGenericTypeArgument } from "../utils/get-generics-type-argument";
import { isResourceWithReadonlyInterface } from "../utils/is-resource-with-readonly-interface";

type Context = Readonly<RuleContext<"invalidInterfaceProperty", []>>;

/**
 * Enforces the use of interface types instead of CDK Construct types in interface properties
 * @param context - The rule context provided by ESLint
 * @returns An object containing the AST visitor functions
 */
export const noConstructInInterface = createRule({
  name: "no-construct-in-interface",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow CDK Construct types in interface properties",
    },
    messages: {
      invalidInterfaceProperty:
        "Interface property '{{ propertyName }}' should not use CDK Construct type '{{ typeName }}'. Consider using an interface or type alias instead.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    return {
      TSInterfaceDeclaration(node) {
        for (const property of node.body.body) {
          if (
            property.type !== AST_NODE_TYPES.TSPropertySignature ||
            property.key.type !== AST_NODE_TYPES.Identifier
          ) {
            continue;
          }

          const tsType = parserServices.getTypeAtLocation(property);
          const propType = getInterfacePropertyType(tsType);
          if (propType && isResourceWithReadonlyInterface(propType.type)) {
            context.report({
              node: property,
              messageId: "invalidInterfaceProperty",
              data: {
                propertyName: property.key.name,
                typeName: propType.name,
              },
            });
          }
        }
      },
    };
  },
});

/**
 * Gets the relevant type and name for an interface property
 * @return type - The TypeScript type
 * @return name - The name of the type
 */
const getInterfacePropertyType = (
  type: Type
):
  | Readonly<{
      type: Type;
      name: string;
    }>
  | undefined => {
  // NOTE: Generics type wrapping a class type (e.g. Readonly<s3.Bucket>)
  const genericArgument = getGenericTypeArgument(type);
  if (genericArgument) {
    const wrapperName = type.aliasSymbol
      ? type.aliasSymbol.name // For type aliases like Readonly<T>, Partial<T>
      : type.symbol?.name ?? undefined; // For other generics types like Array<T>
    return {
      type: genericArgument,
      name: wrapperName
        ? `${wrapperName}<${genericArgument.symbol.name}>`
        : genericArgument.symbol.name,
    };
  }

  // NOTE: Array of class types (e.g. s3.Bucket[])
  const elementType = getArrayElementType(type);
  if (elementType) {
    return {
      type: elementType,
      name: `${elementType.symbol.name}[]`,
    };
  }

  // NOTE: Direct type (e.g. s3.Bucket)
  if (type.symbol) {
    return { type, name: type.symbol.name };
  }
};
