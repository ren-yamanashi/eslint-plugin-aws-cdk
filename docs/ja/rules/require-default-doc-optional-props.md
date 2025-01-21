---
title: eslint-cdk-plugin - require-default-doc-optional-props
titleTemplate: ":title"
---

# require-default-doc-optional-props

インターフェースのオプショナルなプロパティに対して `@default` JSDoc ドキュメンテーションを必須とします。  
このルールはクラスのプロパティには適用されません。

#### ✅ Correct Examples

```ts
interface MyConstructProps {
  // ✅ `@default` コメントが記載されている
  /**
   * @default - S3バケットを紐づけない
   */
  readonly bucket?: IBucket;
}
```

#### ❌ Incorrect Examples

```ts
interface MyConstructProps {
  // ❌ `@default`コメントを記載する必要があります
  readonly bucket?: IBucket;
}
```

```ts
interface MyConstructProps {
  // ❌ `@default`コメントを記載する必要があります
  /** デフォルト値の説明がないJSDocコメント */
  readonly bucket?: IBucket;
}
```
