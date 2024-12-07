<p align="center">
  <img width="160px" height="160px" src="https://raw.githubusercontent.com/ren-yamanashi/eslint-cdk-plugin/main/assets/logo.png" alt="ESLint plugin for AWS CDK logo">
</p>

<h1 align="center">eslint-cdk-plugin</h1>
<p align="center">ESLint plugin for AWS CDK</p>
<p align="center">
  <a href="https://www.npmjs.com/package/eslint-cdk-plugin">
    <img src="https://img.shields.io/npm/v/eslint-cdk-plugin.svg" alt="NPM">
  </a>
</p>

## 📔 Documentation

Please refer to the [website](https://eslint-cdk-plugin.dev/).

## 📦 Installation

```bash
# npm
npm install -D eslint-cdk-plugin

# yarn
yarn add -D eslint-cdk-plugin

# pnpm
pnpm install -D eslint-cdk-plugin
```

## 🚀 Usage

#### Use recommended config

```js
// eslint.config.mjs
import eslintCdkPlugin from "eslint-cdk-plugin";
export default [
  {
    plugins: {
      cdk: eslintCdkPlugin,
    },
    rules: {
      ...eslintCdkPlugin.configs.recommended.rules,
    },
  },
];
```

#### Use custom config

```js
// eslint.config.mjs
import eslintCdkPlugin from "eslint-cdk-plugin";
export default [
  {
    plugins: {
      cdk: eslintCdkPlugin,
    },
    rules: {
      "cdk/no-class-in-interface": "error",
      "cdk/no-construct-stack-suffix": "error",
      "cdk/no-parent-name-construct-id-match": "error",
    },
  },
];
```

## ❗ Issue

If you have any questions or suggestions, please open an [issue](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues).

## 💪 Contribution

Contributions are welcome! Please see [Contribution Guide](https://github.com/ren-yamanashi/eslint-cdk-plugin/blob/main/CONTRIBUTING.md) for more details.

## ⚓ Versioning Policy

Please see [Versioning Policy](https://github.com/ren-yamanashi/eslint-cdk-plugin/blob/main/VERSIONING_POLICY.md).

## ©️ License

[MIT](http://opensource.org/licenses/MIT)
