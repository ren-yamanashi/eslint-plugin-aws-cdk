import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

import { SYMBOL_FLAGS } from "../constants/tsInternalFlags";
import { createRule } from "../utils/createRule";
import { isConstructOrStackType } from "../utils/typeCheck";

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
          // NOTE: check property signature
          if (
            property.type !== AST_NODE_TYPES.TSPropertySignature ||
            property.key.type !== AST_NODE_TYPES.Identifier
          ) {
            continue;
          }

          const type = parserServices.getTypeAtLocation(property);
          if (!isConstructOrStackType(type)) continue;

          // NOTE: In order not to make it dependent on the typescript library, it defines its own unions.
          //       Therefore, the type information structures do not match.
          // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
          const isClass = type.symbol.flags === SYMBOL_FLAGS.CLASS;
          if (!isClass) continue;

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
