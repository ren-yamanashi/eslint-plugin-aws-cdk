<p align="center">
  <img width="160px" height="160px" src="https://raw.githubusercontent.com/ren-yamanashi/eslint-plugin-awscdk/main/assets/logo.png" alt="ESLint plugin for AWS CDK logo">
</p>

<h1 align="center">eslint-plugin-awscdk</h1>
<p align="center">ESLint plugin for AWS CDK</p>
<p align="center">
  <a href="https://www.npmjs.com/package/eslint-plugin-awscdk">
    <img src="https://img.shields.io/npm/v/eslint-plugin-awscdk.svg" alt="NPM">
  </a>
</p>

## 📔 Documentation

Please refer to the [website](https://eslint-plugin-awscdk.dev/).

## 📦 Package Name Migration Notice

> **Important**: This package was previously published as `eslint-cdk-plugin`. Starting from v4.0.0, it has been renamed to `eslint-plugin-awscdk` to follow ESLint's official naming convention.

### For existing users of `eslint-cdk-plugin`:

1. Update your package.json:

   ```diff
   - "eslint-cdk-plugin": "^3.x.x"
   + "eslint-plugin-awscdk": "^4.0.0"
   ```

2. Update your ESLint configuration:
   ```diff
   - import cdkPlugin from "eslint-cdk-plugin";
   + import cdkPlugin from "eslint-plugin-awscdk";
   ```

The old package name will continue to receive updates until for a while , after which it will be deprecated.

## 📦 Installation

```bash
# npm
npm install -D eslint-plugin-awscdk

# yarn
yarn add -D eslint-plugin-awscdk

# pnpm
pnpm install -D eslint-plugin-awscdk
```

## 🚀 Usage

Note: This plugin uses typescript type information and must be used in conjunction with [typescript-eslint](https://typescript-eslint.io/getting-started).

### When using recommended config

```js
// eslint.config.mjs
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import cdkPlugin from "eslint-plugin-awscdk";

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["lib/**/*.ts", "bin/*.ts"],
    // ✅ Add plugins
    extends: [cdkPlugin.configs.recommended],
  },
]);
```

### When using custom config

```js
// eslint.config.mjs
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import cdkPlugin from "eslint-plugin-awscdk";

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

## ❗ Issue

If you have any questions or suggestions, please open an [issue](https://github.com/ren-yamanashi/eslint-plugin-awscdk/issues).

## 💪 Contribution

Contributions are welcome! Please see [Contribution Guide](https://github.com/ren-yamanashi/eslint-plugin-awscdk/blob/main/CONTRIBUTING.md) for more details.

## ⚓ Versioning Policy

Please see [Versioning Policy](https://github.com/ren-yamanashi/eslint-plugin-awscdk/blob/main/VERSIONING_POLICY.md).

## ©️ License

[MIT](http://opensource.org/licenses/MIT)
