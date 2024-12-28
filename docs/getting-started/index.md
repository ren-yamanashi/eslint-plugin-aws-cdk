---
title: eslint-cdk-plugin - Getting Started
titleTemplate: ":title"
---

# eslint-cdk-plugin

## Install

Just run this:

::: code-group

```sh [npm]
npm install -D eslint-cdk-plugin
```

```sh [yarn]
yarn add -D eslint-cdk-plugin
```

```sh [pnpm]
pnpm install -D eslint-cdk-plugin
```

:::

## Setting eslint config

Write `eslint.config.mjs` as follows:

<div style="margin-top:16px; margin-bottom:16px; background-color: #595959; padding: 16px;border-radius: 4px;">
  🚨 This plugin only supports FlatConfig.
  <br />
  ❓ <a href="https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file-formats">
    What's FlatConfig?
  </a>
</div>

<div style="margin-top:16px; margin-bottom:16px; background-color: #595959; padding: 16px;border-radius: 4px;">
  🚨 This plugin uses typescript type information and must be used in conjunction with
  <a href="https://typescript-eslint.io/getting-started">
    typescript-eslint
  </a>
</div>

### When using ESM

```js
// eslint.config.mjs
import eslintCdkPlugin from "eslint-cdk-plugin";
import tsEslint from "typescript-eslint";

export default [
  ...tsEslint.configs.recommended,
  {
    files: ["lib/**/*.ts", "bin/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        project: "./tsconfig.json",
      },
    },
    // ✅ Add plugins
    plugins: {
      cdk: eslintCdkPlugin,
    },
    // ✅ Add rules (use recommended rules)
    rules: {
      ...eslintCdkPlugin.configs.recommended.rules,
      "cdk/no-import-private": "error",
    },
  },
];
```

::: details `eslint.config.mjs` can also be written as follows

```js
// eslint.config.mjs
import tsEslint from "typescript-eslint";
import eslintCdkPlugin from "eslint-cdk-plugin";

export default tsEslint.config({
  files: ["lib/**/*.ts", "bin/*.ts"],
  languageOptions: {
    parser: tsEslint.parser,
    parserOptions: {
      projectService: true,
      project: "./tsconfig.json",
    },
  },
  extends: [...tsEslint.configs.recommended],
  // ✅ Add plugins
  plugins: {
    cdk: eslintCdkPlugin,
  },
  // ✅ Add rules (use recommended rules)
  rules: {
    ...eslintCdkPlugin.configs.recommended.rules,
  },
});
```

:::

### When using CJS

```js
// eslint.config.cjs
const eslintCdkPlugin = require("eslint-cdk-plugin");
const tsEslint = require("typescript-eslint");

module.exports = [
  ...tsEslint.configs.recommended,
  {
    files: ["lib/**/*.ts", "bin/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        project: "./tsconfig.json",
      },
    },
    plugins: {
      cdk: eslintCdkPlugin,
    },
    rules: {
      ...eslintCdkPlugin.configs.recommended.rules,
      "cdk/no-import-private": "error",
    },
  },
  {
    ignores: ["node_modules", "*.js"],
  },
];
```

::: details `eslint.config.cjs` can also be written as follows

```js
// eslint.config.cjs
const tsEslint = require("typescript-eslint");
const eslintCdkPlugin = require("eslint-cdk-plugin");

module.exports = tsEslint.config({
  files: ["lib/**/*.ts", "bin/*.ts"],
  languageOptions: {
    parser: tsEslint.parser,
    parserOptions: {
      projectService: true,
      project: "./tsconfig.json",
    },
  },
  extends: [...tsEslint.configs.recommended],
  // ✅ Add plugins
  plugins: {
    cdk: eslintCdkPlugin,
  },
  // ✅ Add rules (use recommended rules)
  rules: {
    ...eslintCdkPlugin.configs.recommended.rules,
  },
});
```

:::

## Customize rules

If you want to customize the rules, write `eslint.config.mjs` as follows:  
(For CJS, use `eslint.config.cjs` and use CommonJS notation)

```js
// eslint.config.mjs
import tsEslint from "typescript-eslint";
import eslintCdkPlugin from "eslint-cdk-plugin";

export default [
  ...tsEslint.configs.recommended,
  {
    files: ["lib/**/*.ts", "bin/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        project: "./tsconfig.json",
      },
    },
    // ✅ Add plugins
    plugins: {
      cdk: eslintCdkPlugin,
    },
    // ✅ Add rules (use custom rules)
    rules: {
      "cdk/no-class-in-interface": "error",
      "cdk/no-construct-stack-suffix": "error",
      "cdk/no-parent-name-construct-id-match": "error",
    },
  },
];
```
