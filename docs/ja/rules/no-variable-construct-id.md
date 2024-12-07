---
title: eslint-cdk-plugin - no-variable-construct-id
titleTemplate: ":title"
---

# no-variable-construct-id

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
    ✅ <a href="/ja/rules/#recommended-rules">recommended</a>
  を使用した場合、このルールが有効になります。
</div>

このルールは、コンストラクト ID に変数を使用しないことを強制するものです。  
(このルールは `Construct` から継承したクラスにのみ適用されます)

コンストラクト ID（論理 ID）に変数を使用することは、以下の問題を引き起こす可能性があるため適切ではありません  
(ループ処理は対象外です）

- 不要な重複
- パラメータ変更時のリソース再作成
- ID の一意性を重視するあまり、不要な文字列を混在させてしまう。

#### ✅ 正しい例

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

export interface MyConstructProps {
  environments: Record<string, string>;
}

class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);

    // ✅ 文字列リテラルは使用できます
    new Bucket(this, "Bucket");

    // ✅ ループ変数は使用できます
    for (const [key, value] of Object.entries(props.environments)) {
      new Bucket(this, `${key}Bucket`);
    }
  }
}
```

#### ❌ 不正な例

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

export interface MyConstructProps {
  stage: string;
}

class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);

    // ❌ コンストラクトIDとしてパラメータを使用すべきではありません
    new Bucket(this, id);

    // ❌ パラメータをテンプレート文字列に組み合わせるべきではありません
    new Bucket(this, `${id}Bucket`);

    // ❌ パラメータを任意の式に組み合わせるべきではありません
    new Bucket(this, id + "Bucket");

    // ❌ プロパティを直接使用しても問題です
    new Bucket(this, `${props.stage}Bucket`);
  }
}
```
