---
title: eslint-cdk-plugin - no-public-class-fields
titleTemplate: ":title"
---

# no-public-class-fields

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  ✅ <a href="https://eslint-cdk-plugin.dev/rules/#recommended-rules">recommended</a>
  を使用した場合、このルールが有効になります。
</div>

このルールは、クラスの`public`変数にクラスを使用することを禁止します。

`public`変数でクラス型を使用すると、密結合が作成され、可変状態が公開されるため、推奨されません。

#### ✅ 正しい例

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  public readonly bucket: IBucket;
  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.bucket = new Bucket(this, "MyBucket");
  }
}
```

#### ❌ 不正な例

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  public readonly bucket: Bucket;
  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.bucket = new Bucket(this, "MyBucket");
  }
}
```
