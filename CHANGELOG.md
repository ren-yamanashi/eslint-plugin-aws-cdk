# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 2.2.0 (2025-03-18)

### New features/Updates to existing features

- add options to no-parent-name-construct-id-match ([#142](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/142)) ([91210a0](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/91210a014ba76c69487f90fefb799bcd11d24466))

## 2.1.0 (2025-03-18)

### New features/Updates to existing features

- update "no-parent-name-construct-id-match" rule ([#140](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/140)) ([d393661](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/d393661b3f771e2bdbee903fede72d29828de23f))

## 2.0.1 (2025-03-12)

### Bug fixes

- update languageOptions.parser ([#137](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/137)) ([aca9cbc](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/aca9cbcc6dbe9a6d5345b36c9bce2b5acc12d814))

## 2.0.0 (2025-03-11)

### Bug fixes

- allow construct IDs to use variables within forEach [#122](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/122) ([#130](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/130))

### New features/Updates to existing features

- add `construct-constructor-signature` rule [#118](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/118) ([#131](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/131))
- add allowNonThisForNonScope option to `require-passing-this` rule [#123](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/123) ([#129](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/129))
- add disallowedSuffixes option to `no-construct-stack-suffix` rule [#124](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/124) ([#128](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/128))
- support recommended and strict option ([#133](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/133))

## 1.1.1 (2025-01-24)

### Bug fixes

- remove dependencies with typescript ([#115](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/115)) ([042571f](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/042571fa21f8c7da510d8c4020e2773bc8087fc7))

## 1.1.0 (2025-01-23)

### New features/Updates to existing features

- add `props-name-convention` rule ([#105](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/105)) ([6d828c7](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/6d828c70062d3a69575bb1648e97e3178200d959))
- add `require-default-doc-optional-props` rule ([#104](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/104)) ([bdd179e](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/bdd179eb63484e3c2213c8aaaea03a58b751501c))
- add `require-jsdoc` rule ([#101](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/101)) ([72620e0](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/72620e0c8d63dc0a5d8097d5b00c4bb0efc93762))

### Documentation changes

- adapt the text of the document ([#110](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/110)) ([02b67e3](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/02b67e3bfaf8d1d1b4c20470f24d27cce0bc6599))
- adapt the text of the document ([#111](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/111)) ([b1f6b54](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/b1f6b544e30d558219a3838fd644709ef7fd1886))
- add JSDoc to `require-jsdoc` rule ([#106](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/106)) ([791d883](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/791d8831434ae88cab1bfd9c1d947d9f83649ff1))
- add strict rule ([#108](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/108)) ([52e3ebd](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/52e3ebd2974f0738a806a9c0265936b353ba65da))
- unification of item names ([#109](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/109)) ([5142747](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/51427476d33f5a5c8f4e4c08d5088e8ba7ad0e90))
- update rule documents ([#107](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/107)) ([af3219d](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/af3219d3ded6d5e3b6d9e49928c069d734feafa6))

### 1.0.5 (2025-01-18)

### Bug fixes

- rules also apply to `Stage` Class ([#96](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/96)) ([2cf120c](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/2cf120c29e328b1562769a306b2e3e88f260e473))

### 1.0.4 (2025-01-17)

### Bug fixes

- check property names during instantiation ([#94](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/94)) ([4143df2](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/4143df2b093a3de3e973afab67bb69ce80785ab9))

### 1.0.3 (2024-12-28)

### Code refactoring

- refactoring of rule codes ([#83](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/83)) ([041d59a](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/041d59aebeefda1828b73b1b180896872b080f27))

### Documentation changes

- update documents(vitepress and README) ([#84](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/84)) ([3d1cac9](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/3d1cac9ec4e6aa0afa35e19722d64f934173aa7e))

### Bug fixes

- update module name ([#85](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/85)) ([ad95cb2](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/ad95cb2467026555dcbcd34723691d2e8f0be6b3))

### Other changes

- **deps:** bump nanoid from 3.3.7 to 3.3.8 ([#87](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/87)) ([e45fb78](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/e45fb788af35ae69f9d26a8b57097533d2d7093e))
- **deps:** bump nanoid from 3.3.7 to 3.3.8 in /docs ([#81](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/81)) ([4511900](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/45119005800e3715f2dd31d1b1963ea2fea41d95))
- support commonjs ([#88](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/88)) ([d608976](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/d60897603c3f9e98bccbe347f86c6324a1cea0e9))
- support declarationMap ([#89](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/89)) ([772e597](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/772e597b99022a09c77fbabd4f57f6c185b8068c))
- update dependencies ([#86](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/86)) ([27626f6](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/27626f6823df17fe6865b724a432a15923178e2a))

### 1.0.2 (2024-12-17)

### Bug fixes

- rules that should apply only to constructs also apply to stacks ([#79](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/79)) ([78603e5](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/78603e539dd2a870f562efc84bae9b8b63b2a0f6))

### 1.0.1 (2024-12-07)

### Other changes

- Modifying files to be included in npm ([#75](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/75)) ([32e71e1](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/32e71e17dff1b75c105d5deeea777d8f9e026722))
- Modifying files to be included in npm ([#76](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/76)) ([c23505c](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/c23505c85f2e15cddb001abb6b090d0aef4d429c))

## 1.0.0 (2024-12-07)

### New features/Updates to existing features

- add rule 'no-variable-construct-id' ([#71](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/71)) ([b6bb694](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/b6bb6942afaea2ac7b4e7f0e0b1fb3c9d1e36f44))
- add rule 'require-passing-this' ([#70](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/70)) ([4dbf1ec](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/4dbf1eceefde8712458cbeb016844d42b94078ae))

### Documentation changes

- add versioningPolicy ([#73](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/73)) ([e0fc81f](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/e0fc81f4a9d9ff74c7368dfa95678c2c4941ff4e))
- fix link ([#56](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/56)) ([2d158de](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/2d158de326624e9516b3ff43ac5d473e64f79fed))
- fix typo ([#40](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/40)) ([9439ab5](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/9439ab55b70a3fd8281b7e741520274753ee8445))
- update documents ([#65](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/65)) ([0546c09](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/0546c09477df9f04f4654ba4e9408c7c19a116a0))
- update example code ([#72](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/72)) ([ad0b86b](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/ad0b86b91002ba9621cfee6248bfd2fc479398c0))
- update getting-started ([#57](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/57)) ([7ec284e](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/7ec284edbb4f1ebabc51f0916038825b06039abd))
- update installation guid ([#58](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/58)) ([e376ad7](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/e376ad79d5064a8cc668034add8ccf91e025413d))
- update README.md ([#66](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/66)) ([d09b260](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/d09b2603c2fd47624ed0015279904dfbde46d3af))
- update README.md ([#67](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/67)) ([8589ccd](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/8589ccdf1d6441319a4d99ca99118f2b9ba02263))
- update rule documents ([#55](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/55)) ([01d85b7](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/01d85b7944fd9a344069762ee78fb07784934acc))

## 0.4.0 (2024-11-30)

### New features/Updates to existing features

- Apply rules only to classes that extends Construct ([#60](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/60)) ([6c64837](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/6c6483772779c50a5949234bdacecda62df2f0ee))

### 0.3.2 (2024-11-20)

### Other changes

- rename library ([fbe753d](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/fbe753d33406d2ce443d453198e649a89ddc3227))

### 0.3.1 (2024-11-19)

### Other changes

- configuration custom domain ([#42](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/42)) ([80fba90](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/80fba90f05125b73bdef78203be68e1d88ba2323))
- setting custom domain ([#43](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/43)) ([1d97766](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/1d9776645022370cf9858b150d26ee27f46c9784))

## 0.3.0 (2024-11-18)

### Bug fixes

- `/pages/index.html` is not found ([#25](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/25)) ([3d09963](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/3d099632c560055b5ce93aa93e17614ac330a5eb))
- does not support code written in methods ([#31](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/31)) ([86c058a](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/86c058a88f678d47d9c3f078168aebd205b8a47b))
- eslint rules ([#4](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/4)) ([a50e3dd](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/a50e3dd02e7bc363b5365de6d46a7d7045aee287))
- page deployment is not successful ([#21](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/21)) ([85551e8](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/85551e8653caf8408f5aceab8bb8a42508742634))

### New features/Updates to existing features

- add rule construct props must readonly ([#34](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/34)) ([edf7b49](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/edf7b490bec5dad1104281c9a551a631ca017fc6))
- add rule public property must readonly ([#33](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/33)) ([9475f3c](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/9475f3c7271dd057668fc4b073c27f0a61d19597))

### Documentation changes

- add CONTRIBUTING.md ([#37](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/37)) ([2b53ac8](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/2b53ac8ef6f11ea11e323dbd1c155956489d289a))
- add document web site ([#20](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/20)) ([4caf926](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/4caf9264aeb90a3e9b3355d37ef5f9a3f59e7fec))
- Setting OGP ([#35](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/35)) ([3389d83](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/3389d83efddb4ea382f6ac055dc7c58c8293d7e7))
- update Documents ([#11](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/11)) ([debbf26](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/debbf26aa6e928f67803a8031cd7ac2fd76d40bd))

### 0.2.1 (2024-11-17)

- update npm homepage ([#23](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/23)) ([cbc9894](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/cbc989490152a6ceccb6158a6d6fcf21e986ca6b))

## 0.2.0 (2024-11-17)

### New features/Updates to existing features

- add rule construct id does not contain the word `construct` ([#10](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/10)) ([a0ff111](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/a0ff1112084974082efe9d9d0eacee61062b2db0))
- add rule does not specify a class for an interface property ([#12](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/12)) ([0486d69](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/0486d69f0735a855507cec07769a0520471b6c74))
- add rule ensure public variables of class do not have a class specified ([#15](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/15)) ([debbaa0](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/debbaa08033830b9cde0c5dd756c50af8b7d561c))
- enforce that child construct id does not match parent construct name ([#7](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/7)) ([c961f08](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/c961f08192f688aae33d8cbfed43a9d013eebcb6))
- support recommended rules ([#16](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/16)) ([5b8636d](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/5b8636db76d4cf56f39b4723ceb3a2521467f664))

### Documentation changes

- add document web site ([#20](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/20)) ([4caf926](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/4caf9264aeb90a3e9b3355d37ef5f9a3f59e7fec))
- update Documents ([#11](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/11)) ([debbf26](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/debbf26aa6e928f67803a8031cd7ac2fd76d40bd))

### Bug fixes

- eslint rules ([#4](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/4)) ([a50e3dd](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/a50e3dd02e7bc363b5365de6d46a7d7045aee287))
- page deployment is not successful ([#21](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/21)) ([85551e8](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/85551e8653caf8408f5aceab8bb8a42508742634))

### 0.1.1 (2024-11-16)

### Other changes

- publish npm ([#2](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/2)) ([51fe3bf](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/51fe3bf89cbd0584c50e39dfe998b23190b22a37))

### Bug fixes

- eslint rules ([#4](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/4)) ([a50e3dd](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/a50e3dd02e7bc363b5365de6d46a7d7045aee287))
