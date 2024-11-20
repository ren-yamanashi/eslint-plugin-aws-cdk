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

eslint.config.mjs を以下のように記述します。

※このプラグインは flatConfig のみをサポートしています。

```js
// eslint.config.mjs
import eslintPluginCdk from "eslint-cdk-plugin";
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
import eslintPluginCdk from "eslint-cdk-plugin";
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
