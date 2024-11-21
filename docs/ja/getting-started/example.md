---
title: eslint-cdk-plugin - Example for eslint.config.mjs
titleTemplate: ":title"
---

# Example

以下に、`eslint.config.mjs` の記述例を示します。

<div style="margin-top:16px; margin-bottom:16px; background-color: #595959; padding: 16px;border-radius: 4px;">
  💡 typescript-eslint と一緒に使用することを推奨します。
</div>

```js
import eslint from "@eslint/js";
import eslintCdkPlugin from "eslint-cdk-plugin";
import tsEslint from "typescript-eslint";

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommended, // or ...tsEslint.configs.strict
  ...tsEslint.configs.stylistic,
  {
    files: ["lib/**/*.ts", "bin/*.ts"],
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
    ignores: ["cdk.out", "node_modules"],
  }
);
```
