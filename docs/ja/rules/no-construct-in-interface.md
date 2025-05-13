---
title: eslint-cdk-plugin - no-construct-in-interface
titleTemplate: ":title"
---

# no-construct-in-interface

<div class="info-item">
  ✅ <a href="/ja/rules/#recommended-rules">recommended</a>
  を使用した場合、このルールが有効になります。
</div>

このルールは、`interface` のプロパティに CDK Construct 型 (例: `Bucket`) を指定することを禁止します。

interface のプロパティに Construct 型を使用すると、interface と Construct の間に密接な結合が作成されます。  
さらに、Construct は本質的に変更可能であるため、interface のプロパティに Construct 型を指定すると、予期しない動作が発生する可能性があります。  
したがって、このようなコードは推奨されません。

代わりに、読み取り専用リソースのための interface (例: `IBucket`) を指定することが推奨されます

---

#### 🔧 使用方法

```ts
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/no-construct-in-interface": "error",
    },
  },
];
```

#### ✅ 正しい例

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ 読み取り専用のインターフェース (`IBucket` など) は使用できます
  readonly bucket: IBucket;
}
```

#### ❌ 不正な例

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ Construct 型 (`Bucket` など) のプロパティは使用すべきではありません
  readonly bucket: Bucket;
}
```
