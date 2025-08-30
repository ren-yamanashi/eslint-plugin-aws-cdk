---
title: eslint-plugin-aws-cdk - no-mutable-public-property-of-construct
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../../components/RecommendedItem.vue'
import FixableItem from '../../components/FixableItem.vue'
import Playground from '../../components/Playground.vue'
</script>

# no-mutable-public-property-of-construct

<RecommendedItem japanese />
<FixableItem japanese />

このルールは、CDK Construct の `public` プロパティを変更可能にすること(`readonly` 修飾子がない `public` プロパティの定義)を禁止するものです。

Construct は多くの場合、状態を持つ AWS リソースを表します。  
これらの `public` プロパティを `readonly` にすることで、Construct のインスタンス化後に意図しない変更が加えられることを防ぎ、予測可能で保守性の高いコードを実現できます。

そのため、`public` プロパティには `readonly` 修飾子を指定することを推奨します。

(このルールは `Construct` または `Stack` から派生したクラスにのみ適用されます)

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/no-mutable-public-property-of-construct": "error",
    },
  },
]);
```

#### ✅ 正しい例

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  // ✅ `public` かつ `readonly` なプロパティは許可されます
  public readonly bucket: IBucket;
}
```

#### ❌ 不正な例

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  // ❌ `public` プロパティは `readonly` にすべきです
  public bucket: IBucket;
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqdVMuS0zAQ/BWVT5Ba21S4hQsFy4EDj4Ljeg+yPA7ayJJKD3ZTqRy58Qnwc3wJI/klh4St2kse6p6Zdo/ah8xZpmTLt8WdVTLbZIdKElJlTHWaCzCftONK2irbkIgEzFGzBReOquzd1/WL9brKrkZQ8DogNwP0sspuJ6xTjRcwFn6EB2xyAn4Bq4QPM3ta7WWDMhKedYazON0ZD9OxUcpdcySGKmvYUHHEz2Mls6twVkqVd97RWkCufS04y7VRGozb56rN0Qhs7pkrnEUneKeVceRA3o7n5Ehao7poz3CEzryq5ER9/8azHSREem9z1uxytKUMvy0aggWVhIdYwgS1lnzYzzPQFZCNTaZG48uS/Pn1g/SyiQHaKCn2ZNDPwRJqgFAh1D00oeCUWUdlm1EiikBfnqbj98+xezLeflNeNKSGaWSi4sxwXAlYwaUrpgs4m94jo4mv+7/l3YnbDbRcAgrE8tnygdx3TQucXbZ1ew2WGa5d3gMpGZf2Wfgtl8u2cZk6AstFohbqRfyeND27CRYsntIWBjBbHVoLTbyhRYHX7RHOEL0WE2ljtlarcoVlc7iGbSE4CT/XraeHUNw+R/W4A03Zjm7hJP7Bmj5KY2ZjYZU18P0adOglGW59+V7418/QQVAHNk36zLtAOGP1f3gXwCR5FxhpiFNCtCjc0ONffWzEoQ==" />
