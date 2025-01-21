---
title: eslint-cdk-plugin - require-default-doc-optional-props
titleTemplate: ":title"
---

# require-default-doc-optional-props

Props インターフェイスのオプショナルのプロパティには `@default` JSDoc ドキュメントを必須とします（例：`MyConstructProps`、`StackProps`）  
クラスのプロパティや Props ではないインターフェースには適用されません。

#### ✅ Correct Examples

```ts
interface MyConstructProps {
  // ✅ `@default` コメントが記載されている
  /**
   * @default - S3バケットを紐づけない
   */
  readonly bucket?: IBucket;
}

// ✅ インターフェース名が'Props'で終わらないため、チェックされない
interface Config {
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
