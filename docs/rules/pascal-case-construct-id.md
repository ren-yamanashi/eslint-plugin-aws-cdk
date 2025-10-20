---
title: eslint-plugin-awscdk - pascal-case-construct-id
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../components/RecommendedItem.vue'
import FixableItem from '../components/FixableItem.vue'
import Playground from '../components/Playground.vue'
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
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/pascal-case-construct-id": "error",
    },
  },
]);
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

<Playground link="https://eslint-online-playground.netlify.app/#eNqNU8ty0zAU/RWNNpRMbDNhVzYMKUugQ5dVpyPLN6lqWfLoQdvJZMmOT4Cf40u4kh3bCTVl44fOuUe6R/fsqHfC6I3c5vfOaHpOd0wTwqgwTSsV2C+tl0Y7Rs9JQiLmud2Cj0uMfrxavVmtGF0eQCXLiFz30FtGbwasMVVQcCj8DI8ocgJ+BWdUiHt2tDLoCo8x4TlvpUi7extgWLbG+AuJxFjlrOgr9vjcM02Xca1ouRNcZYI7yLBtlArCZ7LKvcPWZdMa68mOfAiiBk/2ZGNNg3L8wWWiqjPsrYjfDrt6xzTTRUF+//xO1lyT4IBcJvk1qjOt4aHXOfN30i1R5tNTt8Do66H61w9ydWeCqvQrnzQEb2BeovkfCad5DbexyRmN2/JlkRpKXianZkSyUQTdBaek9vkwS6OdHXKw8n33W9zjSOHmg+UVbKSGdSofje/Jneq0wLtjWf/UghNWtj7rgCkZr+5Sha3Ux7LpStsE9NcJj4mPZ+FBpfdwprPrOE1HXbrcAsakAV1BlYYtz3GQXuD0KdpguFyKyWJRLLBszAnGAukRHA7+nFpHj/N9k26g5aLmWzjJcTSmy8QhfKmM0Qq+XUAblbSQcBLwv92MCop7cNPIjrwZwjNG/4M3A07SN8MYopzaGAnJIMw/3f8BUOyq9Q==" />
