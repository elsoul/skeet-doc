---
id: backend-quickstart
title: クイックスタート
description: Skeet フレームワークを使い始めるための設定について説明します。
---

## 🕺 Skeet とは？ 💃

オープンソースのフルスタックサーバーレスアプリケーションフレームワーク 'Skeet'。

Skeet はソフトウェア開発・運用のコストを下げるために生まれました。

サーバーレスアプリをすぐに開発スタート、そしてデプロイ。

スケーラブルな Cloud Firestore、Cloud Functions を今すぐ安全に使い始める準備ができています。

![https://storage.googleapis.com/skeet-assets/animation/skeet-cli-create-latest.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-cli-create-latest.gif)

## 🧪 依存パッケージ 🧪

- [TypeScript](https://www.typescriptlang.org/) 5.0.4 以上
- [Node.js](https://nodejs.org/ja/) 18.16.0 以上
- [Yarn](https://yarnpkg.com/) 1.22.19 以上
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) 430.0.0 以上
- [Firebase CLI](https://firebase.google.com/docs/cli) 12.0.1 以上
- [GitHub CLI](https://cli.github.com/) 2.29.0 以上

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

### ③ ローカルで起動

```bash
$ cd <appName>
$ skeet s
```

Skeet App フロントエンドと Firebase エミュレーターが起動します。

📲 Frontend - [http://localhost:19006/](http://localhost:19006/)

💻 Firebase Emulator - [http://localhost:4000/](http://localhost:4000/)

** ⚠️ Skeet App を完全に使用するには、_アクティベート Skeet ChatApp_ ステップを完了する必要があります ⚠️ **

## 🤖 アクティベート Skeet ChatApp 🤖

### ① Googel Cloud Project の作成

Create Google Cloud Project

- [https://console.cloud.google.com/projectcreate](https://console.cloud.google.com/projectcreate)

### ② Firebase Project の追加

Add Firebase Project

- [https://console.firebase.google.com/](https://console.firebase.google.com/)

### ③ Firebase 認証の有効化

- Activate Firebase Authentication
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-auth.png)

- Activate Google Sign-in
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/enable-fb-auth.png)

### ④ Firebase Firestore の有効化

- Activate Firestore
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-firestore.png)

- Select Native Mode
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-env-firestore.png)

- Select Region
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-region-firestore.png)

### ⑤ Skeet init コマンドの実行

_skeet init_ コマンドに _--only-dev_ オプションを付けて実行し、
プロジェクト ID と リージョンを選択してください。

```bash
$ skeet init --only-dev
? What's your GCP Project ID skeet-demo
? Select Regions to deploy
  europe-west1
  europe-west2
  europe-west3
❯ europe-west6
  northamerica-northeast1
  southamerica-east1
  us-central1
```

### ⑥ OpenAI API Key の作成・取得

OpenAI API Key を作成・取得

[https://beta.openai.com/](https://beta.openai.com/)

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/openai-api-key.png)

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

## 📱 ユーザー登録・ログイン認証 📱

```bash
$ skeet s
```

ローカルで skeetApp を起動している状態で、

[http://localhost:19006/register](http://localhost:19006/register)

にアクセスしてください。

メールアドレスとパスワードを入力してユーザー登録を行います。

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/user-register.png)

作成が成功すると、コンソールログに以下のようなメッセージが表示されます。

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/email-validation.png)

リンクをクリックし、メールアドレスの認証を行ってください。

```bash
To verify the email address epics.dev@gmail.com, follow this link: <Link>
```

成功すると、リンク先のページに以下のようなメッセージが表示されます。

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/email-validation-clicked.png)

## ✉️ OpenAI チャットルームの作成 ✉️

ログイン後、[http://localhost:19006/rooms](http://localhost:19006/rooms) にアクセスしてください。

そして、チャットルームを作成します。

以下の設定を選択して、チャットルームを作成してください。

チャットルームの設定

| 項目名           | 説明                                          | 型                  |
| ---------------- | --------------------------------------------- | ------------------- |
| Model            | OpenAI API のモデルを選択します。             | gpt3.5-turbo / gpt4 |
| Max Tokens       | OpenAI API の Max Tokens を設定します。       | number              |
| Temperature      | OpenAI API の Temperature を設定します。      | number              |
| System Charactor | OpenAI API の System Charactor を設定します。 | string              |

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-chatroom.png)

これで、チャットルームが使えるようになりました 🎉

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/skeet-chat-stream.gif)
