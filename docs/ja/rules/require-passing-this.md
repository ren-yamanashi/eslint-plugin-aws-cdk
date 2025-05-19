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
export default [
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
];
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

<Playground link="https://eslint-online-playground.netlify.app/#eNp1VMtuUzEQ/RXrbmir5AaVXRAS0LKkoAaJBbcLx57cuPW1jR99qMqSHZ8AP8eXMH7cR9MmiySac2bmeF6PlXdMq41o62unVbWsHhtFSFMx3RkhwX4xXmjlmmpJEhIxT20LPpqa6tPq9PXpaVPNelCKdUR+FOhNU10NWKd5kNA7XsA9BtkDL8FpGWLOTFsHxVHGhOe8FSxl9zbAYLZa+3OBxOjlLCseO/zeNaqaRdvCws8gLMwNdU6odu63wtXe4bNFZ7T15JGc4WsxMPNkRzZWd6kWxYRleNuogfoxsBuY8OidmzN+M8cSLOJ/h49HfqPgPnkwiWnJ54cxBVYAFHeTpKnIQ0Jtj7A9BpYjY0YEX5JYBNUe9z1xwUChRvw4ZY3AYkH+/flFzqgiwQGJ782Agrui/ygaZyh/RTsjIRub6mmMv7/JaquD5OqVT5FSrmehioKXYmErUicaVTR9F35LqJT67kKrb6jhg+LnwiXLKsYhwuUWE1bkK61Sy8gtlQEcOVoHj28qatBqBV3L5MhLJODHjUr1JC5pIu+S4EkX9gqQ5U4flcyRcLYVkkccxwmcFMrXw/KMM4Qj8FWGVqh+LjI1jYZJwHSMvPuU4J7sHww4ZoXx8+z3dIY4bGiQHvcLK1rXOLzZvQhxtQVc3Q6nCnhagEHNQUaZoQ2uu0uLe3KyOMHA4+ZKqtpAWyjHYDgFhBhqHVhcxV5GNhS/Hn/uh4jV18D8CuytYDjgk2WOn/4sXea1XpJcrroDT2surKLdSI9LPv7ikF1hybBHhrIblL132mKF85no71FyayoOt+dgYmEUE7B38563JUaQ1IObXrGRd4DwwjC8yHufiYvrpONgoAPg5BQdYEyP2pTQb2q1+w/X7w6s" />
