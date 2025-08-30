---
title: eslint-plugin-aws-cdk - props-name-convention
titleTemplate: ":title"
---

<script setup>
import NotRecommendedItem from '../components/NotRecommendedItem.vue'
import Playground from '../components/Playground.vue'
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
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/props-name-convention": "error",
    },
  },
]);
```

#### ✅ Correct Example

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

#### ❌ Incorrect Example

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

<Playground link="https://eslint-online-playground.netlify.app/#eNqtVM1y0zAQfhWNh0PSSRwm3NwDDJQDB0qHHuvOVJHXRo0saSS5bSaTIzceAV6OJ2Elyz9Jk3KAS360366+/Xb1bRNnmZIlr9J7q2SSJdtcEpInTNWaCzBftONK2jzJSIj4mKOmAueP8uTj9fL1cpknsy4o+MpHbmLoTZ7c9rFaFY2ALvESnrDIQfArWCUaf2cLWzWyQBojnHWGs3C7Mw30x0Ypd8ER6LOsYTFjh5+7XCYzf7bQRmk7l7SGOXb9ANJflDqLffNaK+PIlnzAdrEyc2RHSqPqIEY8Qh3Oc9lDP71v2BpGQPpo56xYz1GEhf9tsX1MyOViQX7//E6u/P0TLh2YkjKYEk+FlEoI9WiJ++Z/m5o6okpy92rbU7lE2C4k3+H1XTr5vOkRIdiOyAAtlBQbsgrs3mYdT2SCUsBTYM8EtXZcgeA4QBZ2JEAo1zevzAR3RUM2IGaEFxnxE5HVjAR1s2espt3m2EZDrOETp8jHH/sLlIBUqGoSSkzD4ALZVrlfP04oVzfWRfmCekcli5qOhXtRrbadI2Jd01oL+P+C/aNKuNtgBTaX9i952Oc20u3nu/bv4v5gkQsoufSdYfqwzRHcVh0nOLtf1m00WGa4dvM2MAbje7gSTcXlftnwTnQIxDcStUYutBHhu+c0ufHN7nVpUwNoUjVOAIrw1NMUX/JfMFHjEq0NhUeTOjtbnGHa4FJxqBjsiR+r1sENehaCY93gnMX6uM+01gTGqMHOvD21n7fTcxykpmxNKzgwY69vm905aEjLkwIeLkB7QpJxOHDp50PxFQR1YMe+O+BOAI7M6wXcieDIGU8gxiY7BvRrvvsDwi9QjQ==" />
