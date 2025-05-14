---
title: eslint-cdk-plugin - require-passing-this
titleTemplate: ":title"
---

# require-passing-this

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

This rule enforces passing `this` as the scope when creating new Construct instances within a Construct.

When creating AWS CDK resources, passing `this` as the scope to child Constructs is crucial for maintaining the correct resource hierarchy.  
Passing other values as the scope (especially the `scope` variable received by the parent's constructor) can lead to:

- Incorrect resource hierarchy in the generated CloudFormation template
- Unexpected resource naming

(This rule applies only to classes that extend `Construct`.)

## Options

This rule has an option with the following properties:

### `allowNonThisAndDisallowScope`

Determines whether to allow constructs other than `this` as the scope (first argument) when instantiating a new Construct.

- `false`: Only `this` is allowed as the scope (first argument) when instantiating a new Construct.
- `true`: Allows passing Construct instances other than `this` as the scope (first argument).
  - However, directly passing the `scope` variable received by the parent's constructor is still disallowed.
  - This setting is useful for creating nested construct hierarchies.

Note: The `recommended` rule set specifies this option as `true`.

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      // allowNonThisAndDisallowScope: false: 
      // Only `this` is allowed as scope.
      "cdk/require-passing-this": "error",

      // allowNonThisAndDisallowScope: true:
      // Allows non-`this` as scope (but disallows parent's `scope` variable).
      "cdk/require-passing-this": [
        "error",
        { allowNonThisAndDisallowScope: true },
      ],
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

    // ✅ Using `this` as scope is always allowed.
    new Bucket(this, "SampleBucket");

    // The following example is valid when `allowNonThisAndDisallowScope` is `true` (as in the recommended set).
    const sample = new SampleConstruct(this, "Sample");
    // ✅ `sample` (an instance of a Construct) is allowed as scope.
    new OtherConstruct(sample, "Child");
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

    // ❌ Shouldn't use the parent's `scope` variable, 
    //    this is invalid even when allowNonThisAndDisallowScope is true.
    new Bucket(scope, "SampleBucket");
  }
}
```
