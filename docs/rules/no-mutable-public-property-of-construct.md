---
title: eslint-cdk-plugin - no-mutable-public-property-of-construct
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../components/RecommendedItem.vue'
import FixableItem from '../components/FixableItem.vue'
import Playground from '../components/Playground.vue'
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
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/no-mutable-public-property-of-construct": "error",
    },
  },
]);
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

<Playground link="https://eslint-online-playground.netlify.app/#eNqdVMuS0zAQ/BWVT5Ba21S4hQsFy4EDj4Ljeg+yPA7ayJJKD3ZTqRy58Qnwc3wJI/klh4St2kse6p6Zdo/ah8xZpmTLt8WdVTLbZIdKElJlTHWaCzCftONK2irbkIgEzFGzBReOquzd1/WL9brKrkZQ8DogNwP0sspuJ6xTjRcwFn6EB2xyAn4Bq4QPM3ta7WWDMhKedYazON0ZD9OxUcpdcySGKmvYUHHEz2Mls6twVkqVd97RWkCufS04y7VRGozb56rN0Qhs7pkrnEUneKeVceRA3o7n5Ehao7poz3CEzryq5ER9/8azHSREem9z1uxytKUMvy0aggWVhIdYwgS1lnzYzzPQFZCNTaZG48uS/Pn1g/SyiQHaKCn2ZNDPwRJqgFAh1D00oeCUWUdlm1EiikBfnqbj98+xezLeflNeNKSGaWSi4sxwXAlYwaUrpgs4m94jo4mv+7/l3YnbDbRcAgrE8tnygdx3TQucXbZ1ew2WGa5d3gMpGZf2Wfgtl8u2cZk6AstFohbqRfyeND27CRYsntIWBjBbHVoLTbyhRYHX7RHOEL0WE2ljtlarcoVlc7iGbSE4CT/XraeHUNw+R/W4A03Zjm7hJP7Bmj5KY2ZjYZU18P0adOglGW59+V7418/QQVAHNk36zLtAOGP1f3gXwCR5FxhpiFNCtCjc0ONffWzEoQ==" />
