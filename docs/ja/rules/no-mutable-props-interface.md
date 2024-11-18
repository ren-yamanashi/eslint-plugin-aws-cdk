---
title: eslint-plugin-cdk - no-mutable-props-interface
titleTemplate: ":title"
---

# no-mutable-props-interface

このルールは、コンストラクトまたはスタックの Props (インターフェース) のパブリック プロパティを変更可能にすることを禁止します。

Props で変更可能なパブリック プロパティを指定することは、意図しない副作用を引き起こす可能性があるため、推奨されません。

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
