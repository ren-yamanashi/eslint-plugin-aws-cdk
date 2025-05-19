---
title: eslint-cdk-plugin - no-mutable-property-of-props-interface
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../components/RecommendedItem.vue'
import FixableItem from '../components/FixableItem.vue'
import Playground from '../components/Playground.vue'
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

<Playground link="https://eslint-online-playground.netlify.app/#eNp1VDty2zAQvQqGpcakMkqnNJnELlwk8djpQhcQsKIggQAGACVrNCrT5QjJ5XISLwB+9KMKEYN9+/Cwuw+HzDum1VJUxdpplc2zQ6kIKTOmayMk2B/GC61cmc1JjISYp7YCH7bK7OFl9mE2K7O7LijFIkR+taGPZfbax2rNGwld4nd4Q5KL4DM4LZtwZoItGsVRxgnOeStYPN3bBvptq7W/FwgMWc6yNuOI/8dSZXdhb6p0XjeeLiTkxmoD1u9zvYxrlwvlwS4pg8I7LISojbaeHMjjl4ZtwJMjWVpdIzvduZzxTY5XnYa1w0t+KlWp4C2m9ETk2/4rFg91Mv8Uzkg1nE7J/7+/iQXKtZJ70koR4Ai1QKiUegc8IHvIlkrBk455Jygemdj+/SGBvyURCkXG88psEOOIW+lGcrKAnjfkCzVCjmUrVav150o4YrE/hGtkUtoTagwK8/r0hLAPigtVkZ3wq0HGzdo89utYlsW1AmwbOIk5RT+kQ2ewBU+yqfC2bV8SNLbGxEBsS4v27iGGO7DfG3DMCuPzlHfeQw5L2kiPc4zKigJHIqW3QlxhAS1S42WBx0Hr1YwiWv8s0VYuGmQymU6QeHCIpKpqaAWt6XrLEWKodWBx5DsZaaPN6+LXeRixeg3Mv4DdCgZnpgm/zv7PyT5zkspV1OBpwYVVtB7gwUzDF+fjFUuGPTKUbVD2xRMSKpzs2Pk+ppUZh+09mFAYxXBez9+W67YEBkk9uNPXYsCNAG4Mw03c5wScrqOOUaKR4MlTMILA8qYH4IK/reAxO74DsoLenw==" />
