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

<Playground link="https://eslint-online-playground.netlify.app/#eNqNVMtu2zAQ/BWCl7aGJRXuzb0UTXJsG8THMghoau3QokiBjzxg6NhbP6H9uX5Jl9TDjhMh8cE2OLOj3eGs9tQ7YfRGbvOdM5ou6Z5pQhgVpm6kAvuj8dJox+iSJCRintst+HjE6MVq8XGxYHQ+gEquI/Kzhz4xej1itSmDgqHwOzygyAl4Bc6oEJ/Z0dZBl9jGEc95K0V6urcBxmNrjD+XSIxVzoq+osXvlmk6j2dFw53gKhPcQYZjo1QQPpNl7h2OLuvGWE/25GsQFXjSko01Ncrxe5eJsspwtiL+dzjVZ6aZLgry788vcsY1CQ7IZZI/Q3WmNdz3Ou/9rXRzlPn22B0w+mGs/vubrG5NUKV+55OG4DVMS9RvkXCaV3ATh5zQuFm/LlLBmq+TUxMi2UEE3QWnpPb5mKWDnWjcpQpbqQc3O2oytElAMrNne3eR4IHsHxtwwsrGZ11d7zw8JHoJGx6Ux7jhXec53mNX3jficguY5Bp0CWXKw9jNJKOP+QbT71KOZ7NihsKHICuut4Fvod+NcTMIabh1YDGZQxvdQV834M/rELFmB8KvwN5JAU+yHT/Dll51KV+Szq68Bs/zUlqNqRnpMfPpNy0A09foGF5Rw0WFXZ8sejS4W5phO1M1oyXcnUMTfdFCwskb4PmtRAXFPbjjnT7wJggvZOFF3peOWOxSH5NCE+DR/k4wxpfBiX7vYEvb/56yujU=" />
