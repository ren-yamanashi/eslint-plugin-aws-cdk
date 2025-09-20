---
title: eslint-cdk-plugin - no-construct-in-interface
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../components/RecommendedItem.vue'
import Playground from '../components/Playground.vue'
</script>

# no-construct-in-interface

<RecommendedItem />

This rule enforces specifying interfaces for read-only resources (e.g., `IBucket`) for properties in an `interface`.

When AWS resource Constructs (e.g. `Bucket`) implements interfaces for read-only resources (e.g., `IBucket`), it is recommended to specify the read-only resource interface (e.g. `IBucket`) for interface properties.
This helps prevent unintended resource modifications.

---

#### 🔧 How to use

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

#### ✅ Correct Example

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ Read-only interfaces (e.g. `IBucket`) can be used
  readonly bucket: IBucket;
}
```

#### ❌ Incorrect Example

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ When a read-only resource interface exists, Construct types (e.g. `Bucket`) should not be used
  readonly bucket: Bucket;
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqFU8tuGjEU/RVrVgliZiq6I5uqTRddtI3SRReZSDH2hTgYe+RHCkIsu+sntD/XL+m1zXgYComEGJh7zr3nPs62cJZpNReL6slqVUyLbaMIaQqmV62QYL62Tmhlm2JKYiTEHDULcOFVU3z8NnkzmTTFuAtKMQuRu33obVPc59hKcy+hI36BNSY5Ct6C1dKHmgk284qjjAOcdUawWN0ZD/m10dpdCwQGljVsz9jh965RxTi8q5UusVvM4JkrhcKPAzOnDCpnsXexarVxZEs+vfdsCW5M0pPsyNzoFSamP2zJ+LLELuvw22J/V41qFKwjNScknzcfuko3Rrc2ja+uyd/fP8ktUF5qJTc9wZILqBYVedjXfrgkjCoyA+It8MA1SIqcZyoFT6hpJzWKSPn//CLfH0ERGhmpjMGxeoOyeoGwFtbZMckyidu0vYyswj5qLzlR2p0UI9RATlazw5GDlVivygfWjzhFuqm+S3/rJ7wzpOY1cJgLBSgQ6f0O9uCU9ZDg7DBt7IcZ0boyBQ7BuMUb6RdCDdPG7bYxMNwsaqFexmfWdHEXRjHo0lYG0DsrUBx4vMCqwuN6BbO31hwdZ6N3RqN6hLTePOgVhIdgFn4qW4KHo7+/vMINtJQt6QKOzB0Gk4zSOTLSmoLD8zW0IZNiAo5c//80QwZJHdhDH/e4M4ATg34BdyZ4YMQziGz02EYPiAMK97n7B08MsxA=" />
