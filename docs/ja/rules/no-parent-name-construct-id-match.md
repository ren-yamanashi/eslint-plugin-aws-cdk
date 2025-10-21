---
title: eslint-plugin-awscdk - no-parent-name-construct-id-match
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

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/no-parent-name-construct-id-match": "error",
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

    // ✅ 親クラス名を含むコンストラクト ID を使用できます
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
  }
}
```

## オプション

```ts
type Options = {
  disallowContainingParentName: boolean;
};

const defaultOptions: Options = {
  disallowContainingParentName: false,
};
```

### `disallowContainingParentName`

`true` の場合、親クラス名を含むコンストラクト ID を使用することを禁止します。  
`false` の場合、親クラス名を含むコンストラクト ID の使用は許可されますが、親クラス名と完全に一致するコンストラクト ID の使用は禁止します。

`{ disallowContainingParentName: true }` とした場合

#### ✅ 正しい例

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // ✅ 親コンストラクトと異なる名前は使用できます
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

    // ❌ 親コンストラクトと同じ名前は使用すべきではありません
    const bucket = new Bucket(this, "MyConstruct");

    // ❌ 親コンストラクト名を含む名前は使用すべきではありません
    const bucket = new Bucket(this, "MyConstructBucket");
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqFVLtyEzEU/RXNVibjtZnQmYYhpkiRkIGCIptCke7airXSjnSXxJNxSccnwM/xJVxJ+7LjOI0fuue+jo7Oc4ZeWFOq1ezBW5MtsufCMFZkwla10uC+1qis8UW2YDESYsjdCjAcFdmX7+fvz8+LbNoFtboPkds29KHI7vpYZWWjoUu8hicqchD8Bt7qJvRMsPvGSBpjhPPolIjd0TXQHztrcakIGLK8E23Gjj53hcmm4WxubF5zBwZzwyvIaXOq1gjMlcwrjmI9Q08cqKq2Dtkzu+gAbMdKZ6tITHtEnHwsTA/93IgNjHD80edCbnLiYx5+e2KC8IWBp5ghNPeeXW0v4jdRAUb6UcPIdt/MugndUw2LATFlSi5YYMOs3nWX45saWmiIv4sdQ2A+Z//+/GIX3LDGA+NMqrKEQAULVKSpcQ0s8TN0TukGHtsNJ7hWfkoLXm3TQZG96PJjDYYaeK61faSBkStDU97E0tehnfKs5JoGmUgoeaOReUAMm0yH1uxy6cO/Nn1vvMhanFzQSvcQtpInZu1pOz70398j6i+XzK9toyUzFulquEC9ZVEfx2c41TeAUjcSI2mRlAheK4Oz/t0NikuRTkKf0t/5w4HUiDJlgOal9EFwLThVHSeg3y+L2xq8cKrGPAXGYJLsjW5WyuyXjVKuY2Bfxt31jWea3IZl97b0MwdkKRWJHGR8mLMZvbU3MK2oSzIiHy3l7Gx+RmmDp7TvhoL94MeqdXBHDkPgtm68+mUr0wPZ4ZrHRxC0d+rSYw1yBbl521ySLw5pwbbAOTu4W3tMV3zi8STji87W53QLpsPweRckR2KrudjwFRzYe9BAssrOk2NikUn4uYQ6kGaEggPffymcUEFzBD928gH3CuCIpk7gXgmODPYVxNiqx4D+Ke7+A+coXSs=" />
