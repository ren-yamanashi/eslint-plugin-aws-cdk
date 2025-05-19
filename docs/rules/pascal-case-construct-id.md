---
title: eslint-cdk-plugin - pascal-case-construct-id
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

<Playground link="https://eslint-online-playground.netlify.app/#eNqNVM1u2zAMfhXBl21FbQ/drbsMa3rYYV3RHueiUGQmUSNLhkj3B0GOu+0Rtpfbk4ySbCdNa2w5JAH58RN/PnKTESpnF3pZ3KGz2Wm2qawQVaZc02oD/ltL2lmsslMRPcFH0i+BgqnKzq9P3p+cVNnx4DR6Hjzfe9eHKrsZfY2rOwND4AU8MsmB8wrQmS68mWDzztacxh4OyWsVXyffwWj2ztFMMzBEoVd9xJa/t5XNjoOtbCUqaXIlEXIum6k6RbmuC0IuXTet8yQ24nOn1kBiKxbeNUwnHzBX9Trn2srwH7mqj5WtbFmKP79+iDNpRYcgLiP9GbNX1sJDz/OWVhqPmebrUzJU2bsx+vdPcb1ynantG4ocSjYwTdH8DwVauYbbUOQEx+383yRrmMt57NQESb4j4e4CGm2pGLW0ayc37tJ0S22HbiZobGgbHbGZPZrwPLoHMD21gMrrlvIU13ceHiO8hoXsDLHceNZFwXNM4X0iWHhgJTdga6ijHsZsJhG9zBesfow6Pjoqj5h4J2Qj7bKTS+h3Y9wMIVrpETwrc0gjGfq4wf8yjj3e3YGia/D3WsEzbYfPsKVXSeWnIrWraIBkUWtvWTUjPGh+/9fzXu2/xvOeaZTGuAcxboH4MkNBK8kDc5Ykj4tWEBIGHoYyElGER/Y4+EjU69K6PIHy4H62VXkjSa3SNdiFhWUF791up3vzRtR9VmcpA22Xl5H6gplTS8aaYswwkGTkNb9hbbAYW6nWPJ+DkxaklM7DcIdiWJXVcD+DNijAKg0Ht+6l/gKDkQS4f712uAnAK6p/FfcpAcu7mMck0YRz71JNIMYBHfD3Hdxm27+JzQL/" />
