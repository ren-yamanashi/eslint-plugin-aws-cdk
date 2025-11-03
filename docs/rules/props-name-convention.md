---
title: eslint-plugin-awscdk - props-name-convention
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
      "awscdk/props-name-convention": "error",
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

<Playground link="https://eslint-online-playground.netlify.app/#eNqtVEtu2zAQvQohdGEHllS4O2XRok0XXTQNmmUUILI0UhlTJEFSSQzDy+56hPZyPUmHH33s2Omi3fjDeTN882b4tpHRpeA1bZJ7LXiURducE5JHpWglZaC+SEMF13mUERexMVOoBow9yqOP18vXy2UeLfogoysbuQmhN3l0O8RaUXUM+sRLeMIiB8GvoAXr7J0etup4hTQmOG0ULd3tRnUwHCshzAVFoM3SqgwZO/zc5Txa2LNUKiF1zIsWYuz6Abi9KDEa+6atFMqQLfmA7WLl0pAdqZVonRjhCHU4z/kA/fS+K9cwARaPOi6rdYwipPa3xvYxIedpSn7//E6u7P0zyg2ouihhTiwVUgvGxKMm5pv9rdrCEFGTu1fbgcolwnYu+Q6v79PJ582AcEE/IgVFJTjbkJVj9zbreSITlAKeHPuSFVpPKxAcB/BKTwRw5YbmhZrhrkjIRsSC0CojdiK8WRCnbvaM1bzfHN1JCDVs4hz52GN7gWCQMNHMXIm5G5wj65X79eOEcm2nTZDPqXdUsqDpVLgX1fLtHBHrumglg/8v2D+qhLsNmmFzyfCSx332kX4/3/m/6f3BIldQU247w/RxmwPYV50mGL1f1mwk6FJRaWIfmILxPVyxrqF8v2ws3WGMzwQR4ZkEuZFO0TH3PdCa3dh+9xrViQL0qRaHAJV77UmCj/kvmCBzje6G2qNPnZ2lZ5g2GlWYKwYH7seq9XCFtoXgUNd6ke/puNt4gwKlxGhq1qT85+38HMcpi3JdNHBgyVZln937qEvLowoeLkBaTrykcODVz0djK7DCgJ6674g7ATg+tRegJ4ITizyBmLrtFDDs++4P7TZUbg==" />
