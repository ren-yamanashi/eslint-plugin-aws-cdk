---
title: eslint-cdk-plugin - no-construct-in-interface
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../../components/RecommendedItem.vue'
import Playground from '../../components/Playground.vue'
</script>

# no-construct-in-interface

<RecommendedItem japanese />

このルールは、`interface` のプロパティに CDK Construct 型 (例: `Bucket`) を指定することを禁止します。

interface のプロパティに Construct 型を使用すると、interface と Construct の間に密接な結合が作成されます。  
さらに、Construct は本質的に変更可能であるため、interface のプロパティに Construct 型を指定すると、予期しない動作が発生する可能性があります。  
したがって、このようなコードは推奨されません。

代わりに、読み取り専用リソースのための interface (例: `IBucket`) を指定することが推奨されます

---

#### 🔧 使用方法

```ts
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/no-construct-in-interface": "error",
    },
  },
];
```

#### ✅ 正しい例

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ 読み取り専用の interface (`IBucket` など) は使用できます
  readonly bucket: IBucket;
}
```

#### ❌ 不正な例

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ Construct 型 (`Bucket` など) のプロパティは使用すべきではありません
  readonly bucket: Bucket;
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNp1U8tuGjEU/RXLm0oIZiq6o5uqSRZdtI3CspOFY1+owWOP/KBBaJbd9RPan+uX5NqeB5AMQhj5nHvuw+eeqHfc6I3cFjtnNF3RU6UJqSg3dSMV2O+Nl0a7iq5IQiLmmd2Cj1cVvVsv3y+XFZ33oJJPEfnRQR8q+jhgtRFBQR/4DZ5R5Ap8AGdUiDkz7SlogWWc8Zy3kqfs3gYYrq0x/lYiMUY5y7uIFn/bStN5vCu1WWC3qBC4X0iNXw92wzgU3mHvsm6M9eREvnwOfA9+TvJJWrKxpkZh9sstuNgvsMsy/nfY38dKVxqeU+ggSL4eb/pM99Y0Lo+vLMn/v7/JDdMkOCB4DBERtsCE0epIDkxJkZOv+mpSnizx7w9Z/zRBCf3OZyHCFXPuQkPqC5VBpMVhgFOYuBiefmweu7tXYSt133Kmpq6bBKSOO7Z3dwnuyf7YgONWNn6R4y7HI2DDgvLoDiy0KHDqObwrxBUW0Hg1aAEiPd9QzSSjc+UGzeqS7WazcobCo+8U09vAttBZeTAyIQ2zDiwaqS8jX3RxPf46DhFrdsD9GuxBcriwYvz0S/WQTbkieVxFDZ4VQlrN6pEeLTqeaNZHHBm+UcP4Hsu+Wsw44WzyfptSWEUFHG6hiYPRXMLVxr5+lqigmAd3voMjb4Lwhhne5H3KxHKX6pgUmgDPtmyCMWzxlX43wZa2L4chnpI=" />
