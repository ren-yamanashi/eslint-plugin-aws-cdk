---
title: eslint-cdk-plugin - no-variable-construct-id
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../components/RecommendedItem.vue'
import Playground from '../components/Playground.vue'
</script>

# no-variable-construct-id

<RecommendedItem />

This rule enforces that variables are not used in Construct IDs.

Using variables for Construct IDs is not appropriate because it may cause the following problems.
(This rule does not apply to loop processing such as for, while, forEach, map, etc.)

- Unnecessary duplication
- Resource recreation when parameters change
- Overemphasis on ID uniqueness can lead to mixing in unnecessary strings, making IDs complex and hard to read

(This rule applies only to classes that extends from `Construct`.)

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/no-variable-construct-id": "error",
    },
  },
]);
```

#### ✅ Correct Example

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export interface MyConstructProps {
  environments: Record<string, string>;
}

class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);

    // ✅ String literals can be used
    new Bucket(this, "Bucket");

    // ✅ Variables can be used for Construct IDs within loop variables
    for (const [key, value] of Object.entries(props.environments)) {
      new Bucket(this, `${key}Bucket`);
    }
  }
}
```

#### ❌ Incorrect Example

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export interface MyConstructProps {
  readonly stage: string;
}

class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);

    // ❌ The constructor's `id` property cannot be specified directly for the Construct ID
    new Bucket(this, id);

    // ❌ Variables (from props, outside of loops) cannot be used for Construct IDs (using template strings)
    new Bucket(this, `${props.stage}Bucket`);
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqFVc1u00AQfpWRhURS5QeVW0AIQTlwgFYt4lJXirM7Trdxdlc767ZRlCM3HgFejidhdv0TO23gEsc733w7882Pt4knYXSulpM7MjqZJdtUA6SJMGurCnTn1iujKU1mEC3B5jO3RB+O0uTT1emr09M0GTXGQi2C5bo2vU6Tm9a2NrIssHH8io9McmC8RDJFGe6sYItSSw6jgyPvlIi3e1die+yM8WeKgcGLnKg9dvy7S3UyCmdTbcb3mVPZosAxp81UpfBjJSeeOHW1tsZ52MLHxgQ7yJ1ZRz3qI5biTapb6IdSrLCDyx5oLORqzDJMw39iARifanyMHkp7dHkmEL5s2msunLFU6eswk0YXG0B9r5zRa9SeZnCJwjj5NuSulyOonu+YuONBPlvirLaxidNurxVFRtS9Elh81JI6ucb72zyNG3BnWCZsESNQsuEfgQ1Bz56kMWz6hEqLNUdwHEYVgmE6hT+/fsBV5IFCsSBZQSAyDQuEklBWOI0PtbwDf6toxOpWr2nyhOx7XdUeDeTGdfL7fEbwoJhKQ2GMhaYTqGIK4EFMH65XuLkBk8P54g6Fn3ANnEIaxJT5bV+ZYZvuM/HOX2yZaFedzUPMARbL0oT++yd8u8Wu6i8J5krOo7zo/CYkpI0POZFFoXLFiUnlOC6ueQjaM0E3yyPqHZaAr96rNojtG/MbgSk9KYlBgCAUl3QfwxFdByWFYnpc2yLzHGosLg2PxMLKVFrGnu0rxPrseFyRCp6VSbuc9vNZWZqBe1+9Tu8OBlNirjRylOy+H88aXLF2HTz1af3GIgmnrB9Xhi6YB/yiKJfcSD3aOPg2GvpDz7FkZRGfbUyD65BsL0uacFXNmhtLoozbazLhzfQfTN1/OW9rHkfeuycn0xN22y/eetTZ2Ab+HFsFDwvzZviGK2AzseLqHHwYgjDVkm22eXRLE4n3Z2gDkxY8LP0vxlM1A0NoFep+A/a4I4BnhP4H7oixs6OPILrbvgto+3P3F1yPfcg=" />
