---
title: eslint-cdk-plugin - props-name-convention
titleTemplate: ":title"
---

# props-name-convention

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  ℹ️ このルールは
  <a href="/ja/rules/#recommended-rules">recommended</a>
  ルールには含まれていません。
</div>

Construct クラスの Props(interface) 名が `${ConstructName}Props` の形式に従うことを強制します。  
ここで、`${ConstructName}` は Construct クラスの名前です。

一貫した命名パターンに従うことで、Construct とその Props(interface) の関係が明確になり、コードの保守性と理解のしやすさが向上します。

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/props-name-convention": "error",
    },
  },
];
```

#### ✅ 正しい例

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

// ✅ Props(interface) 名が`${ConstructName}Props`の形式に従っている
interface MyConstructProps {
  readonly bucket?: IBucket;
}

class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);
  }
}
```

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

// ✅ Construct クラスではない interface には、このルールは適用されません
interface SampleInterface {
  readonly bucket?: IBucket;
}

class NotConstruct {
  constructor(props: SampleInterface) {}
}
```

#### ❌ 不正な例

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

// ❌ Props(interface) 名は `${ConstructName}Props` の形式に従う必要があります
interface Props {
  readonly bucket?: IBucket;
}

class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);
  }
}
```
