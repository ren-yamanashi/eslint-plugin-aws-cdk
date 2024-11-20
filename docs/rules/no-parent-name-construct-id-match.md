---
title: eslint-cdk-plugin - no-parent-name-construct-id-match
titleTemplate: ":title"
---

# no-parent-name-construct-id-match

This rule disallows using the parent class name as the construct IDs.

It is not good to specify a string that matches the parent class name for construct ID, as it makes the CloudFormation resource hierarchy unclear.

#### ✅ Correct Example

```ts
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const bucket = new Bucket(this, "MyBucket");
  }
}
```

#### ❌ Incorrect Example

```ts
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const bucket = new Bucket(this, "MyConstruct");
  }
}
```
