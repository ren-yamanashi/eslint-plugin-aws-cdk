---
title: eslint-plugin-cdk - no-parent-name-construct-id-match
titleTemplate: ":title"
---

# no-parent-name-construct-id-match

このルールでは、親クラス名をコンストラクト ID として使用することを禁止します。

コンストラクト ID に親クラス名と一致する文字列を指定すると、CloudFormation リソースの階層が不明瞭になるため、これは避けるべきです。

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
    const bucket = new Bucket(this, "MyConstruct");
  }
}
```
