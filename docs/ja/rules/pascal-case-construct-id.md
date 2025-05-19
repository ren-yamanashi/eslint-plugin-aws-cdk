---
title: eslint-cdk-plugin - pascal-case-construct-id
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../../components/RecommendedItem.vue'
import FixableItem from '../../components/FixableItem.vue'
</script>

# pascal-case-construct-id

<RecommendedItem japanese />
<FixableItem japanese />

このルールは、Construct ID を PascalCase で記述することを強制します

一貫した命名規則を強制することで、開発者が論理 ID を管理しやすくし、結果として、意図しない 論理 ID の衝突リスクを低減するのに役立ちます

(このルールは `Construct` または `Stack` から派生したクラスにのみ適用されます)

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/pascal-case-construct-id": "error",
    },
  },
];
```

#### ✅ 正しい例

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

// ✅ PascalCase を使用できます
const bucket = new Bucket(this, "MyBucket");
```

#### ❌ 不正な例

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

// ❌ camelCase は使用すべきではありません
const bucket = new Bucket(this, "myBucket");

// ❌ snake_case は使用すべきではありません
const bucket = new Bucket(this, "my_bucket");

// ❌ kebab-case は使用すべきではありません
const bucket = new Bucket(this, "my-bucket");
```
