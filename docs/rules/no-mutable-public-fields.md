---
title: eslint-cdk-plugin - no-mutable-public-fields
titleTemplate: ":title"
---

# no-mutable-public-fields

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  ✅ Using
  <a href="/rules/#recommended-rules">recommended</a>
  in an ESLint configuration enables this rule.
</div>
<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  🔧 Some problems reported by this rule are automatically fixable by the
  <a href="https://eslint.org/docs/latest/use/command-line-interface#--fix">
    --fix ESLint command line option
  </a>
</div>

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
