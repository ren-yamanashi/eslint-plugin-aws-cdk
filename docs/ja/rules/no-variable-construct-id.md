---
title: eslint-cdk-plugin - no-variable-construct-id
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../../components/RecommendedItem.vue'
import Playground from '../../components/Playground.vue'
</script>

# no-variable-construct-id

<RecommendedItem japanese />

このルールは、Construct ID に変数を使用しないことを強制するものです。

Construct ID に変数を使用することは、以下の問題を引き起こす可能性があるため適切ではありません  
(for, while, forEach, map などのループ処理は対象外です)

- 不要な重複
- パラメータ変更時のリソース再作成
- ID の一意性を重視するあまり、不要な文字列を混在させてしまう

(このルールは `Construct` から派生したクラスにのみ適用されます)

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/no-variable-construct-id": "error",
    },
  },
]);
```

#### ✅ 正しい例

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export interface MyConstructProps {
  environments: Record<string, string>;
}

class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);

    // ✅ 文字列リテラルは使用できます
    new Bucket(this, "Bucket");

    // ✅ ループ変数内では Construct ID に変数を使用できます
    for (const [key, value] of Object.entries(props.environments)) {
      new Bucket(this, `${key}Bucket`);
    }
  }
}
```

#### ❌ 不正な例

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export interface MyConstructProps {
  readonly stage: string;
}

class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);

    // ❌ Construct ID に constructor の `id` プロパティを直接指定できません
    new Bucket(this, id);

    // ❌ Construct ID に変数を使用できません (テンプレート文字列を使用)
    new Bucket(this, `${props.stage}Bucket`);
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNp1Vc1u2zAMfhXCGLCkSJyhu2XDMGzdYYetRTvsUheIIjOpGlsyRDltEOS42x5he7k9ySj5N02dQxKLHynyI/l5HzmSRq/UOn4go6N5tE80QBJJkxcqQ3tZOGU0JdEcgsXbnLBrdP4oib7cnL85P0+iSWPM1NJbbmvT2yS6a225ScsMG8fv+MRBnhmvkUxW+jsr2LLUKafRw5GzSobbnS2xPbbGuAvFQO9FVtYeB/4+JDqa+LOZNtOtsEosM5xy2RyqlG6q0tgRl67ywlgHe/jcmOAAK2vywEd9xFS8S3QL/VTKDfZw4pGmMt1MmYaZ/09MAOMTjU/BQ2mHdiUkwrdde82VNQVV/FoUqdHZDlBvlTU6R+1oDtcojU3f+9r1egLV7wcO3PMgJ9Y4r21s4rLba2UmiPpXApOPOqVereH+tk5jRzwZBQdsERNQaRN/AoVPen5SxriZEyoLrGN4x3FgwRtmM/j35xfchDiQKSZEZARSaFgilIRphdP4WNM7cveKJsxu9ZhEJ8F+1l09CgMrY3v1fb0geFQcSkNmTAHNJFAVyYNHoXy43eDuDswKLpcPKF3MPbAKaRRK5qeuM+O23BfyXbzac6BDdbbwOXtYaEuT+t/f8OMe+6y/JliodBHoRet2viBtnK+JCpRqpbiwVFnOi3vuk3YcoF/lAHvPW8BXd6yNwviG+iZgSkcqRU+AJ4pb2uUwwOuoJN9Mh3mRCcephubSeCAXZqbiMszsMUPMz4HXFSnjXYlbcer2k9frKivX3MZ65ypoWLsiGPor6uhLMDdgtyuQpFWFm1Z+x/uZ4kqUGY+ATyWOWRgq9zoRipl4k3PvU0yDwLTZDCLqAVmxnPK+sDCenc3OOHCnjJnQ65KJqMW2lVqAQlhCy1LXpFEd1H6N/dSPLdb42b1Bu1WSt7gnlv7TyP51JZtzqOiKc3Qi5vHSIu/gXkS7X27QHVPGPSqE3HDaz14dnuFKhhu9D25JlOL2AgtPjJa8TsfvlNO2+Ah+mKj/luhwA4AXhuFF3McKOHsIeQwGGjD2ZH4A0X9h9AHtiB/+A19hjTQ=" />
