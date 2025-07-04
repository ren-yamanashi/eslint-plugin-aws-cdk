---
title: eslint-cdk-plugin - no-parent-name-construct-id-match
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../components/RecommendedItem.vue'
import Playground from '../components/Playground.vue'
</script>

# no-parent-name-construct-id-match

<RecommendedItem />

This rule disallows using the parent class name as the Construct ID.

It is not recommended to specify a string that matches (or includes) the parent class name for the Construct ID, as it can make the CloudFormation resource hierarchy unclear.
(This rule applies only to classes derived from `Construct` or `Stack`.)

## Options

This rule has an option with the following properties:

### `disallowContainingParentName`

When `true`, disallows using construct IDs that contain the parent class name.
When `false`, using construct IDs that contain the parent class name is allowed, but using construct IDs that **exactly match** the parent class name is disallowed.

Note 1: By default `false` is specified.  
Note 2: The `recommended` rule set specifies `false`.

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      // Default: Allows construct IDs that contain the parent class name (but disallows construct IDs that exactly match the parent class name)
      "cdk/no-parent-name-construct-id-match": "error",

      // Disallow construct IDs that contain the parent class name
      "cdk/no-parent-name-construct-id-match": [
        "error",
        { disallowContainingParentName: true },
      ],
    },
  },
]);
```

#### ✅ Correct Example

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // ✅ Can use a different name from the parent construct
    const bucket = new Bucket(this, "MyBucket");

    // ✅ When disallowContainingParentName is false (default setting), construct IDs containing the parent class name can be used
    const bucket = new Bucket(this, "MyConstructBucket");
  }
}
```

#### ❌ Incorrect Example

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // ❌ Construct ID should not exactly match the parent class name
    const bucket = new Bucket(this, "MyConstruct");

    // ❌ When disallowContainingParentName is true, Construct ID should not include the parent class name
    const bucket = new Bucket(this, "MyConstructBucket");
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqFVb1SGzEQfhXNVcD4zhnSOU0mmIICwkCRgqMQuj1bWCfdSHuAx+MyXR4hebk8SVbS/WFshwLD7rfa1advP28SdMLoUi6yZ2d0Mks2uWYsT4SpaqnAfq9RGu3yZMZCxueQ2wWgD+XJ5f35p/PzPJl0SSWffOahTX3Ok8c+V5miUdAV3sAbHbKTvANnVON7RthTowsaY4RzaKUI3dE20IetMTiXBPRVzoq2Yku/t7lOJj421SatuQWNqeYVpHRzOq0RmMoirTiKZYaOOJBVbSyyDbvoAGzLSmuqQEwbIk6+5LqHfmvECkY4/upSUaxS4mPq/3bEBOFzDW+hQijuHLteX4RPogJ04UYNA9t9M2NP6J1qmA2ICZPFjHk29OK0exzX1NBCff40dPSJ6ZT9/f2TXXDNGgeMs0KWJXgqmKciTo1LYJGfoXMs1/Da3vAEl9JN6ILX6xjIkw9dfixBUwPHlTKvNDByqWnK23D0jW8nHSu5okFOCih5o5A5QPQ3mQyt2dXc+f/a8nfjBdbC5IKu9AT+VsWRWXva9g/959eI+qs5c0vTqIJpg/Q0XKBas6CP/TMc6+tBsRuJkbRISgSnpMas37tBcSSYW9UspO5UFKFBSHVIjEWH7jKkOzCua3DCyhrTWPdecR3TD36ULCOpx/J2EJdZoK2vSIdQhN3ppzmIaFVXklO4sPNnZ9MzOnhYesX1ouELaH2kdxHmWXRgaYu7MWKgrevyH+soY80zCLwH+yIFrcTIB/xP52h30RFmLNKVVYA8K6T1L9bDvT+MPy150LgbiWPeCnlHmLjkYU28Oo/JIpxBvlGs/m8/0TmHMm9sYK0Z/K8Nb46uV6Skv1Oo6R4kBkmJj6QNEmPNxYreZ8f+vZSilXaeHcrypICXOdReAVpI2Ple+Kg/f4LiCG7s9APuAGCP6vfivkbg9DnMcfCgA8mRQx9AjL1+DOh3efsP/klrzQ==" />
