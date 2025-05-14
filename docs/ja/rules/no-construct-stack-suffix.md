---
title: eslint-cdk-plugin - no-construct-stack-suffix
titleTemplate: ":title"
---

# no-construct-stack-suffix

<div class="info-item">
  ✅ <a href="/ja/rules/#recommended-rules">recommended</a>
  を使用した場合、このルールが有効になります。
</div>

このルールは、Construct ID および Stack ID に "Construct" または "Stack" 文字列を含めることを禁止します。

Construct ID に "Construct" という文字列が含まれていると、CDK の世界で止めるべき問題が CloudFormation テンプレートおよび AWS の世界に漏れてしまうため、好ましくありません。(Stack ID についても同様です)

(このルールは `Construct` または `Stack` から派生したクラスにのみ適用されます)

## オプション

このルールには以下のプロパティを持つオプションがあります：

- `disallowedSuffixes` - 禁止する suffix の配列。"Construct"、"Stack"、または両方を含めることができます。

※1. デフォルトでは `["Construct", "Stack"]` が指定されています  
※2. `recommended` ルールセットでは `["Construct", "Stack"]` が指定されています

---

#### 🔧 使用方法

```ts
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      // デフォルト: "Construct" と "Stack" の両方の suffix を禁止
      "cdk/no-construct-stack-suffix": "error",

      // "Construct" suffix のみを禁止
      "cdk/no-construct-stack-suffix": [
        "error",
        { disallowedSuffixes: ["Construct"] },
      ],

      // "Stack" suffix のみを禁止
      "cdk/no-construct-stack-suffix": [
        "error",
        { disallowedSuffixes: ["Stack"] },
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

    // ✅ "Construct" suffix が追加されていない場合は許可されます
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

    // ❌ "Construct" suffix を使用すべきではありません
    const bucket = new Bucket(this, "BucketConstruct");
  }
}
```
