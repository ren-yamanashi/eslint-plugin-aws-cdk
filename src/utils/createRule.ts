import { ESLintUtils } from "@typescript-eslint/utils";

export const createRule = ESLintUtils.RuleCreator(
  (name) => `https://eslint-plugin-aws-cdk.dev/rules/${name}`
);
