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

<Playground link="https://eslint-online-playground.netlify.app/#eNp1U8tuGjEU/RXLm0oIZiq6o5uqSRZdtI3CspOFY1+owWOP/KBBaJbd9RPan+uX5NqeB5AMQhj5nHvuw+eeqHfc6I3cFjtnNF3RU6UJqSg3dSMV2O+Nl0a7iq5IQiLmmd2Cj1cVvVsv3y+XFZ33oJJPEfnRQR8q+jhgtRFBQR/4DZ5R5Ap8AGdUiDkz7SlogWWc8Zy3kqfs3gYYrq0x/lYiMUY5y7uIFn/bStN5vCu1WWC3qBC4X0iNXw92wzgU3mHvsm6M9eREvnwOfA9+TvJJWrKxpkZh9sstuNgvsMsy/nfY38dKVxqeU+ggSL4eb/pM99Y0Lo+vLMn/v7/JDdMkOCB4DBERtsCE0epIDkxJkZOv+mpSnizx7w9Z/zRBCf3OZyHCFXPuQkPqC5VBpMVhgFOYuBiefmweu7tXYSt133Kmpq6bBKSOO7Z3dwnuyf7YgONWNn6R4y7HI2DDgvLoDiy0KHDqObwrxBUW0Hg1aAEiPd9QzSSjc+UGzeqS7WazcobCo+8U09vAttBZeTAyIQ2zDiwaqS8jX3RxPf46DhFrdsD9GuxBcriwYvz0S/WQTbkieVxFDZ4VQlrN6pEeLTqeaNZHHBm+UcP4Hsu+Wsw44WzyfptSWEUFHG6hiYPRXMLVxr5+lqigmAd3voMjb4Lwhhne5H3KxHKX6pgUmgDPtmyCMWzxlX43wZa2L4chnpI=" />
