---
title: eslint-cdk-plugin - no-mutable-public-property-of-construct
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../components/RecommendedItem.vue'
import FixableItem from '../components/FixableItem.vue'
</script>

# no-mutable-public-property-of-construct

<RecommendedItem />
<FixableItem />

This rule disallows making `public` properties of a CDK Construct mutable (i.e. disallow defining `public` properties without the `readonly` modifier).

Constructs often represent stateful AWS resources.
Making these `public` properties `readonly` helps prevent unintended modifications after the Construct has been instantiated, leading to more predictable and maintainable code.

Therefore, it is recommended to specify the `readonly` modifier for `public` properties.

(This rule applies only to classes that extends from `Construct` or `Stack`.)

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/no-mutable-public-property-of-construct": "error",
    },
  },
];
```

#### ✅ Correct Example

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  // ✅ public readonly properties are allowed
  public readonly bucket: IBucket;
}
```

#### ❌ Incorrect Example

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  // ❌ public properties should be readonly
  public bucket: IBucket;
}
```
