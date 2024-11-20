---
title: eslint-cdk-plugin - Rules
titleTemplate: ":title"
---

# Rules

Currently we support the following rules:  
You can check the details of the rules on each page.

- [pascal-case-construct-id](/rules/pascal-case-construct-id)
- [no-parent-name-construct-id-match](/rules/no-parent-name-construct-id-match)
- [no-construct-stack-suffix](/rules/no-construct-stack-suffix)
- [no-class-in-interface](/rules/no-class-in-interface)
- [no-public-class-fields](/rules/no-public-class-fields)
- [no-mutable-public-fields](/rules/no-mutable-public-fields)
- [no-mutable-props-interface](/rules/no-mutable-props-interface)
- [no-import-private](/rules/no-import-private)

## `recommended` rules

When using `recommended`, the actual content set is as follows.

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
      "cdk/no-public-class-fields": "error",
      "cdk/pascal-case-construct-id": "error",
      "cdk/no-mutable-public-fields": "warn",
      "cdk/no-mutable-props-interface": "warn",
      // NOTE: The above rules are the same as when using `recommended`
      // ...eslintCdkPlugin.configs.recommended.rules,
    },
  },
];
```
