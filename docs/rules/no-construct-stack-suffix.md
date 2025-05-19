---
title: eslint-cdk-plugin - no-construct-stack-suffix
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../components/RecommendedItem.vue'
</script>

# no-construct-stack-suffix

<RecommendedItem />

This rule disallows including the strings "Construct" or "Stack" in Construct IDs and Stack IDs.

Including "Construct" in a Construct ID (and similarly for "Stack" in a Stack ID) is discouraged because it can cause issues that should ideally be contained within the CDK environment to leak into the CloudFormation template and the broader AWS environment.

(This rule applies only to classes that extends from `Construct` or `Stack`.)

## Options

This rule has an options object with the following properties:

- `disallowedSuffixes` - An array of suffixes to disallow. Can include "Construct", "Stack", or both.

Note 1: By default `["Construct", "Stack"]` is specified.  
Note 2: The `recommended` rule set specifies `["Construct", "Stack"]`.

---

#### 🔧 How to use

```ts
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      // Default: disallow both "Construct" and "Stack" suffixes
      "cdk/no-construct-stack-suffix": "error",

      // Disallow only "Construct" suffix
      "cdk/no-construct-stack-suffix": [
        "error",
        { disallowedSuffixes: ["Construct"] },
      ],

      // Disallow only "Stack" suffix
      "cdk/no-construct-stack-suffix": [
        "error",
        { disallowedSuffixes: ["Stack"] },
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

    // ✅ Allowed if the "Construct" suffix is not added
    const bucket = new Bucket(this, "MyBucket");
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

    // ❌ Should not use the "Construct" suffix
    const bucket = new Bucket(this, "BucketConstruct");
  }
}
```
