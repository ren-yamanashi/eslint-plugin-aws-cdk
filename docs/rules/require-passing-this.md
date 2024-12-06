---
title: eslint-cdk-plugin - require-passing-this
titleTemplate: ":title"
---

# require-passing-this

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  ✅ Using
  <a href="/rules/#recommended-rules">recommended</a>
  in an ESLint configuration enables this rule.
</div>
<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  🔧 Some problems reported by this rule are automatically fixable by the
  <a href="https://eslint.org/docs/latest/use/command-line-interface#--fix">
    --fix ESLint command line option
  </a>
</div>

This rule enforces passing `this` in a `Construct`.  
(This rule applies only to classes that extends `Construct`.)

When creating AWS CDK resources, passing `this` to the `Construct` is crucial for maintaining the correct resource hierarchy.  
Using other values like `scope` can lead to:

- Incorrect resource hierarchy in the generated CloudFormation template
- Unexpected resource naming

#### ✅ Correct Example

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    new Bucket(this, "SampleBucket");
  }
}
```

#### ❌ Incorrect Example

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    new Bucket(scope, "SampleBucket");
  }
}
```
