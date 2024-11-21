---
title: eslint-cdk-plugin - Rules
titleTemplate: ":title"
---

# Rules

現在は、以下のルールをサポートしております。  
ルールの詳細は、各ページをご覧ください。

- [pascal-case-construct-id](/ja/rules/pascal-case-construct-id)
- [no-parent-name-construct-id-match](/ja/rules/no-parent-name-construct-id-match)
- [no-construct-stack-suffix](/ja/rules/no-construct-stack-suffix)
- [no-class-in-interface](/ja/rules/no-class-in-interface)
- [no-public-class-fields](/ja/rules/no-public-class-fields)
- [no-mutable-public-fields](/ja/rules/no-mutable-public-fields)
- [no-mutable-props-interface](/ja/rules/no-mutable-props-interface)
- [no-import-private](/ja/rules/no-import-private)

## `recommended` rules

`recommended` を使用すると、簡単に設定をすることができます。

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

`recommended` を使用した場合、実際に設定される内容は以下の通りです。

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
    },
  },
];
```
