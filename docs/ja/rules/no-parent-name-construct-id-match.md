---
title: eslint-cdk-plugin - no-parent-name-construct-id-match
titleTemplate: ":title"
---

# no-parent-name-construct-id-match

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
    ✅ <a href="/ja/rules/#recommended-rules">recommended</a>
  を使用した場合、このルールが有効になります。
</div>

このルールでは、親クラス名をコンストラクト ID として使用することを禁止します。

コンストラクト ID に親クラス名と一致する文字列を指定すると、CloudFormation リソースの階層が不明瞭になるため、推奨されません。

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/no-parent-name-construct-id-match": "error",
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
