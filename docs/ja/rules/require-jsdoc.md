---
title: eslint-cdk-plugin - require-jsdoc
titleTemplate: ":title"
---

# require-jsdoc

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
    ✅ <a href="/ja/rules/#recommended-rules">recommended</a>
  を使用した場合、このルールが有効になります。
</div>

このルールは、インターフェースのプロパティと Construct クラスの public プロパティに JSDoc コメントの記載を必須とします。

プロパティに JSDoc コメントを追加することで、各プロパティが何を表しているのかが明確になり、コードの保守性と理解のしやすさが向上します。

#### ✅ 正しい例

```ts
// インターフェースのプロパティ
interface MyConstructProps {
  /** リソースに指定するS3バケット */
  readonly bucket: IBucket;
  /** バケットの名前 */
  readonly bucketName: string;
}

// Constructクラスのpublicプロパティ
import { Construct } from "constructs";

class MyConstruct extends Construct {
  /** このConstructで作成されたS3バケット */
  public readonly bucket: IBucket;

  private readonly bucketName: string; // privateプロパティはJSDocが不要です
}
```

#### ❌ 誤った例

```ts
// インターフェースのプロパティにJSDocがない
interface MyConstructProps {
  bucket: IBucket; // ❌ JSDocコメントがありません
  /** バケットの名前 */
  bucketName: string;
}

// ConstructのpublicプロパティにJSDocがない
import { Construct } from "constructs";

class MyConstruct extends Construct {
  public readonly bucket: IBucket; // ❌ JSDocコメントがありません

  private readonly bucketName: string;
}
```
