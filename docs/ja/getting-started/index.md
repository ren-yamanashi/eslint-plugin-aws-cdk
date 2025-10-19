---
title: eslint-cdk-plugin - Getting Started
titleTemplate: ":title"
---

# eslint-cdk-plugin

## インストール

以下のコマンドを実行してインストールします。

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

## eslint の設定

`eslint.config.mjs` を以下のように記述します。

<div class="info-item">
  🚨 このプラグインは FlatConfig のみをサポートしています。
  <br />
  ❓  <a href="https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file-formats">
    FlatConfig とは?
  </a>
</div>

<div class="info-item">
  🚨 このプラグインは typescript の型情報を使う為
  <a href="https://typescript-eslint.io/getting-started">
    typescript-eslint
  </a>
  との併用が必要になります。
</div>

### ESM を使用する場合

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

### CJS を使用する場合

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

## ルールのカスタマイズ

ルールをカスタマイズしたい場合は、`eslint.config.mjs` を以下のように記述します。  
(CJS の場合は `eslint.config.cjs` を使用し、CommonJS の記法で記述します)

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
