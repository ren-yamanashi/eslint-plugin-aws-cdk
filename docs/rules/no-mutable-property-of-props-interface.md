---
title: eslint-plugin-awscdk - no-mutable-property-of-props-interface
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
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/no-mutable-property-of-props-interface": "error",
    },
  },
]);
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

<Playground link="https://eslint-online-playground.netlify.app/#eNqFVMFy0zAQ/RWNT9CpbSbc0gsD5dAD0AFuVQ+KtE7UyJJGkptmMjly4xPg5/gSVpJjO20Cl8TWvn379HbXuyJ4bnQjl9WDN7qYFzuqCaEFN62VCtwXG6TRnhZzkiIxFphbQohHtPj4bfZmNqPF5SGo5CJG7vrQW1rcD7HWiE7BIfEzPCHJs+BX8EZ1sWaGLTotUMYE54OTPFUProPh2BkTriUCY5Z3vM/Y4++e6uIyntXalG0X2EJBaZ2x4MK2NE169qXUAVzDOFTBoxGytcYFsiM37zu+hkD2pHGmRXa28SUX6xKvWsdnj5e8oppqeEopAxH5tP2A5qFOHm5jjexhXZM/v34QB0wYrbaklyLBE+aAMKXMBkREDpBHpqTIOuYHQalkZvv9k0T+nkRqFJnq0WIU44lfmU4JsoCBN+ZLfYYcbaO61/p9JT1x2B8iDDJpEwizFoUFM60Qz0ELqZdkI8NqlHHSm5vhOdmyeKkA2wZeYU41DOnYmRw5NOVdfq0fsBqmDt0T0EgN2AZMH1vYgzPrNCH4Y9qwteC5kzaUOTAF4xDcqm6Jfh/RpuGwKXA8GKiFdSr9D5pe3cW7H93SVw5w/1p0EkSa4qrCmfwPpl/PBrfWp/27uKgvMG1cQNw3hMfgIPwUW4bHxbl/fYUdsIyv2RKefSCiMXnZDlud0mgh4PEabGTSHKfx+Mvx0s3IoFgAP/0WjLgzgBNG/wN3JjjZ4zMIdCdvb7rGCEgGxfnc/wVfdM8z" />
