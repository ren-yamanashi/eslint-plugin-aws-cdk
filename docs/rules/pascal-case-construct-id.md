---
title: eslint-cdk-plugin - pascal-case-construct-id
titleTemplate: ":title"
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
