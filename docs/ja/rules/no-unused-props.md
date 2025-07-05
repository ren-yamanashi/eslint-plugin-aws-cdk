---
title: eslint-cdk-plugin - no-unused-props
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../../components/RecommendedItem.vue'
import FixableItem from '../../components/FixableItem.vue'
import Playground from '../../components/Playground.vue'
</script>

# no-unused-props

<RecommendedItem japanese />

このルールは、CDK Construct のpropsインターフェースで定義されたすべてのプロパティが、コンストラクタ内で実際に使用されることを強制します。

CDK Construct の開発では、複数のプロパティを持つpropsインターフェースを定義することが一般的ですが、開発者がコンストラクタの実装でこれらのプロパティの一部を使用するのを忘れる場合があります。これは以下のような問題を引き起こします：

- **デッドコード**: 目的がない未使用のpropsプロパティ
- **メンテナンス負荷**: 使用されているように見えて実際には無視されているプロパティ
- **開発者の混乱**: どのプロパティが実際に必須でオプションなのかが不明
- **実行時の非効率性**: 渡されているが使用されないプロパティ

このルールは、開発プロセスの早い段階でこれらの問題を発見するのに役立ちます。

(このルールは `Construct` を継承するクラスにのみ適用されます。)

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/no-unused-props": "error",
    },
  },
]);
```

#### ✅ 正しい例

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  readonly bucketName: string;
  readonly enableVersioning: boolean;
}

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);
    
    // ✅ すべてのpropsプロパティが使用されています
    new Bucket(this, "MyBucket", {
      bucketName: props.bucketName,
      versioned: props.enableVersioning
    });
  }
}
```

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  readonly bucketName: string;
  readonly enableVersioning: boolean;
}

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);
    
    // ✅ 分割代入がサポートされています
    const { bucketName, enableVersioning } = props;
    new Bucket(this, "MyBucket", {
      bucketName,
      versioned: enableVersioning
    });
  }
}
```

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  readonly bucketName: string;
  readonly enableVersioning: boolean;
}

export class MyConstruct extends Construct {
  private props: MyConstructProps;
  
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);
    
    // ✅ this.propsパターンがサポートされています
    this.props = props;
    new Bucket(this, "MyBucket", {
      bucketName: this.props.bucketName,
      versioned: this.props.enableVersioning
    });
  }
}
```

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  readonly bucketName: string;
  readonly enableVersioning: boolean;
}

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, { bucketName, enableVersioning }: MyConstructProps) {
    super(scope, id);
    
    // ✅ インライン分割代入がサポートされています
    new Bucket(this, "MyBucket", {
      bucketName,
      versioned: enableVersioning
    });
  }
}
```

```ts
import { Construct } from "constructs";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    
    // ✅ propsパラメータがない場合は検証されません
    new Bucket(this, "MyBucket");
  }
}
```

#### ❌ 不正な例

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  readonly bucketName: string;
  readonly enableVersioning: boolean;
  readonly unusedProp: string; // ❌ このプロパティは使用されていません
}

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);
    
    new Bucket(this, "MyBucket", {
      bucketName: props.bucketName,
      versioned: props.enableVersioning
      // unusedPropは一度もアクセスされていません
    });
  }
}
```

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  readonly bucketName: string;
  readonly enableVersioning: boolean;
}

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);
    
    // ❌ プロパティが定義されているのに使用されていません
    new Bucket(this, "MyBucket", {
      bucketName: "hardcoded-name",
      versioned: true
    });
  }
}
```

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  readonly bucketName: string;
  readonly enableVersioning: boolean;
  readonly config: {
    readonly timeout: number;
  };
}

export class MyConstruct extends Construct {
  private props: MyConstructProps;
  
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);
    
    this.props = props;
    
    // ❌ 一部のプロパティのみが使用されています
    new Bucket(this, "MyBucket", {
      bucketName: this.props.bucketName
      // enableVersioningとconfigは使用されていません
    });
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqVVdty2jAQ/ZWNT9CpbSbc0gsD5dAD0AFuVQ+KtE7UyJJGkptmMjly4xPg5/gSVpJjO20Cl8TWvn379HbXuyJ4bnQjl9WDN7qYFzuqCaEFN62VCtwXG6TRnhZzkiIxFphbQohHtPj4bfZmNqPF5SGo5CJG7vrQW1rcD7HWiE7BIfEzPCHJs+BX8EZ1sWaGLTotUMYE54OTPFUProPh2BkTriUCY5Z3vM/Y4++e6uIyntXalG0X2EJBaZ2x4MK2NE169qXUAVzDOFTBoxGytcYFsiM37zu+hkD2pHGmRXa28SUX6xKvWsdnj5e8oppqeEopAxH5tP2A5qFOHm5jjexhXZM/v34QB0wYrbaklyLBE+aAMKXMBkREDpBHpqTIOuYHQalkZvv9k0T+nkRqFJnq0WIU44lfmU4JsoCBN+ZLfYYcbaO61/p9JT1x2B8iDDJpEwizFoUFM60Qz0ELqZdkI8NqlHHSm5vhOdmyeKkA2wZeYU41DOnYmRw5NOVdfq0fsBqmDt0T0EgN2AZMH1vYgzPrNCH4Y9qwteC5kzaUOTAF4xDcqm6Jfh/RpuGwKXA8GKiFdSr9D5pe3cW7H93SVw5w/1p0EkSa4qrCmfwPpl/PBrfWp/27uKgvMG1cQNw3hMfgIPwUW4bHxbl/fYUdsIyv2RKefSCiMXnZDlud0mgh4PEabGTSHKfx+Mvx0s3IoFgAP/0WjLgzgBNG/wN3JjjZ4zMIdCdvb7rGCEgGxfnc/wVfdM8z" />