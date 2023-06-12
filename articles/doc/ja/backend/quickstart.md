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

![https://storage.googleapis.com/skeet-assets/animation/skeet-cli-create-latest.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-cli-create-latest.gif)

## Dependency

- [TypeScript](https://www.typescriptlang.org/) 5.0.4 以上
- [Node.js](https://nodejs.org/ja/) 18.16.0 以上
- [Yarn](https://yarnpkg.com/) 1.22.19 以上
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) 430.0.0 以上
- [Firebase CLI](https://firebase.google.com/docs/cli) 12.0.1 以上
- [GitHub CLI](https://cli.github.com/) 2.29.0 以上

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

### パッケージのインストール

```bash
$ npm i -g @skeet-framework/cli
$ npm install -g firebase-tools
```

### Skeet アプリの作成

```bash
$ skeet create <appName>
```

### ローカルで起動

```bash
$ cd <appName>
$ skeet s
```

Skeet App フロントエンドと Firebase エミュレーターが起動します。

📲 Frontend - [http://localhost:19006/](http://localhost:19006/)

💻 Firebase Emulator - [http://localhost:4000/](http://localhost:4000/)

** ⚠️ skeetApp を完全に使用するには、_アクティベート Skeet ChatApp_ ステップを完了する必要があります ⚠️ **

## 🤖 アクティベート Skeet ChatApp 🤖

### 1. Googel Cloud Project の作成

Create Google Cloud Project

- [https://console.cloud.google.com/projectcreate](https://console.cloud.google.com/projectcreate)

### 2. Firebase Project の追加

Add Firebase Project

- [https://console.firebase.google.com/](https://console.firebase.google.com/)

### 3. Firebase 認証の有効化

- Activate Firebase Authentication
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-auth.png)

- Activate Google Sign-in
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/enable-fb-auth.png)

### 4. Firebase Firestore の有効化

- Activate Firestore
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-firestore.png)

- Select Native Mode
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-env-firestore.png)

- Select Region
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-region-firestore.png)

### 5. OpenAI API Key の作成・取得

OpenAI API Key を作成・取得

[https://beta.openai.com/](https://beta.openai.com/)

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/openai-api-key.png)

### Skeet init で Skeet ChatApp をアクティベート

```bash
$ skeet init --only-dev
```

OpenAI API Key を _.env_ ファイルに追加

_./functions/openai/.env_

```bash
SKEET_APP_NAME=skeet-demo
PROJECT_ID=skeet-demo-12356
REGION=europe-west6
CHAT_GPT_KEY=your-openai-api-key
CHAT_GPT_ORG=your-openai-api-org
```

📕 [OpenAI API Document](https://platform.openai.com/docs/introduction)

これで Skeet App を使う準備ができました 🎉

```bash
$ skeet s
```
