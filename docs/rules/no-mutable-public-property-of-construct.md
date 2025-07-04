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

<Playground link="https://eslint-online-playground.netlify.app/#eNqdVDty2zAQvQqGpcYkM0qnNJnELlLkM3YZugCBlQIJBDD42NZoVKbLEZLL5SRZgARJyVITFSJn39vdx4ddHArvmFZrsam2TqtiVRwaRUhTMN0ZIcF+NV5o5ZpiRRISMU/tBnwMNcXdw/LNctkUNxmUoo3I9wF62xSPI9ZpHiTkxC/wgkXOwHtwWobYs6e1QXGUMeM5bwVL3b0NMIat1v5WIDFmOcuGjCP+HxtV3MRYrXTZBU9bCaUJrRSsNFYbsH5f6nWJRmDxwHzlHTohOqOtJwfyMcfJkayt7pI9QwidedeokfrpQ2A7mBHpsysZ35VoSx3fHRqCCY2Cl5TCJHWOfN5PPdAVUNzNuibj65r8/f2T9LKJBcq1knsy6BfgCLVAqJT6GXhMOGe2SdkqS0QR6Mv/6fjzK1eftXc/dJCctDC2nKm40ByPBJwUylfjAE6mo2XfZNgIlX3sqclKk4C5797dJTiT/d6AY1YYX/Z5p55zWNMgPc4oCqwqPO0+fRDiKgs4/h1+PfA0RKOaq4xhN9a4Mi4N/2JRL7DwNP2Sqk2gGxgWalwntIhaBxbHOcvoA0Nexl/nIWL1Fph/APskGJwsRPzl1b7vV2NFeruqDjytuLCKdhM9Lsr0xNF4RMvwjAxlO5R9dj1Eh/tVyzud0pqCw9MtmGiMYjgVp/fG62OJFST14OY3wcS7QrgwDBd573tivU06rha6As5W9wpjfgvMCYODx+L4DyVC00M=" />
