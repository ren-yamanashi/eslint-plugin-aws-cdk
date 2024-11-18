---
title: eslint-plugin-cdk - Rules
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
- [no-import-private](/ja/rules/no-import-private)

## `recommended`のルール内容

`recommended` を使用した場合、実際に設定される内容は以下の通りです。

```js
// eslint.config.mjs
import eslintPluginCdk from "@nigg/eslint-plugin-cdk";
export default [
  {
    plugins: {
      cdk: eslintPluginCdk,
    },
    rules: {
      "cdk/no-class-in-interface": "error",
      "cdk/no-construct-stack-suffix": "error",
      "cdk/no-parent-name-construct-id-match": "error",
      "cdk/no-public-class-fields": "error",
      "cdk/pascal-case-construct-id": "error",
      "cdk/no-mutable-public-fields": "warn",
      // NOTE: 上記のルールは、以下のように`recommended`を使用した場合と同じ内容です
      // ...eslintPluginCdk.configs.recommended.rules,
    },
  },
];
```
