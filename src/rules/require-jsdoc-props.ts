import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";

/**
 * Require JSDoc comments for properties in interfaces and Constructs
 * @param context - The rule context provided by ESLint
 * @returns An object containing the AST visitor functions
 * @see {@link https://eslint-cdk-plugin.dev/rules/require-jsdoc-props} - Documentation
 */
export const requireJSDocProps = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: "problem",
    docs: {
      description:
        "Require JSDoc comments for properties in interfaces and Constructs",
    },
    messages: {
      missingJSDoc:
        "Property '{{ propertyName }}' should have a JSDoc comment.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      TSPropertySignature(node) {
        if (
          node.key.type !== AST_NODE_TYPES.Identifier ||
          node.parent?.type !== AST_NODE_TYPES.TSInterfaceBody
        ) {
          return;
        }

        const sourceCode = context.sourceCode;
        const comments = sourceCode.getCommentsBefore(node);
        const hasJSDoc = comments.some(
          (comment) => comment.type === "Block" && comment.value.startsWith("*")
        );

        if (!hasJSDoc) {
          context.report({
            node,
            messageId: "missingJSDoc",
            data: {
              propertyName: node.key.name,
            },
          });
        }
      },
      PropertyDefinition(node) {
        if (
          node.key.type !== AST_NODE_TYPES.Identifier ||
          !node.parent ||
          node.parent.type !== AST_NODE_TYPES.ClassBody
        ) {
          return;
        }

        // Check if the class extends Construct
        const classDeclaration = node.parent.parent;
        if (
          classDeclaration.type !== AST_NODE_TYPES.ClassDeclaration ||
          !classDeclaration.superClass
        ) {
          return;
        }

        const sourceCode = context.sourceCode;
        const comments = sourceCode.getCommentsBefore(node);
        const hasJSDoc = comments.some(
          (comment) => comment.type === "Block" && comment.value.startsWith("*")
        );

        if (!hasJSDoc) {
          context.report({
            node,
            messageId: "missingJSDoc",
            data: {
              propertyName: node.key.name,
            },
          });
        }
      },
    };
  },
});
