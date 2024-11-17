---
title: eslint-plugin-cdk - ESLint plugin for AWS CDK
titleTemplate: ":title"
---

# eslint-plugin-cdk

## インストール

以下のコマンドを実行してインストールします。

::: code-group

```sh [npm]
npm install -D @nigg/eslint-plugin-cdk
```

```sh [yarn]
yarn add -D @nigg/eslint-plugin-cdk
```

```sh [pnpm]
pnpm install -D @nigg/eslint-plugin-cdk
```

:::

## eslint の設定

eslint.config.mjs を以下のように記述します。

※このプラグインは flatConfig のみをサポートしています。

```js
// eslint.config.mjs
import eslintPluginCdk from "@nigg/eslint-plugin-cdk";
export default [
  {
    plugins: {
      cdk: eslintPluginCdk,
    },
    rules: {
      ...eslintPluginCdk.configs.recommended.rules,
    },
  },
];
```

## ルールのカスタマイズ

ルールをカスタマイズしたい場合は、eslint.config.mjs を以下のように記述します。

```js
// eslint.config.mjs
import eslintPluginCdk from "@nigg/eslint-plugin-cdk";
export default [
  {
    plugins: {
      cdk: eslintPluginCdk,
    },
    rules: {
      ...eslintPluginCdk.configs.recommended.rules,
      "cdk/no-public-class-fields": "warn",
    },
  },
];
```
