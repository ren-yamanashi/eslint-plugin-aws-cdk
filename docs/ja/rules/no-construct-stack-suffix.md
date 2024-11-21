---
title: eslint-cdk-plugin - no-construct-stack-suffix
titleTemplate: ":title"
---

# no-construct-stack-suffix

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  ✅ <a href="https://eslint-cdk-plugin.dev/rules/#recommended-rules">recommended</a>
  を使用した場合、このルールが有効になります。
</div>

このルールは、コンストラクト ID およびスタック ID で `Construct` または `Stack` サフィックスの使用を禁止するものです。

コンストラクト ID に `Construct` が含まれていると、CDK の世界で止めるべき問題が CloudFormation テンプレートおよび AWS の世界に漏れてしまうため、好ましくありません。(スタック ID についても同様です)

#### ✅ 正しい例

```ts
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const bucket = new Bucket(this, "MyBucket");
  }
}
```

#### ❌ 不正な例

```ts
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const bucket = new Bucket(this, "BucketConstruct");
  }
}
```
