---
title: eslint-cdk-plugin - props-name-convention
titleTemplate: ":title"
---

<script setup>
import NotRecommendedItem from '../components/NotRecommendedItem.vue'
</script>

# props-name-convention

<NotRecommendedItem />

Forces the Props(interface) name of the Construct class to follow the form `${ConstructName}Props`.  
Where `${ConstructName}` is the name of the Construct class.

Following a consistent naming pattern clarifies the relationship between Construct and its Props(interface), improving code maintainability and ease of understanding.

(This rule applies only to classes that extends from `Construct`.)

---

#### 🔧 How to use

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

#### ✅ Correct Examples

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

// ✅ Props(interface) name follows the format of `${ConstructName}Props`
interface MyConstructProps {
  readonly bucket?: IBucket;
}

class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);
  }
}
```

#### ❌ Incorrect Examples

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

// ❌ Props(interface) name must follow the ${ConstructName}Props format
interface Props {
  readonly bucket?: string;
}

class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);
  }
}
```
