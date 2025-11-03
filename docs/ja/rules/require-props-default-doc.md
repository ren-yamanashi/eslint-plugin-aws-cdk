---
title: eslint-plugin-awscdk - require-props-default-doc
titleTemplate: ":title"
---

<script setup>
import NotRecommendedItem from '../../components/NotRecommendedItem.vue'
import Playground from '../../components/Playground.vue'
</script>

# require-props-default-doc

<NotRecommendedItem japanese />

このルールは、Construct の Props(interface) で定義されるオプショナルなプロパティに対して、そのデフォルトの挙動を示す `@default` JSDoc タグを含むドキュメントコメントを必須とします。  
対象となる Props interface の名前は、一般的に `XxxxProps`（例: `MyConstructProps`, `MyStackProps`）のような形式です。

※Class のプロパティや、Construct の Props として意図されていない一般的なインターフェース内のプロパティには、このルールは適用されません。

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "awscdk/require-props-default-doc": "error",
    },
  },
]);
```

#### ✅ 正しい例

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ オプショナルなプロパティに `@default` タグを含むJSDocコメントが記載されている
  /**
   * @default - S3バケットを紐づけない
   */
  readonly bucket?: IBucket;
}

// ✅ Props ではない interface には、このルールは適用されません
interface Config {
  readonly bucket?: IBucket;
}
```

#### ❌ 不正な例

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ オプショナルなプロパティにJSDocコメント自体がない
  readonly bucket?: IBucket;
}
```

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ JSDocコメントはあるが、`@default` タグが含まれていない
  /** デフォルト値の説明がないJSDocコメント */
  readonly bucket?: IBucket;
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqFVEtS3DAQvUqXV4kL2ynYwSJUQhZJVQiVyQ5TIKQeI7AlR5KBqalZZpcjJJfLSdKSbM+HmWEzH/V7rdet7jdPnOVaTWWV31utkuNkXiqAMuG6aWWN5lvrpFa2TI4hRHzMMVOh80dl8mly+O7wsEwOhmAtb33ksg8dlcnVGGu06GociOf4TEk2gt/R6rrzd0bYbacEyVjBWWckD7c70+F4bLR2Z5KAnmUN7xkL+lyUKjnwZ4XBn500mLVGtzYTOGVd7TKhee4s1S6bVhsHc/j8oeMP6GABU6MbSsiebMbFQ0bVFf63pbpOSlUqfA4UqRyaKeMIX2cfqV8kjbsLf0tsW1HAvz+/4MvkTHOg3jaoPInXnZCqAgY3p72aG3Csgqk24O4QdGg/q8ErRuNmeciWpqHsFAYWZHCuYXIEt1G4tMCs1VwyhyJwIC38l0EmtKpnPfD98VBrqCYK/fvbJ1vXul/QmPV6f9r1nPgsrbMHJMWF3Bs9oBoaaS31ZygaJrpBEGi5kUEHPEl3p4k+tOGR1R3mm7Veb5NFU1Gq/l1+3NFlhsYPhEYLSjtgbUtMp6FChYYKHp/YklhGAIMBOD43hPcmrS9mgiC0YXES9j3AgsYUbU3EfFzK5VjGyDCRp/FvcU+7SdRxdKkTUmF/4zi/PThmXSU4u57Wzdq+vVkMrIJpAy7qrpJqPW3WhsOMFoMQ64sxPMyqrDeXvhFrhdrcYBwLgSIsbp7TTr6C6R1pSkZlg+WkaZESbek5ZDEE98FR+7ZsA9yPAIH7vN5WYk27jSP6DRqjlx7lPSd+Xr09oSdtGX9gFW44rO90ZA+2GGhlIvDxDFuvS3GJG9b78nl8hprW3K6a6RK3A7D95fZAdwRXjHEHgtod9yNUsgSEHvmZX/wHia069A==" />
