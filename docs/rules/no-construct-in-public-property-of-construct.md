---
title: eslint-cdk-plugin - no-construct-in-public-property-of-construct
titleTemplate: ":title"
---

# no-construct-in-public-property-of-construct

<div class="info-item">
  ✅ Using
  <a href="/rules/#recommended-rules">recommended</a>
  in an ESLint configuration enables this rule.
</div>

This rule disallows specifying Construct types (e.g. `Bucket`) for `public` properties of a CDK Construct.

Using Construct types for `public` properties of a Construct is discouraged because it can lead to tight coupling between Constructs and expose mutable state externally.

Instead, it is recommended to specify an interface for read-only resources (e.g. `IBucket`).

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/no-construct-in-public-property-of-construct": "error",
    },
  },
];
```

#### ✅ Correct Examples

```ts
import { Construct } from "constructs";
import { IBucket, Bucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  // ✅ Read-only interfaces (e.g. `IBucket`) can be used
  public readonly bucket: IBucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.bucket = new Bucket(this, "MyBucket");
  }
}
```

#### ❌ Incorrect Example

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  // ❌ Construct types (e.g. `Bucket`) should not be used for properties
  public readonly bucket: Bucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.bucket = new Bucket(this, "MyBucket");
  }
}
```
