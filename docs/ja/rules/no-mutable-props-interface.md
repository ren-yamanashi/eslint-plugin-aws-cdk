---
title: eslint-cdk-plugin - no-mutable-props-interface
titleTemplate: ":title"
---

# no-mutable-props-interface

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
    ✅ <a href="/ja/rules/#recommended-rules">recommended</a>
  を使用した場合、このルールが有効になります。
</div>
<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  🔧 このルールによってエラーになるコードは
  <a href="https://eslint.org/docs/latest/use/command-line-interface#--fix">
    ESLint の --fix コマンド
  </a>
  で自動修正できます。
</div>

このルールは、コンストラクトまたはスタックの、`Props`(インターフェース)のパブリック変数を変更可能にすることを禁止します。  
(`readonly`でない Props 変数の定義を禁止します)

Props で変更可能なパブリック変数を指定すると、意図しない副作用を引き起こす可能性があるため推奨されません。

#### ✅ 正しい例

```ts
interface MyConstructProps {
  readonly bucket: IBucket;
}
```

#### ❌ 誤った例

```ts
interface MyConstructProps {
  bucket: IBucket;
}
```
