# eslint-cdk-plugin から eslint-plugin-awscdk への移行

`eslint-cdk-plugin` のパッケージ名を `eslint-plugin-awscdk` に変更した。  
そこで、`eslint-cdk-plugin` を利用しているプロジェクトがコマンド一つで `eslint-plugin-awscdk` に移行できるスクリプトを提供したい。

そのため、そのスクリプトを作成する。以下にその仕様を記載する。

## 引数

- package manager の種類: `npm` or `yarn` or `pnpm` (オプショナル)
  - 引数が指定されていない場合は、interactive に選択肢を提示する

## 手順

#### 1. `eslint-cdk-plugin` をアンインストールする

- package.json を見て、`devDependencies` または `dependencies` に `eslint-cdk-plugin` が存在する場合、以下のコマンドを実行してアンインストールする
- devDependencies にある場合は `-D` オプションをつけ、 dependencies にある場合はつけないでアンインストールする

```bash
npm uninstall -D eslint-cdk-plugin
# or
yarn remove -D eslint-cdk-plugin
# or
pnpm remove -D eslint-cdk-plugin
```

#### 2. `eslint.config.mjs` を修正する

1. eslint.config.{mjs,cjs,js,ts,mts,cts} ファイルを探し、以下のように `eslint-cdk-plugin` のインポートを `eslint-plugin-awscdk` に変更する

```diff
- import cdkPlugin from "eslint-cdk-plugin";
+ import cdkPlugin from "eslint-plugin-awscdk";
```

2. `plugins` プロパティに `cdk` プロパティが存在する場合、`awscdk` に変更する

```diff
plugins: {
- cdk: cdkPlugin,
+ awscdk: cdkPlugin,
}
```

3. 書くルールのパスを `cdk/` から `awscdk/` に変更する

```diff
rules: {
- "cdk/require-passing-this": [
+ "awscdk/require-passing-this": [
    "error",
      { allowNonThisAndDisallowScope: true },
  ],
}
```

ルールの一覧は [ルール一覧](./rules.md) を参照

#### 3. ファイル内の `/*eslint-disable cdk/${rule-name}*/` コメントも同様に `awscdk` に変更

- ソースコードを検索するモジュール (`@ast-grep/cli`) を利用して、一括で変更する

```diff
- /*eslint-disable cdk/require-passing-this*/
+ /*eslint-disable awscdk/require-passing-this*/
```

## 使用方法

### 自動移行スクリプトの実行

```bash
# Package manager をオプションで指定
npx tsx scripts/migration.ts -p npm
# or
npx tsx scripts/migration.ts --package-manager yarn
# or
npx tsx scripts/migration.ts -p pnpm

# オプションなしで実行すると対話的に選択
npx tsx scripts/migration.ts
```

### オプション

- `-p, --package-manager <manager>` - 使用するパッケージマネージャーを指定 (npm, yarn, pnpm)

### 処理内容

スクリプトは以下を自動実行します:
1. `eslint-cdk-plugin` のアンインストール
2. `eslint-plugin-awscdk` のインストール
3. ESLint 設定ファイルの修正
4. ソースコード内の eslint-disable コメントの修正
