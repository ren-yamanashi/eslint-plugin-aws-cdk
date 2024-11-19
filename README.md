# eslint-plugin-cdk

ESLint plugin for [AWS CDK](https://github.com/aws/aws-cdk).

## Installation

```bash
# npm
npm install -D @nigg/eslint-plugin-cdk

# yarn
yarn add -D @nigg/eslint-plugin-cdk

# pnpm
pnpm install -D @nigg/eslint-plugin-cdk
```

## Usage

### Use recommended config

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

### For more detailed documentation, see [docs for eslint-plugin-cdk](https://eslint-plugin-cdk.dev/)
