---
title: eslint-cdk-plugin - no-parent-name-construct-id-match
titleTemplate: ":title"
---

# no-parent-name-construct-id-match

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  ✅ Using
  <a href="/rules/#recommended-rules">recommended</a>
  in an ESLint configuration enables this rule.
</div>

This rule disallows using the parent class name as the construct IDs.  
(This rule applies only to classes that extends `Construct`.)

It is not good to specify a string that matches (or includes) the parent class name for construct ID, as it makes the CloudFormation resource hierarchy unclear.

## Options

This rule has an options with the following properties:

### `disallowContainingParentName` (default: `false`)

When `true`, disallows construct IDs that contain the parent class name.  
When `false`, allows construct IDs that contain the parent class name, but disallows construct IDs that match the parent class name.

Note: The `recommended` rule set has `false` specified.

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      // Default: allow construct IDs that contain the parent class name (But disallow construct IDs that match the parent class name)
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

    // ✅ Can use a different name
    const bucket = new Bucket(this, "MyBucket");

    // ✅ With disallowContainingParentName is false, can use a construct ID that contains the parent class name
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

    // ❌ Construct ID should not match the parent class
    const bucket = new Bucket(this, "MyConstruct");

    // ❌ With disallowContainingParentName is true, Construct ID should not include the parent class name
    const bucket = new Bucket(this, "MyConstructBucket");
  }
}
```
