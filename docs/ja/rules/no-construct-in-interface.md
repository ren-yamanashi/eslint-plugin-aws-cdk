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

<Playground link="https://eslint-online-playground.netlify.app/#eNp1VE2P2jAQ/SujnFoESUVv9FK1u4ce2q7YY7PSGmeSGhw7sh26COXYW39C++f6S3Zs5wPYBSFAfu/NjF/ecEyc5VqVokq3VqtklRxzBZAnXNeNkGi+N05oZfNkBQHxmGOmQueP8uT2fvluucyT+QBKsfHIjx56nycPI1bropU4CL/hExW5ANdotWx9z0jbtKqgMU541hnBQ3dnWhyPjdbuRhDRq6zhvaKjzy5XydyfZUov6LZUoeVuIRS9HZqScUydpbuLutHGwRG+fGr5Dt0c4jd0UBpdU2H2yy54sVvQLTP/29L9PuQqV/gUpGNB+Hr4PHS6M7qx0b4sg/9/f8MaWbHQSh4mgYU3mFYpPPa9H98CZwo2CK3FwmsNiYJmz6QoIms1jBqGiPX//YGxNbhDM5UeK9ufupUFKO2GBlBqAw0NisYJtGf9hDrrODbsyFW0kq6QjhmaXCSb7mRbCTV4F6nBviYAwbqe7extgAdymJsb0bhF1J37XGDJWukoZjRomtLji/J+EJsapATXqAosQg7Gaa4y+niXlHob8jubZTMqPAVYMlW1rMJ+J8aNAGiYsWgokcMY8aDXDfhLHSFGb5G7ezR7wfEs0/41bOc6pnsF0a60RsfSQhjF6onusz59U+ofyDJ6Rg3jOxr7YsO9w3FbhrUMsjwpcH+DjTdGcR+Fs9V/+Vh8Bckc2tNlnnhXCK+E4VXex0jMtmGOq4WugCfreoUx/h1c1O8d7JLuGdZeuC0=" />
