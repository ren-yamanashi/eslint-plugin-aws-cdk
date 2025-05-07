---
title: eslint-cdk-plugin - no-import-private
titleTemplate: ":title"
next: false
---

# no-import-private

<div class="info-item">
  ℹ️ This rule is not included in the
  <a href="/rules/#recommended-rules">recommended</a>
  rules.
</div>

This rule disallows importing modules from `private` directories at different hierarchical levels.

The private directory is intended to contain internal implementation that should only be used within its parent directory.  
By disallowing imports from a different hierarchy, it promotes proper modularization and encapsulation.

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/no-import-private": "error",
    },
  },
];
```

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
