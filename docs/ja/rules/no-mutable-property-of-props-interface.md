---
title: eslint-cdk-plugin - no-mutable-property-of-props-interface
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../../components/RecommendedItem.vue'
import FixableItem from '../../components/FixableItem.vue'
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
export default [
  {
    // ... some configs
    rules: {
      "cdk/no-mutable-property-of-props-interface": "error",
    },
  },
];
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
