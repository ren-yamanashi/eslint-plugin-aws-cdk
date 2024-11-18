---
title: eslint-plugin-cdk - no-import-private
titleTemplate: ":title"
next: false
---

# no-import-private

This rule disallows importing modules from `private` directories at different hierarchical levels.

Note: This rule is not included in the `recommended` rules.  
When setting it, you need to write the following:

```js
// eslint.config.mjs
import eslintPluginCdk from "@nigg/eslint-plugin-cdk";
export default [
  {
    plugins: {
      cdk: eslintPluginCdk,
    },
    rules: {
      ...cdkPlugin.configs.recommended.rules,
      "cdk/no-import-private": "error",
    },
  },
];
```

The private directory is intended to contain internal implementation that should only be used within its parent directory.  
By disallowing imports from a different hierarchy, it promotes proper modularization and encapsulation.

#### ✅ Correct Example

```ts
// src/constructs/my-construct.ts
import { MyConstruct } from "./private/my-construct";
```

#### ❌ Incorrect Example

```ts
// src/constructs/my-construct.ts
import { MyConstruct } from "../private/my-construct";
import { MyConstruct } from "../my-app/private/my-construct";
```
