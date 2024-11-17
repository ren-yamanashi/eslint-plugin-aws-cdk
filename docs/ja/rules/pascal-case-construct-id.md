---
title: eslint-plugin-cdk - ESLint plugin for AWS CDK
titleTemplate: ":title"
prev: false
---

# pascal-case-construct-id

このルールは、コンストラクト ID に PascalCase を強制します。

#### ✅ 正しい例

```ts
const bucket = new Bucket(this, "MyBucket");
```

#### ❌ 不正な例

```ts
const bucket = new Bucket(this, "myBucket");
```
