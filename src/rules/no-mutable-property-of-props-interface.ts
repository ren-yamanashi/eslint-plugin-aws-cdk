import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

/**
 * Disallow mutable properties of Construct Props (interface)
 * @param context - The rule context provided by ESLint
 * @returns An object containing the AST visitor functions
 * @see {@link https://eslint-cdk-plugin.dev/rules/no-mutable-props-interface} - Documentation
 */
export const noMutablePropertyOfPropsInterface =
  ESLintUtils.RuleCreator.withoutDocs({
    meta: {
      type: "problem",
      docs: {
        description:
          "Disallow mutable properties of Construct Props (interface)",
      },
      fixable: "code",
      messages: {
        noMutablePropertyOfPropsInterface:
          "Property '{{ propertyName }}' of Construct Props should be readonly.",
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
              messageId: "noMutablePropertyOfPropsInterface",
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
