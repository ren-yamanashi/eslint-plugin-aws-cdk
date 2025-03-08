import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import { SYMBOL_FLAGS } from "../constants/tsInternalFlags";

/**
 * Enforces the use of interface types instead of class in interface properties
 * @param context - The rule context provided by ESLint
 * @returns An object containing the AST visitor functions
 * @see {@link https://eslint-cdk-plugin.dev/rules/no-class-in-interface} - Documentation
 */
export const noClassInInterface = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow class types in interface properties",
    },
    messages: {
      noClassInInterfaceProps:
        "Interface property '{{ propertyName }}' should not use class type '{{ typeName }}'. Consider using an interface or type alias instead.",
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
          if (!type.symbol) continue;

          // NOTE: In order not to make it dependent on the typescript library, it defines its own unions.
          //       Therefore, the type information structures do not match.
          // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
          const isClass = type.symbol.flags === SYMBOL_FLAGS.CLASS;
          if (!isClass) continue;

          context.report({
            node: property,
            messageId: "noClassInInterfaceProps",
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
