---
title: eslint-plugin-cdk - Example for eslint.config.mjs
titleTemplate: ":title"
---

# Example

以下に、eslint.config.mjs の記述例を示します。

※typescript-eslint と一緒に使用することを推奨します。

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
