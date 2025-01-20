---
title: eslint-cdk-plugin - require-jsdoc
titleTemplate: ":title"
---

# require-jsdoc

このルールは、インターフェースのプロパティと Construct クラスの public プロパティに JSDoc コメントの記載を必須とします。

プロパティに JSDoc コメントを追加することで、各プロパティが何を表しているのかが明確になり、コードの保守性と理解のしやすさが向上します。

#### ✅ 正しい例

```ts
interface MyConstructProps {
  // ✅ JSDocコメントが記載されている
  /** リソースに指定するS3バケット */
  readonly bucket: IBucket;
}
```

```ts
import { Construct } from "constructs";

class MyConstruct extends Construct {
  // ✅ JSDocコメントが記載されている
  /** このConstructで作成されたS3バケット */
  public readonly bucket: IBucket;

  // ✅ publicでないプロパティには、このルールは適用されません
  private readonly bucketName: string;
}
```

#### ❌ 誤った例

```ts
interface MyConstructProps {
  // ❌ JSDocコメントがありません
  readonly bucket: IBucket;
}
```

```ts
import { Construct } from "constructs";

class MyConstruct extends Construct {
  // ❌ JSDocコメントがありません
  public readonly bucket: IBucket;
}
```
