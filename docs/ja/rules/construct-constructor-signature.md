---
title: eslint-cdk-plugin - construct-constructor-signature
titleTemplate: ":title"
---

# construct-constructor-signature

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  ✅ ESLint設定で
  <a href="/ja/rules/#recommended-rules">recommended</a>
  を使用すると、このルールが有効になります。
</div>

このルールは、`Construct`を継承するクラスのコンストラクタが`scope, id`または`scope, id, props`という署名を持つことを強制します。

AWS CDK のベストプラクティスに従い、すべての Construct コンストラクタは、コードベース全体で一貫性を維持するために統一された署名パターンを持つべきです。

## オプション

このルールにはオプションはありません。

---

#### 🔧 使用方法

```ts
// eslint.config.mjs
export default [
  {
    // ... 他の設定
    rules: {
      "cdk/construct-constructor-signature": "error",
    },
  },
];
```

#### ✅ 正しい例

```ts
import { Construct } from "constructs";

// ✅ "scope, id"の署名を持つコンストラクタ
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }
}
```

```ts
import { Construct } from "constructs";

interface MyConstructProps {
  bucketName: string;
}

// ✅ "scope, id, props"の署名を持つコンストラクタ
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);
  }
}
```

```ts
import { Construct } from "constructs";

interface MyConstructProps {
  bucketName?: string;
}

// ✅ "scope, id, props?"の署名を持つコンストラクタ（オプションのprops）
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props?: MyConstructProps) {
    super(scope, id);
  }
}
```

#### ❌ 誤った例

```ts
import { Construct } from "constructs";

interface MyConstructProps {
  bucketName: string;
}

// ❌ 3つ以上のパラメータを持つコンストラクタ
export class MyConstruct extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: MyConstructProps,
    resourceName: string
  ) {
    super(scope, id);
  }
}
```

```ts
import { Construct } from "constructs";

interface MyConstructProps {
  bucketName: string;
}

// ❌ 3番目のパラメータが"props"という名前ではない
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, myProps: MyConstructProps) {
    super(scope, id);
  }
}
```

```ts
import { Construct } from "constructs";

// ❌ 最初のパラメータが"scope"という名前ではない
export class MyConstruct extends Construct {
  constructor(myScope: Construct, id: string) {
    super(myScope, id);
  }
}
```

```ts
import { Construct } from "constructs";

// ❌ 2番目のパラメータが"id"という名前ではない
export class MyConstruct extends Construct {
  constructor(scope: Construct, myId: string) {
    super(scope, myId);
  }
}
```
