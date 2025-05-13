---
title: eslint-cdk-plugin - no-construct-in-public-property-of-construct
titleTemplate: ":title"
---

# no-construct-in-public-property-of-construct

<div class="info-item">
  ✅ <a href="/ja/rules/#recommended-rules">recommended</a>
  を使用した場合、このルールが有効になります。
</div>

このルールは、CDK Construct の `public` プロパティに Construct 型 (例: `Bucket`) を指定することを禁止します。

Construct の `public` プロパティに Construct 型を使用すると、Construct 同士が密結合になり、また可変状態が外部に公開されるため、推奨されません。

代わりに、読み取り専用リソースのための interface (例: `IBucket`) を指定することが推奨されます

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/no-construct-in-public-property-of-construct": "error",
    },
  },
];
```

#### ✅ 正しい例

```ts
import { Construct } from "constructs";
import { IBucket, Bucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  // ✅ 読み取り専用の interface (`IBucket` など) は使用できます
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
  // ❌ Construct 型 (`Bucket` など) のプロパティは使用すべきではありません
  public readonly bucket: Bucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.bucket = new Bucket(this, "MyBucket");
  }
}
```
