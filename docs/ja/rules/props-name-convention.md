---
title: eslint-cdk-plugin - props-name-convention
titleTemplate: ":title"
---

# props-name-convention

Construct クラスの Props(interface) 名が `${ConstructName}Props` の形式に従うことを強制します。  
ここで、`${ConstructName}` は Construct クラスの名前です。

一貫した命名パターンに従うことで、Construct とその Props(interface) の関係が明確になり、コードの保守性と理解のしやすさが向上します。

#### ✅ 正しい例

```ts
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

#### ❌ 誤った例

```ts
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
