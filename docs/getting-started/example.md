---
title: eslint-plugin-cdk - ESLint plugin for AWS CDK
titleTemplate: ":title"
prev: false
---

# Example

Below is an example of eslint.config.mjs.

Note: We recommend using typescript-eslint together.

```js
import eslint from "@eslint/js";
import cdkPlugin from "@nigg/eslint-plugin-cdk";
import tsEslint from "typescript-eslint";

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.strict,
  ...tsEslint.configs.stylistic,
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        projectService: true,
        project: "./tsconfig.json",
      },
    },
    plugins: {
      cdk: cdkPlugin,
    },
    rules: {
      ...cdkPlugin.configs.recommended.rules,
      "cdk/no-import-private": "error",
    },
  },
  {
    ignores: ["node_modules"],
  }
);
```
