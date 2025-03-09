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

## Options

This rule has an options object with the following properties:

- `allowNonThisForNonScope` (default: `false`) - When `true`, allows non-`this` values for constructor parameters not named `scope`. This is useful when you want to create a construct as a child of another construct.

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      // Default: require `this` for all Construct instantiations
      "cdk/require-passing-this": "error",

      // Allow non-`this` values for constructor parameters not named `scope`
      "cdk/require-passing-this": ["error", { allowNonThisForNonScope: true }],
    },
  },
];
```

#### ✅ Correct Example

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // ✅ Can use this
    new Bucket(this, "SampleBucket");

    // ✅ With allowNonThisForNonScope: true, can use non-this values for parameters not named 'scope'
    const sample = new SampleConstruct(this, "Sample");
    new OtherConstruct(sample, "Child"); // Valid when allowNonThisForNonScope is true
  }
}
```

#### ❌ Incorrect Example

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // ❌ Shouldn't use scope
    new Bucket(scope, "SampleBucket");
  }
}
```
