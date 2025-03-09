---
title: eslint-cdk-plugin - require-passing-this
titleTemplate: ":title"
---

# require-passing-this

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
    ✅ <a href="/ja/rules/#recommended-rules">recommended</a>
  を使用した場合、このルールが有効になります。
</div>
<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  🔧 このルールによってエラーになるコードは
  <a href="https://eslint.org/docs/latest/use/command-line-interface#--fix">
    ESLint の --fix コマンド
  </a>
  で自動修正できます。
</div>

このルールは `Construct` に `this` を渡すことを強制します。  
(このルールは `Construct` を継承するクラスにのみ適用されます)

AWS CDK リソースを作成するとき、`Construct` に `this` を渡すことは正しいリソース階層を維持するために重要です。  
`scope` のような他の値を使用すると、次のような問題が発生する可能性があります

- 生成される CloudFormation テンプレートのリソース階層が正しくない
- 予期しないリソースの命名

## オプション

このルールには以下のプロパティを持つオプションオブジェクトがあります：

- `allowNonThisAndDisallowScope` (デフォルト: `false`、推奨: `true`) - `true` の場合、`scope` という名前ではないコンストラクタパラメータに対して `this` 以外の値を許可しますが、`scope` の直接使用は引き続き禁止します。これは、あるコンストラクトを別のコンストラクトの子として作成したい場合に便利です。

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      // デフォルト: すべてのConstructインスタンス化で`this`を要求
      "cdk/require-passing-this": "error",

      // `scope`という名前ではないコンストラクタパラメータに対して`this`以外の値を許可
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

    // ✅ this を使用できます
    new Bucket(this, "SampleBucket");

    // ✅ allowNonThisAndDisallowScope: true の場合、'scope'という名前ではないパラメータに対して this 以外の値を使用できます
    const sample = new SampleConstruct(this, "Sample");
    new OtherConstruct(sample, "Child"); // allowNonThisAndDisallowScope が true の場合は有効
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
