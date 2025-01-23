---
title: eslint-cdk-plugin - require-jsdoc
titleTemplate: ":title"
---

# require-jsdoc

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  ℹ️ このルールは
  <a href="/ja/rules/#recommended-rules">recommended</a>
  ルールには含まれていません。
</div>

このルールは、インターフェースのプロパティと Construct クラスの public プロパティに JSDoc コメントの記載を必須とします。

プロパティに JSDoc コメントを追加することで、各プロパティが何を表しているのかが明確になり、コードの保守性と理解のしやすさが向上します。

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/require-jsdoc": "error",
    },
  },
];
```

#### ✅ 正しい例

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ JSDocコメントが記載されている
  /** リソースに指定するS3バケット */
  readonly bucket: IBucket;
}
```

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  // ✅ JSDocコメントが記載されている
  /** Constructで作成されたS3バケット */
  public readonly bucket: IBucket;

  // ✅ publicでないプロパティには、このルールは適用されません
  private readonly bucketName: string;
}
```

#### ❌ 不正な例

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ JSDocコメントを記載する必要があります
  readonly bucket: IBucket;
}
```

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  // ❌ JSDocコメントを記載する必要があります
  public readonly bucket: IBucket;
}
```
