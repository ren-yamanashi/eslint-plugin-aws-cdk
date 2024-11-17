---
title: eslint-plugin-cdk - ESLint plugin for AWS CDK
titleTemplate: ":title"
prev: false
---

# pascal-case-construct-id

This rule enforces PascalCase for construct IDs.

#### ✅ Correct Example

```ts
const bucket = new Bucket(this, "MyBucket");
```

#### ❌ Incorrect Example

```ts
const bucket = new Bucket(this, "myBucket");
```
