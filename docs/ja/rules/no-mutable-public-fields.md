---
title: eslint-cdk-plugin - no-mutable-public-fields
titleTemplate: ":title"
---

# no-mutable-public-fields

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
    ✅ <a href="/ja/rules/#recommended-rules">recommended</a>
  を使用した場合、このルールが有効になります。
</div>
<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  🔧 このルールによってエラーになるコードは
  <a href="https://eslint.org/docs/latest/use/command-line-interface#--fix">
    ESLint の --fix コマンド
  </a>
  で自動修正できます。
</div>

このルールは、クラスのパブリック変数を変更可能にすること(`readonly`でないパブリック変数の定義)を禁止するものです。  
(このルールは `Construct` または `Stack` を継承したクラスにのみ適用されます)

パブリック変数が変更可能である場合、意図しない副作用が発生する可能性があるため、推奨されません。

#### ✅ 正しい例

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  // ✅ readonly のフィールドは使用できます
  public readonly bucket: IBucket;
}
```

#### ❌ 不正な例

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  // ❌ mutable なフィールドは使用しないでください
  public bucket: IBucket;
}
```
