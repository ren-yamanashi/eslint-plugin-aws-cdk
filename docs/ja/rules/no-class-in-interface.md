---
title: eslint-cdk-plugin - no-class-in-interface
titleTemplate: ":title"
---

# no-class-in-interface

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  ✅ <a href="/ja/rules/#recommended-rules">recommended</a>
  を使用した場合、このルールが有効になります。
</div>

このルールは、インターフェイスのプロパティにクラスを使用することを禁止します。

インターフェイスのプロパティにクラスを使用すると、インターフェイスとクラス実装の間に密接な結合が作成されます。  
さらに、クラスは本質的に変更可能であるため、インターフェイスのプロパティ型としてクラスを使用すると予期しない動作が発生する可能性があります。  
したがって、このようなコードは推奨されません。

#### ✅ 正しい例

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ interface のフィールドは使用できます
  readonly bucket: IBucket;
}
```

#### ❌ 不正な例

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ class のフィールドは使用しないでください
  readonly bucket: Bucket;
}
```
