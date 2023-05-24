---
id: react-native
title: React Native (Expo)
description: Skeet フレームワークのアプリテンプレート。React Native (Expo)を使用。
---

![Skeet App Template](https://storage.googleapis.com/skeet-assets/imgs/samples/skeet-app-template.png)

## Skeet App テンプレート

React Native (Expo) App Environment for Skeet Framework

[GitHub - Skeet App Template](https://github.com/elsoul/skeet-app-template)

## 心がけ

- 迅速な開発
- ハイパフォーマンス
- グローバルスケール(多言語化含む)
- メンテナンスしやすいコードベース
- マルチプラットフォーム(iOS,Android,PWA)

## Summary

- [x] [React Native](https://reactnative.dev/)
- [x] [Expo](https://docs.expo.dev/)
- [x] [EAS Build](https://docs.expo.dev/build/introduction/)
- [x] [TypeScript - Type Check](https://www.typescriptlang.org/)
- [x] [ESLint - Linter](https://eslint.org/)
- [x] [Prettier - Formatter](https://prettier.io/)
- [x] [Recoil - State Management](https://recoiljs.org/)
- [x] [React i18n - Localization](https://react.i18next.com/)
- [x] [twrnc - TailwindCSS](https://github.com/jaredh159/tailwind-react-native-classnames)
- [x] [React Navigation - Routing](https://reactnavigation.org/)
- [x] [Firebase](https://firebase.google.com/)

## クイックスタート

```bash
# Node version (using nodenv)
$ node -v
v18.16.0

# Install dependencies
$ yarn install --frozen-lockfile

# Run dev server
$ yarn dev
```

## Firebase Hosting

You need to login to Firebase to use Firebase Hosting to publish your media website.

```bash
# Install Firebase tools
$ npm i -g firebase-tools

# Login to Firebase to enable `yarn deploy` from local
$ firebase login

# Get FIREBASE_DEPLOY_TOKEN to use CI/CD
$ firebase login:ci

```

## GitHub Actions (CI/CD)

Needs to set Secrets on GitHub to work with GitHub Actions.

```
FIREBASE_DEPLOY_TOKEN
```
