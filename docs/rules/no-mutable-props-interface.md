---
title: eslint-plugin-cdk - no-mutable-props-interface
titleTemplate: ":title"
---

# no-mutable-props-interface

This rule disallow making public properties of constructs or stack props (interfaces) mutable.

It is not a good to specify mutable public properties in props, as this can lead to unintended side effects.

#### ✅ Correct Example

```ts
interface MyConstructProps {
  readonly bucket: IBucket;
}
```

#### ❌ Incorrect Example

```ts
interface MyConstructProps {
  bucket: IBucket;
}
```
