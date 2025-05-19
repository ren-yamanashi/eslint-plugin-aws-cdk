---
title: eslint-cdk-plugin - no-construct-in-public-property-of-construct
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
export default [
  {
    // ... some configs
    rules: {
      "cdk/no-construct-in-public-property-of-construct": "error",
    },
  },
];
```

#### ✅ Correct Examples

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

<Playground link="https://eslint-online-playground.netlify.app/#eNqNVM1O20AQfpWRT4Bip6K3VJWqFg490FZwrFHZrMdmwd619geIUI699RHal+uTdHbXazuQSD1Aov2+b2byzc9zZg1XshZNcWeUzFbZcykByoyrrhct6q+9FUqaMltBQDxmmW7Q+qcyO786fXN6WmaLBLZi7ZHvA/S2zK5HrFOVazEJv+ATBXkBXqJRrfM5I23tZEVlzHjGasFDdqsdjs9aKXsmiOhVRvNBsaX/21JmC/+2lCqnX0sRHLe5kHnv1q3gea9Vj9puclVPeGEN2SG6XmkLz/ApvcMWaq264NHwRPa8K+VI/fzR8Xu0C4ifk4A9mpxX9zl5tPTfDblDwlLiU5DylhkDF5spF1mEsjKz7KELyyX8/f0TLpFVuZLtBoS0qGvG0cARFk0BN0MRN8fAmYQ1gjNYeW38zaBJG6TrwFulqkM9McOfX7O8dtNPwcfY5la5tgKpbEoBtdIwGCrQ7Mv4I6UcM1ID6W/0U+kjmsoeV1P+BYhqBb73sjlOo2gcZYlUjx+HSAD2Vpgi5oD3IPFxSHTkgQX14WITH8psRzLU9X8aGqo4V2hacr8Yt2gaGmr1t9Y1Qqb+R2oYgT4A87mx5jzAiRwM51r0No+63VmpsGautbRoVExR0LRG+VCIKTTSDnc0PViFTRirOcgYXK1p703Y4JOT5QkFnla4ZbJxrMHhKow3gXrMtEFNO5nKiA+DLuGvdYRodYfcXqF+EJxaPtvq0JnhPl3G/V5BtKvo0LKiElqybqL7bZ8+qT/XZBn1qGf8nsp+ceO8w/FepMMUZGVW4cMZ9t4Yyf0M7xy/123xEVpm0czP2cQ7QNgzDHt5HyJxeRfqOBjoADg7OQcY8ys2J6Qhz7b/ABiHEUM=" />
