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
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import cdkPlugin from "eslint-cdk-plugin";

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["lib/**/*.ts", "bin/*.ts"],
    // ✅ Add plugins
    extends: [cdkPlugin.configs.recommended],
    // ... some configs
  },
]);
```

### When using CJS

```js
// eslint.config.cjs
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const cdkPlugin = require("eslint-cdk-plugin");

module.exports = defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["lib/**/*.ts", "bin/*.ts"],
    // ✅ Add plugins
    extends: [cdkPlugin.configs.recommended],
    // ... some configs
  },
]);
```

## Customize rules

If you want to customize the rules, write `eslint.config.mjs` as follows:  
(For CJS, use `eslint.config.cjs` and use CommonJS notation)

```js
// eslint.config.mjs
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import cdkPlugin from "eslint-cdk-plugin";

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
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
]);
```
