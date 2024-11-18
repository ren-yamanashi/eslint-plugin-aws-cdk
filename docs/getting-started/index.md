---
title: eslint-plugin-cdk - Getting Started
titleTemplate: ":title"
---

# eslint-plugin-cdk

## Install

Just run this:

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

## Setting eslint config

Write eslint.config.mjs as follows:

Note: This plugin only supports flatConfig

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

## Customize rules

If you want to customize the rules, write eslint.config.mjs as follows:

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
