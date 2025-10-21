---
title: eslint-plugin-awscdk - props-name-convention
titleTemplate: ":title"
---

<script setup>
import NotRecommendedItem from '../../components/NotRecommendedItem.vue'
import Playground from '../../components/Playground.vue'
</script>

# props-name-convention

<NotRecommendedItem japanese />

Construct クラスの Props(interface) 名が `${ConstructName}Props` の形式に従うことを強制します。  
ここで、`${ConstructName}` は Construct のクラス名です。

一貫した命名パターンに従うことで、Construct とその Props(interface) の関係が明確になり、コードの保守性と理解のしやすさが向上します。

(このルールは `Construct` から派生したクラスにのみ適用されます)

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/props-name-convention": "error",
    },
  },
]);
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

<Playground link="https://eslint-online-playground.netlify.app/#eNqtVM1y0zAQfhWNh0PSSRwm3NwDDJQDB0qHHuvOVJHXRo0saSS5bSaTIzceAV6OJ2Elyz9Jk3KAS360366+/Xb1bRNnmZIlr9J7q2SSJdtcEpInTNWaCzBftONK2jzJSIj4mKOmAueP8uTj9fL1cpknsy4o+MpHbmLoTZ7c9rFaFY2ALvESnrDIQfArWCUaf2cLWzWyQBojnHWGs3C7Mw30x0Ypd8ER6LOsYTFjh5+7XCYzf7bQRmk7l7SGOXb9ANJflDqLffNaK+PIlnzAdrEyc2RHSqPqIEY8Qh3Oc9lDP71v2BpGQPpo56xYz1GEhf9tsX1MyOViQX7//E6u/P0TLh2YkjKYEk+FlEoI9WiJ++Z/m5o6okpy92rbU7lE2C4k3+H1XTr5vOkRIdiOyAAtlBQbsgrs3mYdT2SCUsBTYM8EtXZcgeA4QBZ2JEAo1zevzAR3RUM2IGaEFxnxE5HVjAR1s2espt3m2EZDrOETp8jHH/sLlIBUqGoSSkzD4ALZVrlfP04oVzfWRfmCekcli5qOhXtRrbadI2Jd01oL+P+C/aNKuNtgBTaX9i952Oc20u3nu/bv4v5gkQsoufSdYfqwzRHcVh0nOLtf1m00WGa4dvM2MAbje7gSTcXlftnwTnQIxDcStUYutBHhu+c0ufHN7nVpUwNoUjVOAIrw1NMUX/JfMFHjEq0NhUeTOjtbnGHa4FJxqBjsiR+r1sENehaCY93gnMX6uM+01gTGqMHOvD21n7fTcxykpmxNKzgwY69vm905aEjLkwIeLkB7QpJxOHDp50PxFQR1YMe+O+BOAI7M6wXcieDIGU8gxiY7BvRrvvsDwi9QjQ==" />
