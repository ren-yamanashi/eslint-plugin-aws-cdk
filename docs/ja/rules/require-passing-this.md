---
title: eslint-plugin-awscdk - require-passing-this
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../../components/RecommendedItem.vue'
import FixableItem from '../../components/FixableItem.vue'
import Playground from '../../components/Playground.vue'
</script>

# require-passing-this

<RecommendedItem japanese />
<FixableItem japanese />

このルールは `Construct` のコンストラクタに `this` を渡すことを強制します。

AWS CDK リソースを作成するとき、`Construct` に `this` を渡すことは正しいリソース階層を維持するために重要です。

Construct のコンストラクタの第一引数へ `this` 以外の値 (特に、親コンストラクタから受け取った `scope` 変数など) を渡してしまうと、次のような問題が発生する可能性があります

- 生成される CloudFormation テンプレートのリソース階層が正しくない
- 予期しないリソースの命名

(このルールは `Construct` から派生したクラスにのみ適用されます)

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/require-passing-this": "error",
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

    const sample = new SampleConstruct(this, "Sample");

    // ✅ `this` は常に使用できます
    new Bucket(this, "SampleBucket");

    // ✅ `sample` (Construct のインスタンス) をスコープとして渡すことが許可される
    new OtherConstruct(sample, "Child");
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

    // ❌ scope を使用すべきではありません
    new Bucket(scope, "SampleBucket");
  }
}
```

## オプション

```ts
type Options = {
  allowNonThisAndDisallowScope: boolean;
};

const defaultOptions: Options = {
  allowNonThisAndDisallowScope: true,
};
```

### `allowNonThisAndDisallowScope`

Construct のコンストラクタの第一引数 (スコープ) として、`this` 以外の値を許可するかどうかを決定します。

- `false`: 新しい Construct をインスタンス化する際、第一引数 (スコープ) として `this` のみが許可されます
- `true`: `this` 以外の Construct インスタンスを第一引数 (スコープ) として渡すことを許可します
  - ただし、親コンストラクタが受け取った `scope` 変数を直接使用することは引き続き禁止されます
  - この設定は、ネストされた Construct 階層を作成する場合に便利です。

#### ✅ Correct Example

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // ✅ `this` は常に使用できます
    new Bucket(this, "SampleBucket");
  }
}
```

#### ❌ Incorrect Example

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const sample = new SampleConstruct(this, "Sample");

    // ❌ scope を使用すべきではありません、
    new Bucket(scope, "SampleBucket");

    // ❌ 他の Construct インスタンスをスコープとして使用すべきではありません。
    new OtherConstruct(sample, "Child");
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqNVc1y0zAQfpUdX0g6+WHKLQwzQMuRliHlVHfGqr1J1CiSkeSkmUyO3HgEeDmehF35N2layMGOtd/ufvurXeRdavRMzkcPzuhoEu1iDRBHqVnlUqG9zr002sXRBIKEZV7YOXo+iqNP0/PX5+dxNKiFSt6z5LYSvYmju0a2MlmhsFa8wkcyciT8is6ogn2WsPtCZ0Sjg3PeyjR497bA5tga4y8lAVnL2bTS2NNzH+towGdji98LaXGYC+ekng/9QrqRdxS2XOXGetjBBUVLhlMPe5hZswq5qI4oDW9j3UA/FukSOzixccM0Ww4pBWP+7yh4wscaH4NGqsgtfN62LigDqDPXcRqS3Dg0tkflyXHSIgYgswlwEvS8X9fEFTlWUJb3g1cWjMfw59cP+MbRQsLhJiAcBCRIB0JtxJZfymwwG5VKGjdVbD3WGFBoU7HKFZaHcXRo//dPmC5MoTL9ykPhEPwCIRcWtX/lIAm+ElgLK8W9qgtGivRj80xD6rVQMgNco4bNgh6B0ZXRN4T4oLNL6cLJtCbOtX9Kt8rAKb7UCqETYk2ub4jhzLBBzgs+BjSbLWkEBslLFBIGJ0wigR4lVOoQtUWamxWVFDNw6PvEMNQSXOnhXSDb6YCjBJdUq6IlpRI70OTAeaFTBDMD0XZDvyxiqF5TWPLazUmwwj4uFlJl7IKmAZ2S2o+a2W9HoJTUPf2+/Bw/HPV+hjOpkXiQejsBFbi02lXw7tCs3+boUitzPywFXTDN0BdVzCmnB2bDbOVBcDhXxEUUKrwbTr1bLvlBlG7UKU9ow9GIhv8fmGrCZrQMXVhrZ2fjM1Jr91o1xCRsiJ+yVsMtbTkCV3bDJLzUaROYCeVw0oFfa7Wth/l0+RsoLa9seXLtlUu6RfIORWtNu2qr493/0At7tlGqQy0P+XkXmi4X6VLM8eiq4V4o13Z9PwS1OMpwfYk5J0+nEo/uoKcNxBaU8Oi6t0qLewZwordewD0j7Gz+ZxDdO6QLqBdTtP8L/eKMjg==" />
