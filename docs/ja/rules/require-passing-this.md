---
title: eslint-cdk-plugin - require-passing-this
titleTemplate: ":title"
---

# require-passing-this

<div class="info-item">
    ✅ <a href="/ja/rules/#recommended-rules">recommended</a>
  を使用した場合、このルールが有効になります。
</div>
<div class="info-item">
  🔧 このルールによってエラーになるコードは
  <a href="https://eslint.org/docs/latest/use/command-line-interface#--fix">
    ESLint の --fix コマンド
  </a>
  で自動修正できます。
</div>

このルールは `Construct` に `this` を渡すことを強制します。  

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

※ `recommended` ルールセットでは、このオプションは `true` に設定されています。

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
