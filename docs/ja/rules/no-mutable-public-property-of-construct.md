---
title: eslint-cdk-plugin - no-mutable-public-property-of-construct
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
export default [
  {
    // ... some configs
    rules: {
      "cdk/no-mutable-public-property-of-construct": "error",
    },
  },
];
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

<Playground link="https://eslint-online-playground.netlify.app/#eNqdVDty2zAQvQqGpcYkM0qnNJnELlLkM3YZugCBlQIJBDD42NZoVKbLEZLL5SRZgARJyVITFSJn39vdx4ddHArvmFZrsam2TqtiVRwaRUhTMN0ZIcF+NV5o5ZpiRRISMU/tBnwMNcXdw/LNctkUNxmUoo3I9wF62xSPI9ZpHiTkxC/wgkXOwHtwWobYs6e1QXGUMeM5bwVL3b0NMIat1v5WIDFmOcuGjCP+HxtV3MRYrXTZBU9bCaUJrRSsNFYbsH5f6nWJRmDxwHzlHTohOqOtJwfyMcfJkayt7pI9QwidedeokfrpQ2A7mBHpsysZ35VoSx3fHRqCCY2Cl5TCJHWOfN5PPdAVUNzNuibj65r8/f2T9LKJBcq1knsy6BfgCLVAqJT6GXhMOGe2SdkqS0QR6Mv/6fjzK1eftXc/dJCctDC2nKm40ByPBJwUylfjAE6mo2XfZNgIlX3sqclKk4C5797dJTiT/d6AY1YYX/Z5p55zWNMgPc4oCqwqPO0+fRDiKgs4/h1+PfA0RKOaq4xhN9a4Mi4N/2JRL7DwNP2Sqk2gGxgWalwntIhaBxbHOcvoA0Nexl/nIWL1Fph/APskGJwsRPzl1b7vV2NFeruqDjytuLCKdhM9Lsr0xNF4RMvwjAxlO5R9dj1Eh/tVyzud0pqCw9MtmGiMYjgVp/fG62OJFST14OY3wcS7QrgwDBd573tivU06rha6As5W9wpjfgvMCYODx+L4DyVC00M=" />
