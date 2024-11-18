import { ESLintUtils } from "@typescript-eslint/utils";

export const noMutablePropsInterface = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow mutable properties in Props interfaces",
    },
    fixable: "code",
    messages: {
      noMutablePropsInterface:
        "Property '{{ propertyName }}' in Props interface should be readonly.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.sourceCode;

    return {
      TSInterfaceDeclaration(node) {
        // NOTE: Interface name check for "Props"
        if (!node.id.name.endsWith("Props")) return;

        for (const property of node.body.body) {
          if (
            property.type !== "TSPropertySignature" ||
            property.key.type !== "Identifier"
          ) {
            continue;
          }

          // NOTE: Skip if already readonly
          if (property.readonly) continue;

          context.report({
            node: property,
            messageId: "noMutablePropsInterface",
            data: {
              propertyName: property.key.name,
            },
            fix: (fixer) => {
              const propertyText = sourceCode.getText(property);
              return fixer.replaceText(property, `readonly ${propertyText}`);
            },
          });
        }
      },
    };
  },
});
