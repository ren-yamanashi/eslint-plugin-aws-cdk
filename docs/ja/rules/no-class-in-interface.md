---
title: eslint-plugin-cdk - no-class-in-interface
titleTemplate: ":title"
---

# no-class-in-interface

このルールは、インターフェイスのプロパティにクラスを使用することを禁止します。

インターフェイスのプロパティにクラスを使用すると、インターフェイスとクラス実装の間に密接な結合が作成されます。  
さらに、クラスは本質的に変更可能であるため、インターフェイスのプロパティ型としてクラスを使用すると予期しない動作が発生する可能性があります。  
したがって、このようなコードは避けるべきです。

#### ✅ 正しい例

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  bucket: IBucket;
}
```

#### ❌ 不正な例

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  bucket: Bucket;
}
```
