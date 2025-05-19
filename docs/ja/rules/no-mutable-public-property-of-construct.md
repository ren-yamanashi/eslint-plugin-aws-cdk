---
title: eslint-cdk-plugin - no-mutable-public-property-of-construct
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../../components/RecommendedItem.vue'
import FixableItem from '../../components/FixableItem.vue'
</script>

# no-mutable-public-property-of-construct

<RecommendedItem japanese />
<FixableItem japanese />

このルールは、CDK Construct の `public` プロパティを変更可能にすること(`readonly` 修飾子がない `public` プロパティの定義)を禁止するものです。

Construct は多くの場合、状態を持つ AWS リソースを表します。  
これらの `public` プロパティを `readonly` にすることで、Construct のインスタンス化後に意図しない変更が加えられることを防ぎ、予測可能で保守性の高いコードを実現できます。

そのため、`public` プロパティには `readonly` 修飾子を指定することを推奨します。

(このルールは `Construct` または `Stack` から派生したクラスにのみ適用されます)

---

#### 🔧 使用方法

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

#### ✅ 正しい例

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  // ✅ `public` かつ `readonly` なプロパティは許可されます
  public readonly bucket: IBucket;
}
```

#### ❌ 不正な例

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  // ❌ `public` プロパティは `readonly` にすべきです
  public bucket: IBucket;
}
```
