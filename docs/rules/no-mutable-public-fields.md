---
title: eslint-cdk-plugin - no-mutable-public-fields
titleTemplate: ":title"
---

# no-mutable-public-fields

<div class="info-item">
  ✅ Using
  <a href="/rules/#recommended-rules">recommended</a>
  in an ESLint configuration enables this rule.
</div>
<div class="info-item">
  🔧 Some problems reported by this rule are automatically fixable by the
  <a href="https://eslint.org/docs/latest/use/command-line-interface#--fix">
    --fix ESLint command line option
  </a>
</div>

This rule disallow making public variables of a class mutable.  
(This rule applies only to classes that extends from `Construct` or `Stack`.)

It's not good to have mutable public variables, because it can lead to unintended side effects.

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/no-mutable-public-fields": "error",
    },
  },
];
```

#### ✅ Correct Example

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  // ✅ Can use readonly
  public readonly bucket: IBucket;
}
```

#### ❌ Incorrect Example

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  // ❌ Shouldn't use mutable
  public bucket: IBucket;
}
```
