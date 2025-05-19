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
export default [
  {
    // ... some configs
    rules: {
      "cdk/no-variable-construct-id": "error",
    },
  },
];
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
  stage: string;
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

<Playground link="https://eslint-online-playground.netlify.app/#eNqVVc1uEzEQfpXRCom2ZDeo3AJCCMqBA23VHruV6qwniRuvbdne/ijKkRuPAC/HkzC2dzebtotED00y8814fr/ZZN5VWi3Esrh1WmWzbFMqgDKrdG2ERHtmvNDKldkMoiboPLNL9EFUZl8vj98eH5fZpFNKMQ+aq1b1rsyue12teSOxMzzFB3LyRHmBTssmvJlg80ZxCmOAc96KKr7ubYO92GrtTwQBg5WzVWuxpf/bUmWTIJsqnd8xK9hcYk5pk6um8rnghXeUuqiNth428KVTwRYWVtexHq2ISvG+VD30c1OtcYBj9y6v+DqnMkzDd0cFIHyp8CFaCOXRLliF8P2xf+bcauNSfS0yrpV8BFR3wmpVo/JuBhdYacs/hNzVcgLp8yM5ptx635Vkzg39AlUYFXeDhOIjfTLaHlD7Dc52iAkIPmsfmIAJkc2exXrYDYNrDLY+guFhTDUoplP48+sHfGEKGofAQApKnMmkVXjfVu7Ar4SbUOHSzzL7lwutDXT9S5iFtnAQ04GrNT5eg17A2fwWK19Q4axAdxBToF+7ch724b8Qyc2rDTnaJtlNiCbAYpm7oH7/hMuVbiRXr30bmmGW1UgZAnP0sy8wfDsZyfhpsfac0vbNhdp3TJOjSeCxNpJ5bFs04p2yEHyYxH8/pGgEH4xF58IujuUAb0Zb91KVqBUhbiaWK583BlD4FS33aA6pd86zJe53hPqxpZ1GJynaomew3RLTDp7LZilUt5gJGnfTRMVwj737GtUd2D8adJUVxufJbn+JOS5YI2nkQihFQeyRzNtAXGFpXWuaNY48slAfzSiiHcgFcS7tG7Hn0dH0iBzv6FMytWyoEC0j93wMoXUOLfFhF0YStHad/rkdaawOu3KJ9k5UxAIDRg1/3W24SNw6g1SuguaEFVxYRRPTwwPTDj8tsfnwNZqJE+GYlPp+bz8c+BULk6g8o3bRQISAaU9bPguPDHwQFfN1IPIEyoN6j8vzmvlqlW7QziycCLRW7y5JK94Ab6MiigsR0FKdR9en5DmVpM8p2nQNSUKaxGuaDRpGw6o19efJIQ2jlI5Sd/2iWZlxvDtBEyZAVcRT+xf2+fwFD2Hv3fBm7nAjgBem/kXcpwSc3sY4Rh2NKAdHbwQxPJ9DQL/L278KoN5B" />
