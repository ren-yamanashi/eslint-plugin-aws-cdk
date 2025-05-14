---
title: eslint-cdk-plugin - no-parent-name-construct-id-match
titleTemplate: ":title"
---

# no-parent-name-construct-id-match

<div class="info-item">
  ✅ Using
  <a href="/rules/#recommended-rules">recommended</a>
  in an ESLint configuration enables this rule.
</div>

This rule disallows using the parent class name as the Construct ID.

It is not recommended to specify a string that matches (or includes) the parent class name for the Construct ID, as it can make the CloudFormation resource hierarchy unclear.
(This rule applies only to classes derived from `Construct` or `Stack`.)

## Options

This rule has an option with the following properties:

### `disallowContainingParentName` (default: `false`)

When `true`, disallows using construct IDs that contain the parent class name.
When `false`, using construct IDs that contain the parent class name is allowed, but using construct IDs that **exactly match** the parent class name is disallowed.

Note: The `recommended` rule set specifies `false`.

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      // Default: Allows construct IDs that contain the parent class name (but disallows construct IDs that exactly match the parent class name)
      "cdk/no-parent-name-construct-id-match": "error",

      // Disallow construct IDs that contain the parent class name
      "cdk/no-parent-name-construct-id-match": [
        "error",
        { disallowContainingParentName: true },
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

    // ✅ Can use a different name from the parent construct
    const bucket = new Bucket(this, "MyBucket");

    // ✅ When disallowContainingParentName is false (default setting), construct IDs containing the parent class name can be used
    const bucket = new Bucket(this, "MyConstructBucket");
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

    // ❌ Construct ID should not exactly match the parent class name
    const bucket = new Bucket(this, "MyConstruct");

    // ❌ When disallowContainingParentName is true, Construct ID should not include the parent class name
    const bucket = new Bucket(this, "MyConstructBucket");
  }
}
```
