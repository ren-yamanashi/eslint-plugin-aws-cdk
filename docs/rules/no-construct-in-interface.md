---
title: eslint-cdk-plugin - no-construct-in-interface
titleTemplate: ":title"
---

# no-construct-in-interface

<div class="info-item">
  ✅ Using
  <a href="/rules/#recommended-rules">recommended</a>
  in an ESLint configuration enables this rule.
</div>

This rule disallows specifying CDK Construct types (e.g. `Bucket`) for properties in an `interface`.

Using Construct types in interface properties creates tight coupling between the interface and the Construct.
Furthermore, since Constructs are mutable by nature, specifying a Construct type for an interface property can lead to unexpected behavior.
Therefore, such code is not recommended.

Instead, it is recommended to specify an interface for read-only resources (e.g. `IBucket`).

---

#### 🔧 How to use

```ts
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/no-construct-in-interface": "error",
    },
  },
];
```

#### ✅ Correct Example

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ Read-only interfaces (e.g. `IBucket`) can be used
  readonly bucket: IBucket;
}
```

#### ❌ Incorrect Example

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ Construct types (e.g. `Bucket`) should not be used for properties
  readonly bucket: Bucket;
}
```
