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

<div class="info-item">
  🚨 This plugin only supports FlatConfig.
  <br />
  ❓ <a href="https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file-formats">
    What's FlatConfig?
  </a>
</div>

<div class="info-item">
  🚨 This plugin uses typescript type information and must be used in conjunction with
  <a href="https://typescript-eslint.io/getting-started">
    typescript-eslint
  </a>
</div>

### When using ESM

```js
// eslint.config.mjs
import cdkPlugin from "eslint-cdk-plugin";
import tsEslint from "typescript-eslint";

export default [
  ...tsEslint.configs.recommended,
  // ✅ Add plugins
  cdkPlugin.configs.recommended,
  {
    files: ["lib/**/*.ts", "bin/*.ts"],
    // ... some configs
  },
];
```

### When using CJS

```js
// eslint.config.cjs
const cdkPlugin = require("eslint-cdk-plugin");
const tsEslint = require("typescript-eslint");

module.exports = [
  ...tsEslint.configs.recommended,
  // ✅ Add plugins
  cdkPlugin.configs.recommended,
  {
    files: ["lib/**/*.ts", "bin/*.ts"],
    // ... some configs
  },
];
```

## Customize rules

If you want to customize the rules, write `eslint.config.mjs` as follows:  
(For CJS, use `eslint.config.cjs` and use CommonJS notation)

```js
// eslint.config.mjs
import tsEslint from "typescript-eslint";
import cdkPlugin from "eslint-cdk-plugin";

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
      cdk: cdkPlugin,
    },
    // ✅ Add rules (use custom rules)
    rules: {
      "cdk/no-construct-in-interface": "error",
      "cdk/no-construct-stack-suffix": "error",
      "cdk/no-parent-name-construct-id-match": "error",
    },
  },
];
```
