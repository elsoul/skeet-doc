---
id: backend-quickstart
title: クイックスタート
description: Skeet フレームワーク バックエンド クイックスタート
---

## What's Skeet?

フルスタック TypeScript サーバーレスアプリケーションフレームワーク 'Skeet'。

Skeet はソフトウェア開発・運用のコストを下げるために生まれました。

サーバーレスアプリをすぐに開発スタート、そしてデプロイ。

スケーラブルな Cloud Firestore、Cloud Functions を今すぐ安全に使い始める準備ができています。

![https://storage.googleapis.com/skeet-assets/animation/skeet-cli-create.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-cli-create.gif)

## Dependency

- [TypeScript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Google SDK](https://cloud.google.com/sdk/docs)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [GitHub CLI](https://cli.github.com/)

## クラウドネットワーク構成

Google Cloud の VPC 設定やセキュリティ目的の Cloud Armor 等セキュリティに最低限必要な設定は自動で完了します。

- Firewall
- VPC Network
- Subnet Network
- VPC Connector
- Load Balancer
- Cloud Armor
- Cloud DNS

## 使い方

### Skeet CLI のインストール

```bash
$ npm i -g @skeet-framework/cli
```

### Skeet アプリの作成

```bash
$ skeet create ${appName}
```

### ローカルで起動

```bash
$ cd ${appName}
$ skeet s
```

Firebase エミュレーターが起動します。

[http://localhost:4000/](http://localhost:4000/)
