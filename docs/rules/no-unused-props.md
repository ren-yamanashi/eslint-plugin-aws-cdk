---
title: eslint-cdk-plugin - no-unused-props
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../components/RecommendedItem.vue'
import FixableItem from '../components/FixableItem.vue'
import Playground from '../components/Playground.vue'
</script>

# no-unused-props

<RecommendedItem />

This rule enforces that all properties defined in CDK Construct props interfaces are actually used within the constructor.

When developing CDK Constructs, it's common to define props interfaces with multiple properties, but developers may forget to use some of these properties in the constructor implementation. This leads to:

- **Dead code**: Unused properties in props interfaces that serve no purpose
- **Maintenance burden**: Properties that appear to be used but are actually ignored  
- **Developer confusion**: Unclear which properties are actually required vs optional
- **Runtime inefficiency**: Properties being passed but never utilized

This rule helps catch these issues early in the development process.

(This rule applies only to classes that extend `Construct`.)

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/no-unused-props": "error",
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
      versioned: props.enableVersioning
    });
  }
}
```

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
    
    // ✅ Destructuring is supported
    const { bucketName, enableVersioning } = props;
    new Bucket(this, "MyBucket", {
      bucketName,
      versioned: enableVersioning
    });
  }
}
```

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  readonly bucketName: string;
  readonly enableVersioning: boolean;
}

export class MyConstruct extends Construct {
  private props: MyConstructProps;
  
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);
    
    // ✅ this.props pattern is supported
    this.props = props;
    new Bucket(this, "MyBucket", {
      bucketName: this.props.bucketName,
      versioned: this.props.enableVersioning
    });
  }
}
```

```ts
import { Construct } from "constructs";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    
    // ✅ No props parameter means no validation
    new Bucket(this, "MyBucket");
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
      versioned: props.enableVersioning
      // unusedProp is never accessed
    });
  }
}
```

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
    
    // ❌ Properties are defined but not used
    new Bucket(this, "MyBucket", {
      bucketName: "hardcoded-name",
      versioned: true
    });
  }
}
```

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  readonly bucketName: string;
  readonly enableVersioning: boolean;
  readonly config: {
    readonly timeout: number;
  };
}

export class MyConstruct extends Construct {
  private props: MyConstructProps;
  
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);
    
    this.props = props;
    
    // ❌ Only some properties are used
    new Bucket(this, "MyBucket", {
      bucketName: this.props.bucketName
      // enableVersioning and config are never used
    });
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqVVdty2jAQ/ZWNT9CpbSbc0gsD5dAD0AFuVQ+KtE7UyJJGkptmMjly4xPg5/gSVpJjO20Cl8TWvn379HbXuyJ4bnQjl9WDN7qYFzuqCaEFN62VCtwXG6TRnhZzkiIxFphbQohHtPj4bfZmNqPF5SGo5CJG7vrQW1rcD7HWiE7BIfEzPCHJs+BX8EZ1sWaGLTotUMYE54OTPFUProPh2BkTriUCY5Z3vM/Y4++e6uIyntXalG0X2EJBaZ2x4MK2NE169qXUAVzDOFTBoxGytcYFsiM37zu+hkD2pHGmRXa28SUX6xKvWsdnj5e8oppqeEopAxH5tP2A5qFOHm5jjexhXZM/v34QB0wYrbaklyLBE+aAMKXMBkREDpBHpqTIOuYHQalkZvv9k0T+nkRqFJnq0WIU44lfmU4JsoCBN+ZLfYYcbaO61/p9JT1x2B8iDDJpEwizFoUFM60Qz0ELqZdkI8NqlHHSm5vhOdmyeKkA2wZeYU41DOnYmRw5NOVdfq0fsBqmDt0T0EgN2AZMH1vYgzPrNCH4Y9qwteC5kzaUOTAF4xDcqm6Jfh/RpuGwKXA8GKiFdSr9D5pe3cW7H93SVw5w/1p0EkSa4qrCmfwPpl/PBrfWp/27uKgvMG1cQNw3hMfgIPwUW4bHxbl/fYUdsIyv2RKefSCiMXnZDlud0mgh4PEabGTSHKfx+Mvx0s3IoFgAP/0WjLgzgBNG/wN3JjjZ4zMIdCdvb7rGCEgGxfnc/wVfdM8z" />