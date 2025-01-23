---
title: eslint-cdk-plugin - pascal-case-construct-id
titleTemplate: ":title"
---

# pascal-case-construct-id

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
    ✅ <a href="/ja/rules/#recommended-rules">recommended</a>
  を使用した場合、このルールが有効になります。
</div>
<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  🔧 このルールによってエラーになるコードは
  <a href="https://eslint.org/docs/latest/use/command-line-interface#--fix">
    ESLint の --fix コマンド
  </a>
  で自動修正できます。
</div>

このルールは、コンストラクト ID に PascalCase を強制します。  
(このルールは `Construct` または `Stack` を継承したクラスにのみ適用されます)

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
