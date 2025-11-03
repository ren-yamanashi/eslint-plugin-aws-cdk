---
title: eslint-plugin-awscdk - no-mutable-property-of-props-interface
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../../components/RecommendedItem.vue'
import FixableItem from '../../components/FixableItem.vue'
import Playground from '../../components/Playground.vue'
</script>

# no-mutable-property-of-props-interface

<RecommendedItem japanese />
<FixableItem japanese />

このルールは、CDK Construct または Stack の、`Props` (interface) の `public` プロパティを変更可能にすることを禁止します。  
(`readonly` 修飾子がない Props プロパティの定義を禁止します)

Props で変更可能な `public` プロパティを指定すると、意図しない副作用を引き起こす可能性があるため、推奨されません。

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "awscdk/no-mutable-property-of-props-interface": "error",
    },
  },
]);
```

#### ✅ 正しい例

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ readonly なプロパティは許可されます
  readonly bucket: IBucket;
}
```

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

// ✅ Props ではない interface には、このルールは適用されません
interface MyInterface {
  bucket: IBucket;
}
```

#### ❌ 不正な例

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ Props のプロパティは `readonly` にすべきです
  bucket: IBucket;
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqFVMFy0zAQ/RWNT9CpbSbc0gsD5dAD0AFuVQ+KtE7UyJJGkptmMjly4xPg5/gSVpJjO20Cl8TWvn379HbXuyJ4bnQjl9WDN7qYFzuqCaEFN62VCtwXG6TRnhZzkiIxFphbQohHtPj4bfZmNqPF5SGo5CJG7vrQW1rcD7HWiE7BIfEzPCHJs+BX8EZ1sWaGLTotUMYE54OTPFUProPh2BkTriUCY5Z3vM/Y4++e6uIyntXalG0X2EJBaZ2x4MK2NE169qXUAVzDOFTBoxGytcYFsiM37zu+hkD2pHGmRXa28SUX6xKvWsdnj5e8oppqeEopAxH5tP2A5qFOHm5jjexhXZM/v34QB0wYrbaklyLBE+aAMKXMBkREDpBHpqTIOuYHQalkZvv9k0T+nkRqFJnq0WIU44lfmU4JsoCBN+ZLfYYcbaO61/p9JT1x2B8iDDJpEwizFoUFM60Qz0ELqZdkI8NqlHHSm5vhOdmyeKkA2wZeYU41DOnYmRw5NOVdfq0fsBqmDt0T0EgN2AZMH1vYgzPrNCH4Y9qwteC5kzaUOTAF4xDcqm6Jfh/RljYdljgbiDieDZTDOpX+B1mv7uL1jy7qKwe4gi2aCSINclXhWP4H029og4vr0wpeXNQXmDbuIK4cwmNw0H6KLcPj7ty/vsImWMbXbAnPvhHRm7xvh8VOabQQ8HgNNjJpjgN5/PF4aWhkUCyAn34ORtwZwGmv/wE9E5xs8xkEGpR3ON1kBCSP4pTu/wL+6NHJ" />
