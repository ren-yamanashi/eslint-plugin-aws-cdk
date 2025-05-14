---
title: eslint-cdk-plugin - require-props-default-doc
titleTemplate: ":title"
---

# require-props-default-doc

<div class="info-item">
  ℹ️ This rule is not included in the
  <a href="/rules/#recommended-rules">recommended</a>
  rules.
</div>

This rule requires a documentation comment including a `@default` JSDoc tag for optional properties defined in a Construct's Props interface, to indicate their default behavior.  
The names of such Props interfaces typically follow a format like `XxxxProps` (e.g., `MyConstructProps`, `MyStackProps`).

Note: This rule does not apply to regular class properties or properties within general interfaces not intended as Construct Props.

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/require-props-default-doc": "error",
    },
  },
];
```

#### ✅ Correct Examples

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ JSDoc comment including a `@default` tag for the optional property.
  /**
   * @default - No S3 bucket is associated.
   */
  readonly bucket?: IBucket;
}

// ✅ This rule does not apply to general interfaces that are not Construct Props.
interface Config {
  readonly bucket?: IBucket;
}
```

#### ❌ Incorrect Examples

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ No JSDoc comment for the optional property.
  readonly bucket?: IBucket;
}
```

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ JSDoc comment exists, but the `@default` tag is missing.
  /** Some description without default value. */
  readonly bucket?: IBucket;
}
```
