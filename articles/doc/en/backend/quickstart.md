---
id: backend-quickstart
title: Quickstart
description: Describes the setup for getting started with the Skeet framework.
---

## 💃 What's Skeet? 🕺

⚡️ Reduce App Development and Maintenance Costs ⚡️

Skeet is an Open-Source Full-stack Serverless Application Framework.

Skeet was born to reduce the cost of software development and operation.

Start developing and deploying serverless apps quickly.

Get ready to use scalable Cloud Firestore and Cloud Functions securely right away.

![https://storage.googleapis.com/skeet-assets/animation/skeet-chat-latest.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-chat-latest.gif)

## 🧪 Dependency 🧪

- [TypeScript](https://www.typescriptlang.org/) ^5.0.0
- [Node.js](https://nodejs.org/ja/) ^18.16.0
- [Yarn](https://yarnpkg.com/) ^1.22.19
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) ^430.0.0
- [Firebase CLI](https://firebase.google.com/docs/cli) ^12.0.0
- [GitHub CLI](https://cli.github.com/) ^2.29.0

## 📗 Usage 📗

### ① Install Skeet CLI and Firebase CLI

```bash
$ npm i -g @skeet-framework/cli
$ npm install -g firebase-tools
```

### ② Create Skeet App

```bash
$ skeet create <appName>
```

### ③ Run Skeet App

```bash
$ cd <appName>
$ skeet s
```

Now you have both frontend and backend running locally ⭐️

📲 Frontend - [http://localhost:19006/](http://localhost:19006/)

💻 Firebase Emulator - [http://localhost:4000/](http://localhost:4000/)

**⚠️ You need to finish _Activate Skeet ChatApp_ step to fully use default Skeet App ⚠️**

## 🤖 Activate Skeet ChatApp 🤖

### ① Create Googel Cloud Project

Create Google Cloud Project

- [https://console.cloud.google.com/projectcreate](https://console.cloud.google.com/projectcreate)

### ② Add Firebase Project

Add Firebase Project

- [https://console.firebase.google.com/](https://console.firebase.google.com/)

### ③ Activate Firebase Authentication

- Activate Firebase Authentication
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-auth.png)

- Activate Google Sign-in
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/enable-fb-auth.png)

### ④ Activate Firebase Firestore

- Activate Firestore
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-firestore.png)

- Select Native Mode
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-env-firestore.png)

- Select Region
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-region-firestore.png)

### ⑤Skeet init to setup project

Run _skeet init_ command and select your GCP Project ID and Regions to setup.

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

### ⑥ Create OpenAI API Key

Create OpenAI API Key

- [https://beta.openai.com/](https://beta.openai.com/)

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/openai-api-key.png)

Add your OpenAI API Key and Org to _.env_ file

_./functions/openai/.env_

```bash
SKEET_APP_NAME=skeet-demo
PROJECT_ID=skeet-demo-12356
REGION=europe-west6
CHAT_GPT_KEY=your-openai-api-key
CHAT_GPT_ORG=your-openai-api-org
```

📕 [OpenAI API Document](https://platform.openai.com/docs/introduction)

Now you are ready to use Skeet ChatApp 🎉

## 📱 User Registration and Authentication 📱

```bash
$ skeet s
```

Run Skeet App locally and access to

[http://localhost:19006/register](http://localhost:19006/register)

Let's create a new user account with your email address and password.

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/user-register.png)

After registration, you will see the console log like below.

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/email-validation.png)

Click the link in the console log to verify your email address.

```bash
To verify the email address epics.dev@gmail.com, follow this link: <Link>
```

Successfully verified your email address.

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/email-validation-clicked.png)

## ✉️ Create OpenAI Chat Room ✉️

After login, access this page to create a chat room.

[http://localhost:19006/rooms](http://localhost:19006/rooms)

Let's create a chat room with the following settings.

OpenAI Chat Room Settings

| item             | description                                   | type                |
| ---------------- | --------------------------------------------- | ------------------- |
| Model            | OpenAI API のモデルを選択します。             | gpt3.5-turbo / gpt4 |
| Max Tokens       | OpenAI API の Max Tokens を設定します。       | number              |
| Temperature      | OpenAI API の Temperature を設定します。      | number              |
| System Charactor | OpenAI API の System Charactor を設定します。 | string              |

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-chatroom.png)

Now you are all set 🎉

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/skeet-chat-hello.png)
