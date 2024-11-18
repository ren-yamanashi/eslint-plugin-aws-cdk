---
title: eslint-plugin-cdk - no-mutable-public-fields
titleTemplate: ":title"
---

# no-mutable-public-fields

This rule disallow making public variables of a class mutable.

It's not good to have mutable public variables, because it can lead to unintended side effects.

#### ✅ Correct Example

```ts
export class MyConstruct extends Construct {
  public readonly bucket: IBucket;
}
```

#### ❌ Incorrect Example

```ts
export class MyConstruct extends Construct {
  public bucket: IBucket;
}
```
