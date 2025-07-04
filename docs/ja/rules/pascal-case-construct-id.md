---
title: eslint-cdk-plugin - pascal-case-construct-id
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../../components/RecommendedItem.vue'
import FixableItem from '../../components/FixableItem.vue'
import Playground from '../../components/Playground.vue'
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
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/pascal-case-construct-id": "error",
    },
  },
]);
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

<Playground link="https://eslint-online-playground.netlify.app/#eNqNVMtu2zAQ/BWCl7aGJRXuzb0UTXJsG8THMghoau3QokiBjzxg6NhbP6H9uX5Jl9TDjhMh8cE2OLOj3eGs9tQ7YfRGbvOdM5ou6Z5pQhgVpm6kAvuj8dJox+iSJCRintst+HjE6MVq8XGxYHQ+gEquI/Kzhz4xej1itSmDgqHwOzygyAl4Bc6oEJ/Z0dZBl9jGEc95K0V6urcBxmNrjD+XSIxVzoq+osXvlmk6j2dFw53gKhPcQYZjo1QQPpNl7h2OLuvGWE/25GsQFXjSko01Ncrxe5eJsspwtiL+dzjVZ6aZLgry788vcsY1CQ7IZZI/Q3WmNdz3Ou/9rXRzlPn22B0w+mGs/vubrG5NUKV+55OG4DVMS9RvkXCaV3ATh5zQuFm/LlLBmq+TUxMi2UEE3QWnpPb5mKWDnWjcpQpbqQc3O2oytElAMrNne3eR4IHsHxtwwsrGZ11d7zw8JHoJGx6Ux7jhXec53mNX3jficguY5Bp0CWXKw9jNJKOP+QbT71KOZ7NihsKHICuut4Fvod+NcTMIabh1YDGZQxvdQV834M/rELFmB8KvwN5JAU+yHT/Dll51KV+Szq68Bs/zUlqNqRnpMfPpNy0A09foGF5Rw0WFXZ8sejS4W5phO1M1oyXcnUMTfdFCwskb4PmtRAXFPbjjnT7wJggvZOFF3peOWOxSH5NCE+DR/k4wxpfBiX7vYEvb/56yujU=" />
