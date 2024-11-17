import { ESLintUtils } from "@typescript-eslint/utils";
import { SymbolFlags } from "typescript";

export const noClassInInterfaceProps = ESLintUtils.RuleCreator.withoutDocs({
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
    const checker = parserServices.program.getTypeChecker();
    return {
      TSInterfaceDeclaration(node) {
        for (const property of node.body.body) {
          if (
            property.type !== "TSPropertySignature" ||
            property.key.type !== "Identifier"
          ) {
            continue;
          }
          const tsNode = parserServices.esTreeNodeToTSNodeMap.get(property);
          const type = checker.getTypeAtLocation(tsNode);

          if (!type.symbol) continue;

          // NOTE: check class type
          const isClass = type.symbol.flags === SymbolFlags.Class;
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
