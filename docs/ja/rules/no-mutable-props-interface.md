---
title: eslint-plugin-cdk - no-mutable-props-interface
titleTemplate: ":title"
---

# no-mutable-props-interface

このルールは、コンストラクトまたはスタックの、`Props`(インターフェース)のパブリック変数を変更可能にすることを禁止します。

Props で変更可能なパブリック変数を指定すると、意図しない副作用を引き起こす可能性があるため推奨されません。

#### ✅ 正しい例

```ts
interface MyConstructProps {
  readonly bucket: IBucket;
}
```

#### ❌ 誤った例

```ts
interface MyConstructProps {
  bucket: IBucket;
}
```
