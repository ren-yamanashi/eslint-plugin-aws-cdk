---
title: eslint-cdk-plugin - no-parent-name-construct-id-match
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../../components/RecommendedItem.vue'
import Playground from '../../components/Playground.vue'
</script>

# no-parent-name-construct-id-match

<RecommendedItem japanese />

このルールでは、Construct ID に 親クラスの名前を指定することを禁止します。

Construct ID に、親クラス名と一致する(または含む)文字列を指定すると、CloudFormation リソースの階層が不明瞭になるため、推奨されません。

(このルールは `Construct` または `Stack` から派生したクラスにのみ適用されます)

## オプション

このルールには以下のプロパティを持つオプションがあります：

### `disallowContainingParentName`

`true` の場合、親クラス名を含むコンストラクト ID を使用することを禁止します。  
`false` の場合、親クラス名を含むコンストラクト ID の使用は許可されますが、親クラス名と完全に一致するコンストラクト ID の使用は禁止します。

※1. デフォルトでは `false` が指定されています  
※2. `recommended` ルールセットでは `false` が指定されています

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      // デフォルト: 親クラス名を含むコンストラクト ID を許可する (ただし、親クラス名と一致するコンストラクト ID は許可しない)
      "cdk/no-parent-name-construct-id-match": "error",

      // 親クラス名を含むコンストラクト ID を禁止
      "cdk/no-parent-name-construct-id-match": [
        "error",
        { disallowContainingParentName: true },
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

    // ✅ 親コンストラクトと異なる名前は使用できます
    const bucket = new Bucket(this, "MyBucket");

    // ✅ disallowContainingParentName が false (デフォルト設定) の場合、親クラス名を含むコンストラクト ID を使用できます
    const bucket = new Bucket(this, "MyConstructBucket");
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

    // ❌ 親コンストラクトと同じ名前は使用すべきではありません
    const bucket = new Bucket(this, "MyConstruct");

    // ❌ disallowContainingParentName が true の場合、親コンストラクト名を含む名前は使用すべきではありません
    const bucket = new Bucket(this, "MyConstructBucket");
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqFVb1SGzEQfhXNVcD4zhnSOU0mmIICwkCRgqMQuj1bWCfdSHuAx+MyXR4hebk8SVbS/WFshwLD7rfa1advP28SdMLoUi6yZ2d0Mks2uWYsT4SpaqnAfq9RGu3yZMZCxueQ2wWgD+XJ5f35p/PzPJl0SSWffOahTX3Ok8c+V5miUdAV3sAbHbKTvANnVON7RthTowsaY4RzaKUI3dE20IetMTiXBPRVzoq2Yku/t7lOJj421SatuQWNqeYVpHRzOq0RmMoirTiKZYaOOJBVbSyyDbvoAGzLSmuqQEwbIk6+5LqHfmvECkY4/upSUaxS4mPq/3bEBOFzDW+hQijuHLteX4RPogJ04UYNA9t9M2NP6J1qmA2ICZPFjHk29OK0exzX1NBCff40dPSJ6ZT9/f2TXXDNGgeMs0KWJXgqmKciTo1LYJGfoXMs1/Da3vAEl9JN6ILX6xjIkw9dfixBUwPHlTKvNDByqWnK23D0jW8nHSu5okFOCih5o5A5QPQ3mQyt2dXc+f/a8nfjBdbC5IKu9AT+VsWRWXva9g/959eI+qs5c0vTqIJpg/Q0XKBas6CP/TMc6+tBsRuJkbRISgSnpMas37tBcSSYW9UspO5UFKFBSHVIjEWH7jKkOzCua3DCyhrTWPdecR3TD36ULCOpx/J2EJdZoK2vSIdQhN3ppzmIaFVXklO4sPNnZ9MzOnhYesX1ouELaH2kdxHmWXRgaYu7MWKgrevyH+soY80zCLwH+yIFrcTIB/xP52h30RFmLNKVVYA8K6T1L9bDvT+MPy150LgbiWPeCnlHmLjkYU28Oo/JIpxBvlGs/m8/0TmHMm9sYK0Z/K8Nb46uV6Skv1Oo6R4kBkmJj6QNEmPNxYreZ8f+vZSilXaeHcrypICXOdReAVpI2Ple+Kg/f4LiCG7s9APuAGCP6vfivkbg9DnMcfCgA8mRQx9AjL1+DOh3efsP/klrzQ==" />
