---
title: eslint-cdk-plugin - no-construct-in-public-property-of-construct
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../../components/RecommendedItem.vue'
import Playground from '../../components/Playground.vue'
</script>

# no-construct-in-public-property-of-construct

<RecommendedItem japanese />

このルールは、CDK Construct の `public` プロパティに Construct 型 (例: `Bucket`) を指定することを禁止します。

Construct の `public` プロパティに Construct 型を使用すると、Construct 同士が密結合になり、また可変状態が外部に公開されるため、推奨されません。

代わりに、読み取り専用リソースのための interface (例: `IBucket`) を指定することが推奨されます

(このルールは `Construct` または `Stack` から派生したクラスにのみ適用されます)

---

#### 🔧 使用方法

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

#### ✅ 正しい例

```ts
import { Construct } from "constructs";
import { IBucket, Bucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  // ✅ 読み取り専用の interface (`IBucket` など) は使用できます
  public readonly bucket: IBucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.bucket = new Bucket(this, "MyBucket");
  }
}
```

#### ❌ 不正な例

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  // ❌ Construct 型 (`Bucket` など) のプロパティは使用すべきではありません
  public readonly bucket: Bucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.bucket = new Bucket(this, "MyBucket");
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqNVM1O20AQfpWRT4Bip6K3VJWqFg490FZwrFHZrMdmwd619geIUI699RHal+uTdHbXazuQSD1Aov2+b2byzc9zZg1XshZNcWeUzFbZcykByoyrrhct6q+9FUqaMltBQDxmmW7Q+qcyO786fXN6WmaLBLZi7ZHvA/S2zK5HrFOVazEJv+ATBXkBXqJRrfM5I23tZEVlzHjGasFDdqsdjs9aKXsmiOhVRvNBsaX/21JmC/+2lCqnX0sRHLe5kHnv1q3gea9Vj9puclVPeGEN2SG6XmkLz/ApvcMWaq264NHwRPa8K+VI/fzR8Xu0C4ifk4A9mpxX9zl5tPTfDblDwlLiU5DylhkDF5spF1mEsjKz7KELyyX8/f0TLpFVuZLtBoS0qGvG0cARFk0BN0MRN8fAmYQ1gjNYeW38zaBJG6TrwFulqkM9McOfX7O8dtNPwcfY5la5tgKpbEoBtdIwGCrQ7Mv4I6UcM1ID6W/0U+kjmsoeV1P+BYhqBb73sjlOo2gcZYlUjx+HSAD2Vpgi5oD3IPFxSHTkgQX14WITH8psRzLU9X8aGqo4V2hacr8Yt2gaGmr1t9Y1Qqb+R2oYgT4A87mx5jzAiRwM51r0No+63VmpsGautbRoVExR0LRG+VCIKTTSDnc0PViFTRirOcgYXK1p703Y4JOT5QkFnla4ZbJxrMHhKow3gXrMtEFNO5nKiA+DLuGvdYRodYfcXqF+EJxaPtvq0JnhPl3G/V5BtKvo0LKiElqybqL7bZ8+qT/XZBn1qGf8nsp+ceO8w/FepMMUZGVW4cMZ9t4Yyf0M7xy/123xEVpm0czP2cQ7QNgzDHt5HyJxeRfqOBjoADg7OQcY8ys2J6Qhz7b/ABiHEUM=" />
