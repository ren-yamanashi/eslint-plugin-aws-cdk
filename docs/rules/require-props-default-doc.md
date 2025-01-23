---
title: eslint-cdk-plugin - require-props-default-doc
titleTemplate: ":title"
---

# require-props-default-doc

Requires `@default` JSDoc documentation for optional properties in Props interfaces.(e.g., `MyConstructProps`, `StackProps`).  
This rule does not apply to class properties or non-Props interfaces.

#### ✅ Correct Examples

```ts
interface MyConstructProps {
  // ✅ `@default` JSDoc comment for optional property
  /**
   * @default - No S3 bucket
   */
  readonly bucket?: IBucket;
}

// ✅ This rule does not apply to interfaces that are not Props
interface Config {
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
interface StackProps {
  // ❌ Must write `@default` JSDoc comment
  /** Some description without default value */
  readonly bucket?: IBucket;
}
```
