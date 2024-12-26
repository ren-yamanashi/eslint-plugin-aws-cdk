import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

/**
 * Disallow mutable properties in Props interfaces
 * @param context - The rule context provided by ESLint
 * @returns An object containing the AST visitor functions
 * @see {@link https://eslint-cdk-plugin.dev/rules/no-mutable-props-interface} - Documentation
 */
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
    return {
      TSInterfaceDeclaration(node) {
        const sourceCode = context.sourceCode;

        // NOTE: Interface name check for "Props"
        if (!node.id.name.endsWith("Props")) return;

        for (const property of node.body.body) {
          // NOTE: check property signature
          if (
            property.type !== AST_NODE_TYPES.TSPropertySignature ||
            property.key.type !== AST_NODE_TYPES.Identifier
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
