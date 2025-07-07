---
title: eslint-cdk-plugin - require-jsdoc
titleTemplate: ":title"
---

<script setup>
import NotRecommendedItem from '../components/NotRecommendedItem.vue'
import Playground from '../components/Playground.vue'
</script>

# require-jsdoc

<NotRecommendedItem />

This rule requires JSDoc comments for Construct's Props interface properties and Construct public properties.

Adding JSDoc comments to properties clarifies what each property represents, improving code maintainability and understandability.

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/require-jsdoc": "error",
    },
  },
]);
```

#### ✅ Correct Example

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ JSDoc comment for interface property
  /** S3 bucket to be specified for the resource */
  readonly bucket: IBucket;
}
```

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  // ✅ JSDoc comment for public property
  /** The S3 bucket created by this construct */
  public readonly bucket: IBucket;

  // ✅ This rule does not apply to non-public properties
  private readonly bucketName: string;
}
```

#### ❌ Incorrect Example

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ Must write JSDoc comment
  readonly bucket: IBucket;
}
```

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  // ❌ Must write JSDoc comment
  public readonly bucket: IBucket;
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqlVEtu2zAQvQqhVSvYUuHsnE3RuosWSBrUBbqIgkKiRg5tiWRJKolheNldj9BerifpkNTXn3SRjWxx3hvNmxm+XWA0Fbxgq2itBQ/mwS7hhCQBFZVkJajP0jDBdRLMiYvYmEnVCow9SoIPy9mb2SwJJm2wZJmN3DahiyS462KVyOsSWuI1PGGSg+AX0KKs7Tc9LKt5jmUMcNooRt3XjaqhO1ZCmAVDoGVpRRvGHp/7hAcTexYr+FEzBdO1zgWNjEa9rJJCGbIjH9/VdAOG7EmhRIVJ0kc9pflmiopi+1+jlsuEd4T32BcsgQ4o2Ep/hA1DaMLhyYEZN6CKlAK52na0GyWk9l2NY/L390/yabkQlGDrK+CGFEINiBLRoMzWwcOQLC9I5gs2gmRAtATKCga545l7IApbWSukhrElKUhzwcttQ5u3gl2dvoQ/v8hVrQ15VMzAuJpRhu/HKbDHnVpaploPlRKcNPBcD1r2vGxZZyWjR5q/oqpeN8V6DOrNtiiXaUzQJveCmyQv132Y6IT8gZpv98Bd/9vqCdbGhWnSTHyxCne9DaRSljg49ynFHlDUYdHXaQVzYjefr3yzcaFBl7geUXd9+2X2kXYp3/rXeO2XstvfHArGAUeC9H6FG7DPOiQYPU5rthI0VUyaqQ8MwXhvbsp6xfg4rbtP0gXGFwRrSevS/XY1vbq1HRmp1JECP5gccne/owiv8X8wjXEV6GfaOVMYxiHSemtq9hODXeGnsrVwOzwEN3mdXeabsbl4HwKlRO9d1ov88+71JQ5QpnSTruDAeW1fPbu1S0dLghweFiBtIZwyOLDk42HYDCXukh6abI87Azgxp2dwZ4ID5zyDGBrlEOAahAse7P8B/eFEzQ==" />
