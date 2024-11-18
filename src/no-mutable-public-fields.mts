import { ESLintUtils } from "@typescript-eslint/utils";

export const noMutablePublicFields = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow mutable public class fields",
    },
    fixable: "code",
    messages: {
      noMutablePublicFields:
        "Public field '{{ propertyName }}' should be readonly. Consider adding the 'readonly' modifier.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.sourceCode;
    return {
      ClassDeclaration(node) {
        for (const member of node.body.body) {
          if (
            member.type !== "PropertyDefinition" ||
            member.key.type !== "Identifier"
          ) {
            continue;
          }

          // NOTE: Skip private and protected fields
          if (["private", "protected"].includes(member.accessibility ?? "")) {
            continue;
          }

          // NOTE: Skip if readonly is present
          if (member.readonly) continue;

          context.report({
            node: member,
            messageId: "noMutablePublicFields",
            data: {
              propertyName: member.key.name,
            },
            fix: (fixer) => {
              const accessibility = member.accessibility ? "public " : "";
              const paramText = sourceCode.getText(member);
              const [key, value] = paramText.split(":");
              const replacedKey = key.startsWith("public ")
                ? key.replace("public ", "")
                : key;

              return fixer.replaceText(
                member,
                `${accessibility}readonly ${replacedKey}:${value}`
              );
            },
          });
        }
      },
    };
  },
});
