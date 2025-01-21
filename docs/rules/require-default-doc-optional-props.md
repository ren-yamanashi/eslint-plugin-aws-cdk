---
title: eslint-cdk-plugin - require-default-doc-optional-props
titleTemplate: ":title"
---

# require-default-doc-optional-props

Requires `@default` JSDoc documentation for optional properties in interfaces.  
This rule does not apply to class properties.

#### ✅ Correct Examples

```ts
interface MyConstructProps {
  // ✅ `@default` JSDoc comment for optional property
  /**
   * @default - No S3 bucket
   */
  readonly bucket?: IBucket;
}
```

#### ❌ Incorrect Examples

```ts
interface MyConstructProps {
  // ❌ Must write `@default` JSDoc comment
  readonly bucket?: IBucket;
}
```

```ts
interface MyConstructProps {
  // ❌ Must write `@default` JSDoc comment
  /** Some description without default value */
  readonly bucket?: IBucket;
}
```
