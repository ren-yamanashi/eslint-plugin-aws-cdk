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

このルールは、`interface` のプロパティに、読み取り専用リソースの為の interface (例: `IBucket`) を指定することを強制します。

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
  // ✅ 読み取り専用リソースの為の interface (`IBucket` など) は使用できます
  readonly bucket: IBucket;
}
```

#### ❌ 不正な例

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ 読み取り専用リソースの為の interface が存在する場合、 Construct 型 (`Bucket` など) は使用すべきではありません
  readonly bucket: Bucket;
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqFU8tuGjEU/RVrVgliZiq6I5uqTRddtI3SRReZSDH2hTgYe+RHCkIsu+sntD/XL+m1zXgYComEGJh7zr3nPs62cJZpNReL6slqVUyLbaMIaQqmV62QYL62Tmhlm2JKYiTEHDULcOFVU3z8NnkzmTTFuAtKMQuRu33obVPc59hKcy+hI36BNSY5Ct6C1dKHmgk284qjjAOcdUawWN0ZD/m10dpdCwQGljVsz9jh965RxTi8q5UusVvM4JkrhcKPAzOnDCpnsXexarVxZEs+vfdsCW5M0pPsyNzoFSamP2zJ+LLELuvw22J/V41qFKwjNScknzcfuko3Rrc2ja+uyd/fP8ktUF5qJTc9wZILqBYVedjXfrgkjCoyA+It8MA1SIqcZyoFT6hpJzWKSPn//CLfH0ERGhmpjMGxeoOyeoGwFtbZMckyidu0vYyswj5qLzlR2p0UI9RATlazw5GDlVivygfWjzhFuqm+S3/rJ7wzpOY1cJgLBSgQ6f0O9uCU9ZDg7DBt7IcZ0boyBQ7BuMUb6RdCDdPG7bYxMNwsaqFexmfWdHEXRjHo0lYG0DsrUBx4vMCqwuN6BbO31hwdZ6N3RqN6hLTePOgVhIdgFn4qW4KHo7+/vMINtJQt6QKOzB0Gk4zSOTLSmoLD8zW0IZNiAo5c//80QwZJHdhDH/e4M4ATg34BdyZ4YMQziGz02EYPiAMK97n7B08MsxA=" />
