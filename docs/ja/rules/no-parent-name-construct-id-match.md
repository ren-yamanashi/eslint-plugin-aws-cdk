---
title: eslint-cdk-plugin - no-parent-name-construct-id-match
titleTemplate: ":title"
---

# no-parent-name-construct-id-match

<div class="info-item">
    ✅ <a href="/ja/rules/#recommended-rules">recommended</a>
  を使用した場合、このルールが有効になります。
</div>

このルールでは、親クラス名をコンストラクト ID として使用することを禁止します。  
(このルールは `Construct` を継承するクラスにのみ適用されます)

コンストラクト ID に親クラス名と一致する(または含む)文字列を指定すると、CloudFormation リソースの階層が不明瞭になるため、推奨されません。

## オプション

このルールには以下のプロパティを持つオプションがあります：

### `disallowContainingParentName` (デフォルト: `false`)

`true` の場合、親クラス名を含むコンストラクト ID を使用することを禁止します。  
`false` の場合、親クラス名を含むコンストラクト ID を使用することを許可しますが、親クラス名と一致するコンストラクト ID を使用することを禁止します。

※`recommended` ルールセットでは `false` が指定されています

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default [
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
];
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

    // ✅ disallowContainingParentName が false の場合、親クラス名を含むコンストラクト ID を使用できます
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
