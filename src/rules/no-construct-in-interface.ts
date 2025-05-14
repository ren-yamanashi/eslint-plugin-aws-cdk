import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import { isConstructOrStackType } from "../utils/typeCheck";

/**
 * Enforces the use of interface types instead of CDK Construct types in interface properties
 * @param context - The rule context provided by ESLint
 * @returns An object containing the AST visitor functions
 * @see {@link https://eslint-cdk-plugin.dev/rules/no-class-in-interface} - Documentation
 */
export const noConstructInInterface = ESLintUtils.RuleCreator.withoutDocs({
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
          // NOTE: check property signature
          if (
            property.type !== AST_NODE_TYPES.TSPropertySignature ||
            property.key.type !== AST_NODE_TYPES.Identifier
          ) {
            continue;
          }

          const type = parserServices.getTypeAtLocation(property);
          if (!isConstructOrStackType(type)) continue;

          context.report({
            node: property,
            messageId: "invalidInterfaceProperty",
            data: {
              propertyName: property.key.name,
              typeName: type.symbol.name,
            },
          });
        }
      },
    };
  },
});
