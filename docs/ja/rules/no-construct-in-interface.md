---
title: eslint-cdk-plugin - no-construct-in-interface
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../../components/RecommendedItem.vue'
import Playground from '../../components/Playground.vue'
</script>

# no-construct-in-interface

<RecommendedItem japanese />

このルールは、`interface` のプロパティに、読み取り専用リソースのための interface (例: `IBucket`) を指定することを強制します。

AWS リソースを表す Construct (例: `Bucket`) が、読み取り専用リソースのための interface (例: `IBucket`) を implements している場合、interface のプロパティには、読み取り専用リソースのための interface (例: `IBucket`) を指定することが推奨されます。  
これにより、意図しないリソースの変更を防ぐことができます。

---

#### 🔧 使用方法

```ts
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/no-construct-in-interface": "error",
    },
  },
]);
```

#### ✅ 正しい例

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ 読み取り専用リソースのための interface (`IBucket` など) は使用できます
  readonly bucket: IBucket;

  // ✅ AWS リソースを表す Construct でない Construct (`DockerImageAsset` など) は使用できます
  readonly asset: DockerImageAsset;

  // ✅ 読み取り専用リソースのための interface が存在しない場合、 Construct 型 (`MetricFilter` など) は使用できます
  readonly metricFilter: MetricFilter;
}
```

#### ❌ 不正な例

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ 読み取り専用リソースのための interface が存在する場合、 Construct 型 (`Bucket` など) は使用すべきではありません
  readonly bucket: Bucket;
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqFVMFu2kAQ/ZWVTwkCu6I359K0tFIOaaPkkEMcKYs9wAZ719pZpyDEsbd+Qvtz/ZLOru21TYFKCIPnvZk3s7NvFxhMlVyIZfiKSgZxsEskY0mQqqIUOehvpRFKYhLEzEVszHC9BGNfJcHnh+m76TQJxm0wF3MbeWpC75Pg2ccKlVU5tMSvsKEkB8F7QJVXtmYNm1cyIxk9HBotUlfd6Ar8a62UmQkCWhbqtGHs6XufyGBs30VSTahbylClZiIkfQzoBU8hNEi9i6JU2rAdu/lYpWswY1Y/2Z4ttCooMf+OkzRbT6jLyP5G6u8qkYmEjaP6hOx2+6mtdKdVifX4ooj9+fWD3QPPJkrm246A7ALCZchemtovlyzlks2BVQiZ5WoiOc7cAeJWpavvU/uqyMyKG8Y1MKkMu358oAyoKk3i/BB81ZmiVPqm4Eu4Rjxbntt4zA4ZQxmPK5AkAKi6QBLg6HXLXoXvfdypZmZbdrO4BXvYX0ROwDOKih4sZn1ST9Tvn7UoflYKg41AgycV+cPBlaryzI32mCQh33gushoeN3tEava0iYA51Qv9ves2r460y/ah/hu90vUjqt/ODBZCAgkkereaDbjO2icYHKZ1/aRalGZSB/pgWu67vFoKOUzrlr50geHCkxZe5e7pNV082VEMusRQA1lKATKDzF3MMKQ79x9M4zgLMiJ0ljIaRSOidZ5CFkJwG/TCj2Wr4dYLni+v6ARKnq5pbw88zw6m9o/WqBwtCTJ4m0FpM8lUwIEZ/jtNmyHnBrBvbx3uBODIoM/gTgR7/nQC0V39IcANyO7n/i9xiBd3" />
