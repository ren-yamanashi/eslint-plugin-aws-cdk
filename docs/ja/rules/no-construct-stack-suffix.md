---
title: eslint-cdk-plugin - no-construct-stack-suffix
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../../components/RecommendedItem.vue'
import Playground from '../../components/Playground.vue'
</script>

# no-construct-stack-suffix

<RecommendedItem japanese />

このルールは、Construct ID および Stack ID に "Construct" または "Stack" 文字列を含めることを禁止します。

Construct ID に "Construct" という文字列が含まれていると、CDK の世界で止めるべき問題が CloudFormation テンプレートおよび AWS の世界に漏れてしまうため、好ましくありません。(Stack ID についても同様です)

(このルールは `Construct` または `Stack` から派生したクラスにのみ適用されます)

## オプション

このルールには以下のプロパティを持つオプションがあります：

- `disallowedSuffixes` - 禁止する suffix の配列。"Construct"、"Stack"、または両方を含めることができます。

※1. デフォルトでは `["Construct", "Stack"]` が指定されています  
※2. `recommended` ルールセットでは `["Construct", "Stack"]` が指定されています

---

#### 🔧 使用方法

```ts
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      // デフォルト: "Construct" と "Stack" の両方の suffix を禁止
      "cdk/no-construct-stack-suffix": "error",

      // "Construct" suffix のみを禁止
      "cdk/no-construct-stack-suffix": [
        "error",
        { disallowedSuffixes: ["Construct"] },
      ],

      // "Stack" suffix のみを禁止
      "cdk/no-construct-stack-suffix": [
        "error",
        { disallowedSuffixes: ["Stack"] },
      ],
    },
  },
]);
```

#### ✅ 正しい例

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // ✅ "Construct" および "Stack" suffix が追加されていない場合は許可されます
    const bucket = new Bucket(this, "MyBucket");
  }
}
```

#### ❌ 不正な例

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // ❌ "Construct" suffix を使用すべきではありません
    const bucket = new Bucket(this, "BucketConstruct");

    // ❌ "Stack" suffix を使用すべきではありません
    new Stack(this, "MyStack");
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNq9VbuS2jAU/RWNm+wy2M6QjjR5kHKTTCjXFF7rGrQIySPJAYahTJdPSH4uX5Krh1/EkG4bsO8996mj41NkdCFFydbJs5YimkenTBCSRYXcVYyD+lIZJoXOojlxHuszuVqDsaYs+rScvZ7NsmjaODl7sp7H4HqTRavWt5O05tAEfoYDJrlwfgMteW1rethTLSi20cNpo1jhqhtVQ2tWUpoFQ6CN0qoIEWf8PWcimlpbKmSM02KGujCxNnmxjXVdluyQGI2zs10llSEn8rEBkTMpldy5hQQT7uJtJlroh7rYQg+X73Vc0G2Me0jts8YN9PFLW3UU7nCZgINDFjzXmjwcu1ZwXSCo7jXnTqRtTKo7PMsK5h1iShidE7sxsb5vDlDXFQSo9d+7qtaRpuTPrx/kPedyD5SwkpgNYI9tuiwiuaBocUPgm18eyRUQIQ3Jqwo7BOrTCdiH7dyZDdNTjHs4ekMWDav+/kmWG1lz6tLUGkYq+1pXU/vXXsCVCuJVVyC0387TJXeGXtsBYHMip5BSSCjQnAmTtNenI5D3NEf8zr+mzxfMoVAyAdgxhneECGCftR9g9DCtOVagC8UqE3tHH4yU+srrNRPDtI5qlXMM2Ya95DV3/21Pd4922MGUOlGAyrBzp+zuV5Lg1fkPJvCuRD3RThkmk3SCYZ00BGqjs218LFsDVygUCA553QEvmM4tb4kU/HiDOQ6Mt5lur4uB168ObuUFlJKdCgUznmEoC3TpQsOAveorJ0FtkB3hRtvDi/WSLYfKI+3aR2+0vyt7B5D9FcLzNVx8NiwpvQQ3Wu8Cs4jC9wU4dRAFg4vvyb9Mthl4bkD3vxAd7gpghOQ3cFecA0UeRfQ/BX1Aqw3nv7smbq0=" />
