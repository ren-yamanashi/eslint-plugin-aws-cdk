---
title: eslint-plugin-awscdk - no-unused-props
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../components/RecommendedItem.vue'
import Playground from '../components/Playground.vue'
</script>

# no-unused-props

<RecommendedItem />

This rule enforces that all properties defined in CDK Construct props interface are actually used within the constructor.

When developing CDK Constructs, it's common to define props interface with multiple properties, but developers may forget to use some of these properties in the constructor implementation. This leads to dead code.

(This rule applies only to classes that extend `Construct`.)

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "awscdk/no-unused-props": "error",
    },
  },
]);
```

#### ✅ Correct Example

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  readonly bucketName: string;
  readonly enableVersioning: boolean;
}

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);

    // ✅ All props properties are used
    new Bucket(this, "MyBucket", {
      bucketName: props.bucketName,
      versioned: props.enableVersioning,
    });
  }
}
```

#### ❌ Incorrect Example

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  readonly bucketName: string;
  readonly enableVersioning: boolean;
  readonly unusedProp: string; // ❌ This property is never used
}

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);

    new Bucket(this, "MyBucket", {
      bucketName: props.bucketName,
      versioned: props.enableVersioning,
    });
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNrFVc1uEzEQfhVrT22VH1RuqZD4aQ8cWipAXLoVcryT4MZrW7a3TRTlyI1HgJfjSRj/7MZJmrYSoOaw2Xi+Gc9832RmWTjLlJzw6eDGKlmMimUpCSkLpmrNBZgP2nElbVmMSLB4m6NmCs4flcXZp+MXx8dl0WuNgo+95SqZXpbFdWerVdUIaB0vYI5BtowfwSrR+DsjbNzICtPIcNYZzsLtzjTQHRul3ClHoPeyhiWPFT5XpSx6/mwoVb+RjYWqr43SduAsVsxrrYwjS/IOC8WYzJEVmRhVBxrSETJwUsoO+rZhM8hw9M72WTXrY/VD/26xbsSXcjgkrx7+BMzvn9/xemMALz+b01ojTU/y5dKBmVAG5HzR5X/pi4t6GaCVkmJBxiHjC1rDiHgK5RTzy+wg6VjAFzAWuUfriIyVEkAlwpDAUsI81M4EtTa/jKCMICub0Rdu7qhT5gB7TOO9HaJHeNWm0SNBi9FOAYdtx9lGQ4rhHQ8Dsd6QiHsjRIwRnmAcB0uoAeKVjkgJd0mzA/eN2x5Kdr6IB9go7UVkg6XYIuuT1GqE3EaSAEuImG3uEnLlM8WvROBTW+HXD/Jesr9rhq//sRsyWPwz+Qu6MEEULOEz0tzqsSD4LgF5S5LsNlSe8D/rqB0WHm+p524UHFRgBQo56MbyekRFSztzXsefw5ut2VTBhEvAwtF9PaESOEbNHZzdDOsWGiwzXLt+NORgnHGXoplyuRk2zD4dDGnuJXExF9qI8N3ldHDli92o0g6w2VVdo+pQBVIGAxzOj2CSGBPcUyg2bpyjo+ERuq1XTmokNHaJ3xethRtcQAjuRMb5X822l0bcMGCMWm8lv2Xi8/rwBCXUlM3oFLZ2qmc2ereLMLiVRQW3p6B9KpLh7Npctrty+AiCOrD5+lzj9gDuUeoB3B5jtuf2IPKNmQO6Bl/9AYsX3dk=" />
