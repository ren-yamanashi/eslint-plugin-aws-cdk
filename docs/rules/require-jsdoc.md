---
title: eslint-cdk-plugin - require-jsdoc
titleTemplate: ":title"
---

# require-jsdoc

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  ✅ Using
  <a href="/rules/#recommended-rules">recommended</a>
  in an ESLint configuration enables this rule.
</div>

This rule requires JSDoc comments for interface properties and public properties in Construct classes.

Adding JSDoc comments to properties makes the code more maintainable and easier to understand by providing clear documentation of what each property represents.

#### ✅ Correct Examples

```ts
// Interface properties
interface MyConstructProps {
  /** S3 bucket to be specified for the resource */
  readonly bucket: IBucket;
  /** The name of the bucket */
  readonly bucketName: string;
}

// Construct class public properties
import { Construct } from "constructs";

class MyConstruct extends Construct {
  /** The S3 bucket created by this construct */
  public readonly bucket: IBucket;

  private readonly bucketName: string; // private properties don't require JSDoc
}
```

#### ❌ Incorrect Examples

```ts
// Missing JSDoc for interface property
interface MyConstructProps {
  bucket: IBucket; // ❌ Missing JSDoc comment
  /** The name of the bucket */
  bucketName: string;
}

// Missing JSDoc for public property in Construct
import { Construct } from "constructs";

class MyConstruct extends Construct {
  public readonly bucket: IBucket; // ❌ Missing JSDoc comment

  private readonly bucketName: string;
}
```
