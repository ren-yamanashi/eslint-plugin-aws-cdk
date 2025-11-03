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
      "awscdk/require-passing-this": "error",
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

<Playground link="https://eslint-online-playground.netlify.app/#eNqNVc1uEzEQfpXRXppU+UHlFoQEtBxpESmnbqV1dyeJW8debG/SKMqRG48AL8eTMOP9TZqW9pA0M9/MfPPrbeRdavRMzkf3zuhoEm1jDRBHqVnmUqG9yr002sXRBIKGdV7YOXoWxdHn6dmbs7M4GtRKJe9Yc1Op3sbRbaNbmqxQWBte4iM5OVB+Q2dUwTFL2F2hM6LRwTlvZRqie1tgI7bG+AtJQLZyNq0sdvS5i3U0YNnY4o9CWhzmwjmp50O/kG7kHaUtl7mxHrZwTtmS49TDDmbWLEMtKhGV4V2sG+inIn3ADk6s3TDNHoZUgjH/7yh5wscaH4NFqigsfNm0IagCqDPXCRqK3AQ0tkftyXHSIgYgswlwEfS8X/fEFTlWUNb3Q1RWjMfw9/dP+M7ZQsLpJiAcBCRIB0KtxYa/lFljNiqNNK6r3HpsMaDUpmKZKyyFcbTv/88vmC5MoTJ94qFwCH6BkAuL2p84SEKsBFbCSnGn6oaRIf2xe6Yh9UoomQGuUMN6QR+B0aXR14T4qLML6YJkWhPn3j+lW1XgGF8ahTAJsabQ18RwZtgh1wUfA5rdljQCg+QlCgmDEyaRQI8KKnXI2iLtzZJaihk49H1iGHoJrozwPpDtTMBBgUuqVdOS0ogDaArgvNApgpmBaKehXzYxdK9pLEXt1iR44RjnC6kyDkHbgE5J7UfN7rcrUGrqmf5Q/hzfH8x+hjOpkXiQebsBFbj02jXwbt+t3+ToUitzPywVXTDt0FdVzKmme26HeRAOabUIsb9aREcUKnw3tHo33PW9RN2o06EwiaMR7f9/MNWSzegeunDZTk/Hp2TWnrZqj0nZcD/mrYZbOnQErvyGZXhp2CYwE8rhpAO/0mpT7/PxCWig4S4RraPHrzzVLZgvKVpr2oNbibevYRiubWNUZ1sK+fM2jF4u0gcxx4MHhyeiPN71KxHM4ijD1QXmXD+dSjx4iZ6OEXtQwqPrvi0t7hnA8Ql7AfqMsvMEPIPoPiZdQH2hot0/q6uQbw==" />
