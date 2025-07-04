---
title: eslint-cdk-plugin - require-passing-this
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

## オプション

このルールには以下のプロパティを持つオプションがあります：

### `allowNonThisAndDisallowScope`

Construct のコンストラクタの第一引数 (スコープ) として、`this` 以外の値を許可するかどうかを決定します。

- `false`: 新しい Construct をインスタンス化する際、第一引数 (スコープ) として `this` のみが許可されます
- `true`: `this` 以外の Construct インスタンスを第一引数 (スコープ) として渡すことを許可します
  - ただし、親コンストラクタが受け取った `scope` 変数を直接使用することは引き続き禁止されます
  - この設定は、ネストされた Construct 階層を作成する場合に便利です。

※1. デフォルトでは、このオプションは `false` に設定されています。  
※2. `recommended` ルールセットでは、このオプションは `true` に設定されています。

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      // allowNonThisAndDisallowScope: false:
      // スコープとして `this` のみ許可
      "cdk/require-passing-this": "error",

      // allowNonThisAndDisallowScope: true:
      // スコープとして `this` 以外を許可 (ただし、親の `scope` 変数の直接使用は禁止)
      "cdk/require-passing-this": [
        "error",
        { allowNonThisAndDisallowScope: true },
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

    // ✅ `this` は常に使用できます
    new Bucket(this, "SampleBucket");

    // 以下の例は `allowNonThisAndDisallowScope` が `true` (推奨設定) の場合に有効
    const sample = new SampleConstruct(this, "Sample");
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
    // allowNonThisAndDisallowScope が true の場合でも無効
    new Bucket(scope, "SampleBucket");
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqNVc1uGjEQfpXRXhIiWKr0RlWpbZJjkyqkp26kdXYHcPDaW9sLQYhjb32E9uX6JB3b+xcCUTgAmvnmf+bzNrImU3LG5/GjUTKaRNtEAiRRpoqSC9Q3peVKmiSagNc4nWV6jtaJkuhqev7u/DyJho1S8Aen+VGr3ifRfasrVF4JbAyv8Ymc7Clv0ShRuZgB9lDJnNLo4YzVPPPRra6wFWul7CUnoLMyOqstdvS9S2Q0dLKxxp8V1zgqmTFczkd2wU1sDZXNi1JpC1u4oGrJcWZhBzOtCt+LWkRt+JDIFvqlypbYw7G1GWX5ckQtGLv/hoonfCLxyVtkgsLC100XgjqAMje9oL7JbUClT2k8JU46xBB4PgHXBDkfNDMxVYk11OkHPqpTjMfw788v+O6qhdSVmwIz4JHADTCxZhv3I9Qa8zgYSVzXtZ06iyGVNmVFKTAIk+i5/7+/YbpQlcjliYXKINgFQsk0SntiIPWxUlgxzdmDaAZGhvRx7l0aXK6Y4DngCiWsF/TlM7pW8o4Qn2V+yY2XTJvE3exfplt34FC+tAp+ExJJoe8ow5lyDl1f8MmjnduQhs8gfS2F1IFTl0QKp9RQLn3VGuluChop5mDQDihDP0swIcJHn2xvA/YaHFKth5YGIxdAUgBjmcwQ1AxYtw2DMEQ/vXawFLXfE+/FxbhYcJG7EHQNaASXNm5vvzsB2uBvoppTRfVaB6jf7NIr+ldgzZVXN2C7KdFkmpd2FOyen0COM1YJS/RAA4ljur1gXidi4l4H/aa02RxF1CcwI7YynnfOzsZn5LgjHsHkvGJzrLmsZTJwW2pQE5M0aQRBbdfoX9qRRqtHzOwU9YpndJ89LvKLXbPqbWClCYR2xQVaFudcS1Z0cMdR/V9NPNiPRvvw2i5OYMaEwUkPfiPFpjn3wwvSQone8uVBYgw03iEdy6LWqiPjWrx9S3ptdd6oGU0Q0lne05bQWpYsW9Kk9h4jt1SB2JsXxJslUY6rSyzdLsiM494r9XITnQfBLJr+u9PhjgAO7P9B3KcAHD/6PI46OqLsPR5HEP1nqA9ouC3a/QeLZJv6" />
