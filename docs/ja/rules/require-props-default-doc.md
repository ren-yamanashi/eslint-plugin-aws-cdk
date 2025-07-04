---
title: eslint-cdk-plugin - require-props-default-doc
titleTemplate: ":title"
---

<script setup>
import NotRecommendedItem from '../../components/NotRecommendedItem.vue'
import Playground from '../../components/Playground.vue'
</script>

# require-props-default-doc

<NotRecommendedItem japanese />

このルールは、Construct の Props (interface) で定義されるオプショナルなプロパティに対して、そのデフォルトの挙動を示す `@default` JSDoc タグを含むドキュメントコメントを必須とします。  
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
      "cdk/require-props-default-doc": "error",
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

<Playground link="https://eslint-online-playground.netlify.app/#eNp9VMtS2zAU/ZU7Xnqw3YFduijTwqKdKWVId5gBId0YEVtyJRnIMFl2109of65fwpVkOw+SZJFkdM+5Oveh85o4y7WaySp/tFolk+S1VABlwnXTyhrNj9ZJrWyZTCBEfMwxU6HzR2VyPj3+cHxcJkdDsJb3PnLdh07K5GaMNVp0NQ7EC3yhJFvBK7S67vydEXbfKUEy1nDWGcnD7c50OB4brd2ZJKBnWcN7xpK+l6VKjvxZYfBXJw1mrdGtzQTOWFe7TGieO0u1y6bVxsErfP3c8Tk6WMLM6IYSsmebcTHPqLrC/7dU18dSlQpfAkUqh2bGOML3xRfqF0nj7tLfEttWFPD/72/4Nj3THKi3DSpP4nUnpKqAwd1pr+YOHKtgpg24BwQd2s9q8IrRuEUesqVpKDuFgQUZXGiYnsB9FC4tMGs1l8yhCBxIC/9jkAmt6kUP/DQZag3VRKH//vhkm1oPCxqz3h5Ou5kTX6R19oikuJB7qwdUQyOtpf4MRcNUNwgCLTcy6IBn6R400Yc2PLG6w3y71ttdsmgrStXP5ecDXWZo/UBotKC0A9a2xHQaKlRoqOBxxJbEMgIYDMBx3BDmTVrf7QRB6IXFTTg0gCWtKdqaiPn4KFdrSft3WXeVVMNSRmjYyzYEwk72aGfPQ3gAu0Xb9y2LvM0FHhp47TXmOb2HSO+F2NxgHJtAER7WqGYvoveLGdmIDYaQpkVKiVeOUDNVdazC3mRGiwFombFo6IkPMuJBzxvi73kUMfoRuZuieZIcN0zCfwa7u4p2MYHYrrxBx3IhjWLNCu7NY/3Xb8j6bWSTYr7fVKIXoTF65V8xFe3eDXWfxt0yPqcObLmvH1ZkD5YZaGUi8OkMW99jxSVu2fL7CfsMNVmAXTfaFW4PYMde7cSdRmDxGHTsTbQnuGapexA0qfiytvL3HVwmyzcE20Z/" />
