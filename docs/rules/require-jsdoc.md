---
title: eslint-cdk-plugin - require-jsdoc
titleTemplate: ":title"
---

# require-jsdoc

This rule requires JSDoc comments for interface properties and public properties in Construct classes.

Adding JSDoc comments to properties makes the code more maintainable and easier to understand by providing clear documentation of what each property represents.

#### ✅ Correct Examples

```ts
interface MyConstructProps {
  // ✅ JSDoc comment for interface property
  /** S3 bucket to be specified for the resource */
  readonly bucket: IBucket;
}
```

```ts
import { Construct } from "constructs";

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
interface MyConstructProps {
  // ❌ Must write JSDoc comment
  readonly bucket: IBucket;
}
```

```ts
import { Construct } from "constructs";

class MyConstruct extends Construct {
  // ❌ Must write JSDoc comment
  public readonly bucket: IBucket;
}
```
