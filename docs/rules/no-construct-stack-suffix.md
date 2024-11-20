---
title: eslint-cdk-plugin - no-construct-stack-suffix
titleTemplate: ":title"
---

# no-construct-stack-suffix

This rule is to disallow using the `Construct` or `Stack` suffix in construct IDs and stack IDs.

If the Construct ID includes "Construct," the issues that should be stopped in the CDK world will leak into the CloudFormation template and the AWS world, so not good.(the same for Stack ID )

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
    const bucket = new Bucket(this, "BucketConstruct");
  }
}
```
