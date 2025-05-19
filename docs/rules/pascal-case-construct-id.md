---
title: eslint-cdk-plugin - pascal-case-construct-id
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../components/RecommendedItem.vue'
import FixableItem from '../components/FixableItem.vue'
</script>

# pascal-case-construct-id

<RecommendedItem />
<FixableItem />

This rule enforces writing Construct IDs in PascalCase.

Enforcing a consistent naming convention helps developers manage logical IDs more easily, and as a result, helps reduce the risk of unintentional logical ID collisions.

(This rule applies only to classes that extends from `Construct` or `Stack`.)

---

#### 🔧 How to use

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

#### ✅ Correct Example

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

// ✅ Can use PascalCase
const bucket = new Bucket(this, "MyBucket");
```

#### ❌ Incorrect Example

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

// ❌ Shouldn't use camelCase
const bucket = new Bucket(this, "myBucket");

// ❌ Shouldn't use snake_case
const bucket = new Bucket(this, "my_bucket");

// ❌ Shouldn't use kebab-case
const bucket = new Bucket(this, "my-bucket");
```
