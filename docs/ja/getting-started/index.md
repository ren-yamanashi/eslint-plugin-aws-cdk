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

<div style="margin-top:16px; margin-bottom:16px; background-color: #595959; padding: 16px;border-radius: 4px;">
  🚨 このプラグインは FlatConfig のみをサポートしています。
  <br />
  ❓  <a href="https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file-formats">
    FlatConfig とは?
  </a>
</div>

<div style="margin-top:16px; margin-bottom:16px; background-color: #595959; padding: 16px;border-radius: 4px;">
  🚨 このプラグインは typescript の型情報を使う為
  <a href="https://typescript-eslint.io/getting-started">
    typescript-eslint
  </a>
  との併用が必要になります。
</div>

### ESM を使用する場合

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

::: details `eslint.config.mjs`は、次のように書くこともできます

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

### CJS を使用する場合

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

::: details `eslint.config.cjs` は次のように書くこともできます

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

## ルールのカスタマイズ

ルールをカスタマイズしたい場合は、`eslint.config.mjs` を以下のように記述します。  
(CJS の場合は `eslint.config.cjs` を使用し、CommonJS の記法で記述します)

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
