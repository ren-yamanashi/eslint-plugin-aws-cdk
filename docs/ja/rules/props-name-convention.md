---
title: eslint-cdk-plugin - props-name-convention
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
export default [
  {
    // ... some configs
    rules: {
      "cdk/props-name-convention": "error",
    },
  },
];
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

<Playground link="https://eslint-online-playground.netlify.app/#eNqtVL1u2zAQfhVC6BAHtlykmzq0aJOhQ9MgGasAoamTSpsiCZJyYhgeu/UR2pfrk/RISjLhny6tB9vgfXf87rvjt82cZUrWvMmXVsmsyLalJKTMmGo1F2C+aMeVtGVWkBDxMUdNA84fldnNw9Xrq6symw5BwRc+8rUPvSmzxzHWqqoTMCTewgsWOQjeg1Wi83dG2KKTFdJIcNYZzsLtznQwHhul3DVHoM+yhvUZO/zelTKb+rO5NkrbmaQtzLDrNUh/Ue4s9s1brYwjW/IR28XKzJEdqY1qgxj9EerwtpQj9NOHjq0gAdJnO2PVaoYizP1/i+1jQinnc/L753dy5++/4NKBqSmDCfFUSK2EUM+WuG/+v2mpI6omT6+2I5VbhO1C8hNeP6STz5sREYJxRAZopaTYkEVg964YeCITlAJeAnsmqLVpBYLjAFnZRIBQbmxemQvcFQ3FHjElvCqIn4hspiSoWxyxmgybYzsNfQ2fOEE+/thfoATkQjUXocQkDC6Qjcr9+nFGubazrpcvqHdSsl7TVLi/qhXbOSHWA221gP8v2D+qhLsNVmBz+fiS9/uM23gnuobLYUUjNGypDoF0pZ29CeEB7DYaLDNcu1nM69e5l6WCmnbC4WNHKnmODymm90RsbgB9pEWRoAqvcWRzFtGLUKP3oDLoIpeX80ssvLcRQWXT0QZ6Zxp9iRBNjQWDvjDQiAd93hA/zsOIUUtg7gHMmjOcV+Is/jN45H30mIJEufIWHM0rbvwujnDvOOmvQVdLb0M7qVannSiaFxij9oYXy+CcH1F5HLWmbIXdH9i1H1TMHjw2pJVZBetr0F5fyTgc+PjxdH0FQR3Y1Jn3uDOAEzt1Evc+AufLwONsoTPBxFzPIFKfTgHjS9n9AUw6X/k=" />
