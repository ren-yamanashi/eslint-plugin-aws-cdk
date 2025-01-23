---
title: eslint-cdk-plugin - no-class-in-interface
titleTemplate: ":title"
---

# no-class-in-interface

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  ✅ Using
  <a href="/rules/#recommended-rules">recommended</a>
  in an ESLint configuration enables this rule.
</div>

This rule disallows using class types in interface properties.

When class types are used in interface properties, it creates tight coupling between the interface and the class implementation.  
Additionally, classes are mutable by nature, which can lead to unexpected behavior when used as interface property types.  
So not good.

---

#### 🔧 How to use

```ts
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/no-class-in-interface": "error",
    },
  },
];
```

#### ✅ Correct Example

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ Can use an interface
  readonly bucket: IBucket;
}
```

#### ❌ Incorrect Example

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ Shouldn't use a class
  readonly bucket: Bucket;
}
```
