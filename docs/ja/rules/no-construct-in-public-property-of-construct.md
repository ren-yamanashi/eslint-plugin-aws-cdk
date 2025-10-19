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

このルールは、CDK Construct の `public` プロパティに、読み取り専用リソースのための interface (例: `IBucket`) を指定することを強制します。

AWS リソースを表す Construct (例: `Bucket`) が、読み取り専用リソースのための interface (例: `IBucket`) を implements している場合、Construct の `public` プロパティには、読み取り専用リソースのための interface (例: `IBucket`) を指定することが推奨されます。  
これにより、意図しないリソースの変更を防ぐことができます。

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
import { IBucket } from "aws-cdk-lib/aws-s3";
import { DockerImageAsset } from "aws-cdk-lib/aws-ecr-assets";
import { MetricFilter } from "aws-cdk-lib/aws-logs";

class MyConstruct extends Construct {
  // ✅ 読み取り専用リソースのための interface (`IBucket` など) は使用できます
  public readonly bucket: IBucket;

  // ✅ AWS リソースを表す Construct でない Construct (`DockerImageAsset` など) は使用できます
  public readonly asset: DockerImageAsset;

  // ✅ 読み取り専用リソースのための interface が存在しない場合、 Construct 型 (`MetricFilter` など) は使用できます
  public readonly metricFilter: MetricFilter;
}
```

#### ❌ 不正な例

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  // ❌ 読み取り専用リソースのための interface が存在する場合、 Construct 型 (`Bucket` など) は使用すべきではありません
  public readonly bucket: Bucket;
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqNVc1O20AQfpWRTwmKnYrejCqVllbiQFvBgQNGxVmPzYK9a+2uCxHKsbc+QvtyfZLO7vo3ENJD4mTn++bnG8/sU2A0kyLnRXSnpQji4CkRAEnAZFXzEtXX2nApdBLE4CzWZlJVoLFHSfDp4vDN4WESLDpjyVfWctWa3ibBdW+rZNaU2BG/4CM52TKeo5ZlY2N62KoRGaUxwmmjOHPRjWqwP1ZSmhNOQMvSirWMDX1vEhEs7NlSyJCqJQ8NMyEXYd2sSs7CWskalVmHMh/skdEkB69qqQw8wcfuHDaQK1k5jdojkucoET309EPD7tEswD8HQvqgQ5bdh6TR0v7WpM6YeCIJr06rtMBjrV9jIlNhaiFboc/QqvOZlwbVbnYpC89LBD46JivJG5ythyqpOSgyParb9X+5hL+/f8I5plkoRbkGLihUnjLUMMOoiOCmLf9mDiwVsEJoNGaW69UGRVxHXTlc3Onl8ukj9HE1mNvUQKoQhDRwfHlBHrRsFEMYOtAF35ZwfxZOxviZ9tNsLm9RUB5ISXBNeTi6F6BPpldiMRLNrOtBmXF39idWjdDxpLOj3P782hWs74K+lU2ZOfHaaJBLBe1Lz1G/FPx715y+NzRk9OkVl2pGm6PGeIi/AJ7FYOdTFPNuXeiGoniotc+dJyAtuY58DHgHAh/aQDNrWNA7e7b2B0kwobR5/R+HBt/PPuqSuhP1m24YbG/pBuW9/7u82xqrDHMukAol+jBWLdh7HROMnrp1fWGK1yb0hjGYBvNb2RRcTN26ga2dYTqqlEvalO7Z5zS7suVOqtSRQlriFQ0xZm4VRhGttD2Ytmk5rX7tlvjBwfKAaMMWb/cCGfvEX/Lm4Xb7Xs+PqAN1yu5ptLZuGSuM39jd1eBoSZDhjxOsrSfB7Bs6uX6eq2k9lKlBPb5QBtwOwAtCv4LbYRzt1h2I8TUxBnRvaLD5BxM3mUs=" />
