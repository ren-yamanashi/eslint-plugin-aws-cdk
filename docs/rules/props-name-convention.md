---
title: eslint-cdk-plugin - props-name-convention
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

<Playground link="https://eslint-online-playground.netlify.app/#eNqtVL1u2zAQfhVC6BAHtlykmzq0aJOhQ9MgGasAoamTSpsiCZJyYhgeu/UR2pfrk/RISjLhny6tB9vgfXf87rvjt82cZUrWvMmXVsmsyLalJKTMmGo1F2C+aMeVtGVWkBDxMUdNA84fldnNw9Xrq6symw5BwRc+8rUPvSmzxzHWqqoTMCTewgsWOQjeg1Wi83dG2KKTFdJIcNYZzsLtznQwHhul3DVHoM+yhvUZO/zelTKb+rO5NkrbmaQtzLDrNUh/Ue4s9s1brYwjW/IR28XKzJEdqY1qgxj9EerwtpQj9NOHjq0gAdJnO2PVaoYizP1/i+1jQinnc/L753dy5++/4NKBqSmDCfFUSK2EUM+WuG/+v2mpI6omT6+2I5VbhO1C8hNeP6STz5sREYJxRAZopaTYkEVg964YeCITlAJeAnsmqLVpBYLjAFnZRIBQbmxemQvcFQ3FHjElvCqIn4hspiSoWxyxmgybYzsNfQ2fOEE+/thfoATkQjUXocQkDC6Qjcr9+nFGubazrpcvqHdSsl7TVLi/qhXbOSHWA221gP8v2D+qhLsNVmBz+fiS9/uM23gnuobLYUUjNGypDoF0pZ29CeEB7DYaLDNcu1nM69e5l6WCmnbC4WNHKnmODymm90RsbgB9pEWRoAqvcWRzFtGLUKP3oDLoIpeX80ssvLcRQWXT0QZ6Zxp9iRBNjQWDvjDQiAd93hA/zsOIUUtg7gHMmjOcV+Is/jN45H30mIJEufIWHM0rbvwujnDvOOmvQVdLb0M7qVannSiaFxij9oYXy+CcH1F5HLWmbIXdH9i1H1TMHjw2pJVZBetr0F5fyTgc+PjxdH0FQR3Y1Jn3uDOAEzt1Evc+AufLwONsoTPBxFzPIFKfTgHjS9n9AUw6X/k=" />
