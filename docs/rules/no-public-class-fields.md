---
title: eslint-cdk-plugin - no-public-class-fields
titleTemplate: ":title"
---

# no-public-class-fields

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  ✅ Using
  <a href="/rules/#recommended-rules">recommended</a>
  in an ESLint configuration enables this rule.
</div>

This rule disallows using class types for public class fields.

When class types are used in public fields, it creates tight coupling and exposes mutable state, so not good.

#### ✅ Correct Examples

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  public readonly bucket: IBucket;
  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.bucket = new Bucket(this, "MyBucket");
  }
}
```

#### ❌ Incorrect Examples

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  public readonly bucket: Bucket;
  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.bucket = new Bucket(this, "MyBucket");
  }
}
```
