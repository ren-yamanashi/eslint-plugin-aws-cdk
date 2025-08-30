---
title: eslint-plugin-aws-cdk - no-construct-in-public-property-of-construct
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../components/RecommendedItem.vue'
import Playground from '../components/Playground.vue'
</script>

# no-construct-in-public-property-of-construct

<RecommendedItem />

This rule disallows specifying Construct types (e.g. `Bucket`) for `public` properties of a CDK Construct.

Using Construct types for `public` properties of a Construct is discouraged because it can lead to tight coupling between Constructs and expose mutable state externally.

Instead, it is recommended to specify an interface for read-only resources (e.g. `IBucket`).

(This rule applies only to classes that extends from `Construct` or `Stack`.)

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/no-construct-in-public-property-of-construct": "error",
    },
  },
]);
```

#### ✅ Correct Example

```ts
import { Construct } from "constructs";
import { IBucket, Bucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  // ✅ Read-only interfaces (e.g. `IBucket`) can be used
  public readonly bucket: IBucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.bucket = new Bucket(this, "MyBucket");
  }
}
```

#### ❌ Incorrect Example

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  // ❌ Construct types (e.g. `Bucket`) should not be used for properties
  public readonly bucket: Bucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.bucket = new Bucket(this, "MyBucket");
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqNVM1u00AQfpWRT0kV2yjcUiEhKAcOBVSOdUWd9djdxtm19oc2inLkxiPAy/EkzO76NyTAIXGy3/fNzM58nn1kNJOi5FXyqKWIVtE+EwBZxOS24TWqj43hUugsWoFHHGZyVaFxR1n07vPyxXKZRYsOrPnaIbct9DKL7npsKwtbYyf8gM8U5Ai8QS1r63IG2tqKgsoY8bRRnPnsRlnsj5WU5ooT0am0Yq3iQN+HTEQLd5YKGdNtKYJlJuYibuy65ixulGxQmV0sywFPjKZ28G0jlYE9vO3O4QClklvfo/aI2nOZiZ76/o1lGzQLCM9BkD/pmBWbmHqUut+aukPCTOCzl7I61xqud0MuahGKQo+y+ymkKfz68Q1uMC9iKeodcGFQlTlDDTNMqgTu2yLu58ByAWsEq7Fw2nBnUKT10rXnrbqqfT0hw8/vo7xm1wzB+9j6Qdq6ACFNlwJKqaBtKEd9KuOXLmWfkQZIn76fUs3IlQ2uhvwL4MUK3OxFNe+sqC1lCVSHz30kAPPAdRJywCsQ+NQmmjlgQXO43oWDLJpI2rr+T0OmCr5CXVP3k/4tGkwTkG74r8Pf9PHILQWWXCBdlOSDVVpyiDoWGD0N6+fCFG9MHIAxmcz2qbYVF9Ow3oSNB6YGpFpyW/tnX9Ps1l13ckudKKQFsSVrYuFfsySh1+UfnHZoJa0V7RfExUV6QbJhQ7RuJ7Av/FS0QHdv9t38kibQ5GyTV3i0wVxjwjbo1o6XZVGBX6+wcZEEcw6drLY/u+ki1LlBPV5WA+8M4USj/8I7A472xRnGeAWNCZ1Do8Nvh6gB1w==" />
