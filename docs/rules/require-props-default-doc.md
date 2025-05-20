---
title: eslint-cdk-plugin - require-props-default-doc
titleTemplate: ":title"
---

<script setup>
import NotRecommendedItem from '../components/NotRecommendedItem.vue'
import Playground from '../components/Playground.vue'
</script>

# require-props-default-doc

<NotRecommendedItem />

This rule requires a documentation comment including a `@default` JSDoc tag for optional properties defined in a Construct's Props interface, to indicate their default behavior.  
The names of such Props interfaces typically follow a format like `XxxxProps` (e.g., `MyConstructProps`, `MyStackProps`).

Note: This rule does not apply to regular class properties or properties within general interfaces not intended as Construct Props.

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/require-props-default-doc": "error",
    },
  },
];
```

#### ✅ Correct Example

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ JSDoc comment including a `@default` tag for the optional property.
  /**
   * @default - No S3 bucket is associated.
   */
  readonly bucket?: IBucket;
}

// ✅ This rule does not apply to general interfaces that are not Construct Props.
interface Config {
  readonly bucket?: IBucket;
}
```

#### ❌ Incorrect Example

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ No JSDoc comment for the optional property.
  readonly bucket?: IBucket;
}
```

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ JSDoc comment exists, but the `@default` tag is missing.
  /** Some description without default value. */
  readonly bucket?: IBucket;
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNp9VMtS2zAU/ZU7Xnqw3YFduijTwqKdKWVId5gBId0YEVtyJRnIMFl2109of65fwpVkOw+SZJFkdM+5Oveh85o4y7WaySp/tFolk+S1VABlwnXTyhrNj9ZJrWyZTCBEfMwxU6HzR2VyPj3+cHxcJkdDsJb3PnLdh07K5GaMNVp0NQ7EC3yhJFvBK7S67vydEXbfKUEy1nDWGcnD7c50OB4brd2ZJKBnWcN7xpK+l6VKjvxZYfBXJw1mrdGtzQTOWFe7TGieO0u1y6bVxsErfP3c8Tk6WMLM6IYSsmebcTHPqLrC/7dU18dSlQpfAkUqh2bGOML3xRfqF0nj7tLfEttWFPD/72/4Nj3THKi3DSpP4nUnpKqAwd1pr+YOHKtgpg24BwQd2s9q8IrRuEUesqVpKDuFgQUZXGiYnsB9FC4tMGs1l8yhCBxIC/9jkAmt6kUP/DQZag3VRKH//vhkm1oPCxqz3h5Ou5kTX6R19oikuJB7qwdUQyOtpf4MRcNUNwgCLTcy6IBn6R400Yc2PLG6w3y71ttdsmgrStXP5ecDXWZo/UBotKC0A9a2xHQaKlRoqOBxxJbEMgIYDMBx3BDmTVrf7QRB6IXFTTg0gCWtKdqaiPn4KFdrSft3WXeVVMNSRmjYyzYEwk72aGfPQ3gAu0Xb9y2LvM0FHhp47TXmOb2HSO+F2NxgHJtAER7WqGYvoveLGdmIDYaQpkVKiVeOUDNVdazC3mRGiwFombFo6IkPMuJBzxvi73kUMfoRuZuieZIcN0zCfwa7u4p2MYHYrrxBx3IhjWLNCu7NY/3Xb8j6bWSTYr7fVKIXoTF65V8xFe3eDXWfxt0yPqcObLmvH1ZkD5YZaGUi8OkMW99jxSVu2fL7CfsMNVmAXTfaFW4PYMde7cSdRmDxGHTsTbQnuGapexA0qfiytvL3HVwmyzcE20Z/" />
