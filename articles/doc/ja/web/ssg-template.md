---
id: ssg-template
title: SSG テンプレート (Next.js)
description: Skeet Web メディア & ドキュメント テンプレート with SSG on Next.js
---

![Skeet Web Media Template](/doc-images/web/web-media-template.png)

## Web メディア & ドキュメント SSG テンプレート

[GitHub - Skeet Web Template](https://github.com/elsoul/skeet-web-template)

## 心がけ

- 迅速な開発
- ハイパフォーマンス
- グローバルスケール(多言語化含む)
- メンテナンスしやすいコードベース
- SEO に強い

## 技術選定

- [x] [Next.js - SSG Framework](https://nextjs.org/)
- [x] [React - UI Framework](https://reactjs.org/)
- [x] [TypeScript - Type Check](https://www.typescriptlang.org/)
- [x] [ESLint - Linter](https://eslint.org/)
- [x] [Prettier - Formatter](https://prettier.io/)
- [x] [Recoil - State Management](https://recoiljs.org/)
- [x] [Next i18next - i18n Translation](https://github.com/isaachinman/next-i18next)
- [x] [Firebase - Hosting & Analytics](https://firebase.google.com/)
- [x] [Tailwind - CSS Framework](https://tailwindcss.com/)

## クイックスタート

```bash
# Node version (using nodenv)
$ node -v
v18.16.0

# Install dependencies
$ yarn install --frozen-lockfile

# Run dev server (localhost:4200)
$ yarn dev
```

## Firebase Hosting

Firebase Hosting にデプロイする前にログインする必要があります。

```bash
# Install Firebase tools
$ npm i -g firebase-tools

# Login to Firebase to enable `yarn deploy` from local
$ firebase login

# Get FIREBASE_DEPLOY_TOKEN to use CI/CD
$ firebase login:ci
```

## GitHub Actions (CI/CD)

GitHub 上のシークレットに下記の値を登録してください。

```
BING_API_KEY
FIREBASE_DEPLOY_TOKEN
```

ローカルデプロイ時(`yarn deploy`)も BING_API_KEY を.env に登録してください。sitemap 送信に使います。
