---
title: eslint-plugin-cdk - no-construct-stack-suffix
titleTemplate: ":title"
---

# no-construct-stack-suffix

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
