---
title: eslint-plugin-aws-cdk - no-construct-in-public-property-of-construct
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
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/no-construct-in-public-property-of-construct": "error",
    },
  },
]);
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

<Playground link="https://eslint-online-playground.netlify.app/#eNqNVM1u00AQfpWRT0kV2yjcUiEhKAcOBVSOdUWd9djdxtm19oc2inLkxiPAy/EkzO76NyTAIXGy3/fNzM58nn1kNJOi5FXyqKWIVtE+EwBZxOS24TWqj43hUugsWoFHHGZyVaFxR1n07vPyxXKZRYsOrPnaIbct9DKL7npsKwtbYyf8gM8U5Ai8QS1r63IG2tqKgsoY8bRRnPnsRlnsj5WU5ooT0am0Yq3iQN+HTEQLd5YKGdNtKYJlJuYibuy65ixulGxQmV0sywFPjKZ28G0jlYE9vO3O4QClklvfo/aI2nOZiZ76/o1lGzQLCM9BkD/pmBWbmHqUut+aukPCTOCzl7I61xqud0MuahGKQo+y+ymkKfz68Q1uMC9iKeodcGFQlTlDDTNMqgTu2yLu58ByAWsEq7Fw2nBnUKT10rXnrbqqfT0hw8/vo7xm1wzB+9j6Qdq6ACFNlwJKqaBtKEd9KuOXLmWfkQZIn76fUs3IlQ2uhvwL4MUK3OxFNe+sqC1lCVSHz30kAPPAdRJywCsQ+NQmmjlgQXO43oWDLJpI2rr+T0OmCr5CXVP3k/4tGkwTkG74r8Pf9PHILQWWXCBdlOSDVVpyiDoWGD0N6+fCFG9MHIAxmcz2qbYVF9Ow3oSNB6YGpFpyW/tnX9Ps1l13ckudKKQFsSVrYuFfsySh1+UfnHZoJa0V7RfExUV6QbJhQ7RuJ7Av/FS0QHdv9t38kibQ5GyTV3i0wVxjwjbo1o6XZVGBX6+wcZEEcw6drLY/u+ki1LlBPV5WA+8M4USj/8I7A472xRnGeAWNCZ1Do8Nvh6gB1w==" />
