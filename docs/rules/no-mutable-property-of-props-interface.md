---
title: eslint-cdk-plugin - no-mutable-property-of-props-interface
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../components/RecommendedItem.vue'
import FixableItem from '../components/FixableItem.vue'
</script>

# no-mutable-property-of-props-interface

<RecommendedItem />
<FixableItem />

This rule disallows mutable properties in `Props` interfaces for CDK Constructs or Stacks.
(It prohibits defining properties in an interface whose name ends with "Props" without the `readonly` modifier.)

Specifying mutable properties in `Props` interfaces is not recommended as it can lead to unintended side effects.

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/no-mutable-property-of-props-interface": "error",
    },
  },
];
```

#### ✅ Correct Example

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ readonly properties are allowed
  readonly bucket: IBucket;
}
```

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

// ✅ This rule does not apply to interfaces not ending with "Props"
interface MyInterface {
  bucket: IBucket;
}
```

#### ❌ Incorrect Example

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ Properties in "Props" interfaces should be readonly
  bucket: IBucket;
}
```
