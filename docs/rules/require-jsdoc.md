---
title: eslint-cdk-plugin - require-jsdoc
titleTemplate: ":title"
---

# require-jsdoc

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  ℹ️ This rule is not included in the
  <a href="/rules/#recommended-rules">recommended</a>
  rules.
</div>

This rule requires JSDoc comments for interface properties and, public properties in Construct classes.

Adding JSDoc comments to properties makes the code more maintainable and easier to understand by providing clear documentation of what each property represents.

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/require-jsdoc": "error",
    },
  },
];
```

#### ✅ Correct Examples

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ JSDoc comment for interface property
  /** S3 bucket to be specified for the resource */
  readonly bucket: IBucket;
}
```

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  // ✅ JSDoc comment for public property
  /** The S3 bucket created by this construct */
  public readonly bucket: IBucket;

  // ✅ When the property is not public, this rule is not applied
  private readonly bucketName: string;
}
```

#### ❌ Incorrect Examples

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ Must write JSDoc comment
  readonly bucket: IBucket;
}
```

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  // ❌ Must write JSDoc comment
  public readonly bucket: IBucket;
}
```
