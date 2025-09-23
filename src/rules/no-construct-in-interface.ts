import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import { createRule } from "../utils/createRule";
import { getArrayElementType } from "../utils/getArrayElementType";
import { getGenericTypeArgument } from "../utils/getGenericTypeArgument";
import { isResourceWithReadonlyInterface } from "../utils/is-resource-with-readonly-interface";
import { isClassType } from "../utils/typecheck/ts-type";

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

          const type = parserServices.getTypeAtLocation(property);

          // NOTE: Check if it's a direct class type
          if (isClassType(type) && isResourceWithReadonlyInterface(type)) {
            context.report({
              node: property,
              messageId: "invalidInterfaceProperty",
              data: {
                propertyName: property.key.name,
                typeName: type.symbol.name,
              },
            });
            continue;
          }

          // NOTE: Check if it's an array of class types
          const elementType = getArrayElementType(type);
          if (
            elementType &&
            isClassType(elementType) &&
            isResourceWithReadonlyInterface(elementType)
          ) {
            context.report({
              node: property,
              messageId: "invalidInterfaceProperty",
              data: {
                propertyName: property.key.name,
                typeName: `${elementType.symbol.name}[]`,
              },
            });
            continue;
          }

          // NOTE: Check if it's a generic type wrapping a class type
          const genericArgument = getGenericTypeArgument(type);
          if (
            genericArgument &&
            isClassType(genericArgument) &&
            isResourceWithReadonlyInterface(genericArgument)
          ) {
            const wrapperName = (() => {
              if (type.aliasSymbol) return type.aliasSymbol.name; // For type aliases like Readonly<T>, Partial<T>
              if (type.symbol?.name) return type.symbol.name; // For other generic types like Array<T>
              return undefined;
            })();
            context.report({
              node: property,
              messageId: "invalidInterfaceProperty",
              data: {
                propertyName: property.key.name,
                typeName: wrapperName
                  ? `${wrapperName}<${genericArgument.symbol.name}>`
                  : genericArgument.symbol.name,
              },
            });
          }
        }
      },
    };
  },
});
