---
title: eslint-plugin-awscdk - no-unused-props
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../../components/RecommendedItem.vue'
import Playground from '../../components/Playground.vue'
</script>

# no-unused-props

<RecommendedItem japanese />

このルールは、Construct の Props (interface) で定義されたすべてのプロパティが、Construct のコンストラクタ内で実際に使用されることを強制します。

CDK Construct の開発では、複数のプロパティを持つ Props (interface) を定義することが一般的ですが、開発者がコンストラクタの実装でこれらのプロパティの一部を使用するのを忘れる場合があり、これはデッドコードを引き起こします

(このルールは `Construct` を継承するクラスにのみ適用されます。)

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "awscdk/no-unused-props": "error",
    },
  },
]);
```

#### ✅ 正しい例

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  readonly bucketName: string;
  readonly enableVersioning: boolean;
}

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);

    // ✅ すべてのpropsプロパティが使用されています
    new Bucket(this, "MyBucket", {
      bucketName: props.bucketName,
      versioned: props.enableVersioning,
    });
  }
}
```

#### ❌ 不正な例

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  readonly bucketName: string;
  readonly enableVersioning: boolean;
  readonly unusedProp: string; // ❌ このプロパティは使用されていません
}

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);

    new Bucket(this, "MyBucket", {
      bucketName: props.bucketName,
      versioned: props.enableVersioning,
    });
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNrFVc1OGzEQfhVrT4CySUVvQZX6A4ceoKitemFR5XgnqcFrW7YXiKIce+sjtC/XJ+n4ZzdOQgCprchhs/F8M575vsnMonCWKTnls+GVVbIYF4tKElIVTDWaCzAftONK2qoYk2DxNkfNDJw/qoqTT4cvDg+rYtAZBZ94y0UyvayKy97WqLoV0DmewR0G2TB+BKtE6++MsEkra0wjw1lnOAu3O9NCf2yUcsccgd7LGpY8lvhcVrIY+LORVGUrWwt1qY3SdugsVswbrYwjC/IOC8WYzJElmRrVBBrSETJwVMke+rZl15Dh6K0tWX1dYvUj/26xbsRXcjQirx7+BMzvn9/xemMALz+5o41Gmp7ky6UDM6UMyOm8z//cFxf1MkBrJcWcTELGZ7SBMfEUyhnml9lB0omAL2Asco/WMZkoJYBKhCGBlYS7UDsT1Nr8MoIygqxtRl+4uadOmT3sMY339ogB4XWXxoAELcZbBex3HWdbDSmGd9wPxHpDIu6NEDFGeIJxHCyhBohXOiIl3CbN9tw3bgco2ek8HmCjdBeRNZZii6xOUqsRchNJAiwhYja5S8ilzxS/EoFPbYVfP8h7yf6uGb7+x27IYPHP5C/owwRRsITPSHOnx5zguwTkLUmy3VB5wv+so7ZYeLylnrtRcFCBFSjksB/LqxEVLd3MeR1/jq42ZlMNUy4BC0f31YRK4Bg1d3B2Payba7DMcO3KaMjBOOPORTvjcj1sqcNhiaMPEWn0JX0xHdqK8N2ntXfh610r1A6x31XToPBQB16GQ5zPj2CSHlNcVag3Lp2Dg9EBuq22TuolNPa53xetgxvcQQjudQ6jHT03V0fcM2CMWu0mv2vi83L/CIXUlF3TGWxsVs9v9O7WYXCrihpujkH7bCTDCba+crdF8REEdWDzJbrC7QDcr9cD0B3GbOHtQOSrMwf0nb78A61D4bo=" />
