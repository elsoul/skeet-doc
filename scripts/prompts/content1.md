---
id: backend-quickstart
title: クイックスタート
description: Skeet フレームワークを使い始めるための設定について説明します。
---

## 🕺 Skeet とは？ 💃

⚡️ Do more, manage less ⚡️

アプリの開発・運用コストを下げ、もっと多くのプランを実現させましょう。

Skeet はオープンソースのフルスタックアプリ開発ソリューションです。
すぐにアプリのロジックからスタートでき、インフラに関する心配は無用です。

📱 Demo App made by Skeet: https://skeeter.dev/

![https://storage.googleapis.com/skeet-assets/animation/skeet-cli-create-latest.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-cli-create-latest.gif)

## 🧪 依存パッケージ 🧪

- [TypeScript](https://www.typescriptlang.org/) 5.0.4 以上
- [Node.js](https://nodejs.org/ja/) 18.17.1 以上
- [Yarn](https://yarnpkg.com/) 1.22.19 以上
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) 430.0.0 以上
- [Firebase CLI](https://firebase.google.com/docs/cli) 12.0.1 以上
- [GitHub CLI](https://cli.github.com/) 2.29.0 以上
- [Java](https://www.java.com/en/download/)

※ Skeet において Java を書くことはありませんが、モバイルアプリを動かすために必要です

## 📗 使い方 📗

### ① パッケージのインストール

```bash
$ npm i -g @skeet-framework/cli
$ npm install -g firebase-tools
```

### ② Skeet アプリの作成

```bash
$ skeet create <appName>
```

![Skeet Create Select Template](/doc-images/cli/skeet-create-list.png)

フロントエンドのテンプレートを選択できます。

- [Next.js (React)](https://nextjs.org/)
- [Expo (React Native)](https://expo.dev/)

※ 本チュートリアルでは Expo 版を利用していますが、Next.js 版を利用しても同じ手順で利用可能です。
