---
title: eslint-cdk-plugin - no-construct-stack-suffix
titleTemplate: ":title"
---

# no-construct-stack-suffix

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  ✅ Using
  <a href="https://eslint-cdk-plugin.dev/rules/#recommended-rules">recommended</a>
  in an ESLint configuration enables this rule.
</div>

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
