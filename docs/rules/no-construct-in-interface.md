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

This rule disallows specifying CDK Construct types (e.g. `Bucket`) for properties in an `interface`.

Using Construct types in interface properties creates tight coupling between the interface and the Construct.
Furthermore, since Constructs are mutable by nature, specifying a Construct type for an interface property can lead to unexpected behavior.
Therefore, such code is not recommended.

Instead, it is recommended to specify an interface for read-only resources (e.g. `IBucket`).

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
  // ❌ Construct types (e.g. `Bucket`) should not be used for properties
  readonly bucket: Bucket;
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNp1VE2P2jAQ/SujnFoESUVv9FK1u4ce2q7YY7PSGmeSGhw7sh26COXYW39C++f6S3Zs5wPYBSFAfu/NjF/ecEyc5VqVokq3VqtklRxzBZAnXNeNkGi+N05oZfNkBQHxmGOmQueP8uT2fvluucyT+QBKsfHIjx56nycPI1bropU4CL/hExW5ANdotWx9z0jbtKqgMU541hnBQ3dnWhyPjdbuRhDRq6zhvaKjzy5XydyfZUov6LZUoeVuIRS9HZqScUydpbuLutHGwRG+fGr5Dt0c4jd0UBpdU2H2yy54sVvQLTP/29L9PuQqV/gUpGNB+Hr4PHS6M7qx0b4sg/9/f8MaWbHQSh4mgYU3mFYpPPa9H98CZwo2CK3FwmsNiYJmz6QoIms1jBqGiPX//YGxNbhDM5UeK9ufupUFKO2GBlBqAw0NisYJtGf9hDrrODbsyFW0kq6QjhmaXCSb7mRbCTV4F6nBviYAwbqe7extgAdymJsb0bhF1J37XGDJWukoZjRomtLji/J+EJsapATXqAosQg7Gaa4y+niXlHob8jubZTMqPAVYMlW1rMJ+J8aNAGiYsWgokcMY8aDXDfhLHSFGb5G7ezR7wfEs0/41bOc6pnsF0a60RsfSQhjF6onusz59U+ofyDJ6Rg3jOxr7YsO9w3FbhrUMsjwpcH+DjTdGcR+Fs9V/+Vh8Bckc2tNlnnhXCK+E4VXex0jMtmGOq4WugCfreoUx/h1c1O8d7JLuGdZeuC0=" />
