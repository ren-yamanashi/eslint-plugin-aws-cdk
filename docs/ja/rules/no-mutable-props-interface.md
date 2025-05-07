---
title: eslint-cdk-plugin - no-mutable-props-interface
titleTemplate: ":title"
---

# no-mutable-props-interface

<div class="info-item">
    ✅ <a href="/ja/rules/#recommended-rules">recommended</a>
  を使用した場合、このルールが有効になります。
</div>
<div class="info-item">
  🔧 このルールによってエラーになるコードは
  <a href="https://eslint.org/docs/latest/use/command-line-interface#--fix">
    ESLint の --fix コマンド
  </a>
  で自動修正できます。
</div>

このルールは、コンストラクトまたはスタックの、`Props`(interface)のパブリック変数を変更可能にすることを禁止します。  
(`readonly`でない Props 変数の定義を禁止します)

Props で変更可能なパブリック変数を指定すると、意図しない副作用を引き起こす可能性があるため推奨されません。

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/no-mutable-props-interface": "error",
    },
  },
];
```

#### ✅ 正しい例

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ readonly のフィールドは使用できます
  readonly bucket: IBucket;
}
```

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

// ✅ Props ではない interface には、このルールは適用されません
interface MyInterface {
  bucket: IBucket;
}
```

#### ❌ 不正な例

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ mutable なフィールドは使用すべきではありません
  bucket: IBucket;
}
```
