---
title: eslint-cdk-plugin - no-mutable-props-interface
titleTemplate: ":title"
---

# no-mutable-props-interface

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  ✅ Using
  <a href="https://eslint-cdk-plugin.dev/rules/#recommended-rules">recommended</a>
  in an ESLint configuration enables this rule.
</div>
<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  🔧 Some problems reported by this rule are automatically fixable by the
  <a href="https://eslint.org/docs/latest/use/command-line-interface#--fix">
    --fix ESLint command line option
  </a>
</div>

This rule disallow making public properties of constructs or stack `props` (interfaces) mutable.

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
