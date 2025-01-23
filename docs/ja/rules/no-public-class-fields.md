---
title: eslint-cdk-plugin - no-public-class-fields
titleTemplate: ":title"
---

# no-public-class-fields

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  ✅ <a href="/ja/rules/#recommended-rules">recommended</a>
  を使用した場合、このルールが有効になります。
</div>

このルールは、クラスの`public`変数にクラスを使用することを禁止します。  
(このルールは `Construct` または `Stack` を継承したクラスにのみ適用されます)

`public`変数でクラス型を使用すると、密結合が作成され、可変状態が公開されるため、推奨されません。

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/no-public-class-fields": "error",
    },
  },
];
```

#### ✅ 正しい例

```ts
import { Construct } from "constructs";
import { IBucket, Bucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  // ✅ interface のフィールドは使用できます
  public readonly bucket: IBucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.bucket = new Bucket(this, "MyBucket");
  }
}
```

#### ❌ 不正な例

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  // ❌ class のフィールドは使用すべきではありません
  public readonly bucket: Bucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.bucket = new Bucket(this, "MyBucket");
  }
}
```
