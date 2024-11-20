---
title: eslint-cdk-plugin - no-mutable-public-fields
titleTemplate: ":title"
---

# no-mutable-public-fields

このルールは、クラスのパブリック変数を変更可能にすることを禁止するものです。

パブリック変数が変更可能である場合、意図しない副作用が発生する可能性があるため、好ましくありません。

#### ✅ 正しい例

```ts
export class MyConstruct extends Construct {
  public readonly bucket: IBucket;
}
```

#### ❌ 不正な例

```ts
export class MyConstruct extends Construct {
  public bucket: IBucket;
}
```
