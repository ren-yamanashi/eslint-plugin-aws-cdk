---
title: eslint-cdk-plugin - require-props-default-doc
titleTemplate: ":title"
---

# require-props-default-doc

Props インターフェイスのオプショナルのプロパティには `@default` JSDoc ドキュメントを必須とします（例：`MyConstructProps`、`StackProps`）  
クラスのプロパティや Props ではないインターフェースには適用されません。

#### ✅ 正しい例

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ `@default` コメントが記載されている
  /**
   * @default - S3バケットを紐づけない
   */
  readonly bucket?: IBucket;
}

// ✅ Props ではない interface には、このルールは適用されません
interface Config {
  readonly bucket?: IBucket;
}
```

#### ❌ 不正な例

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ `@default`コメントを記載する必要があります
  readonly bucket?: IBucket;
}
```

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ `@default`コメントを記載する必要があります
  /** デフォルト値の説明がないJSDocコメント */
  readonly bucket?: IBucket;
}
```
