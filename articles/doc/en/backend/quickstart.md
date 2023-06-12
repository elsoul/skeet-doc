---
id: backend-quickstart
title: Quick Start
description: Skeet Framework Backend Quick Start
---

## What's Skeet?

⚡️ Reduce App Development and Maintenance Costs ⚡️

Skeet is a full-stack TypeScript serverless application framework.

Skeet was born to reduce the cost of software development and operation.

Start developing and deploying serverless apps quickly.

Get ready to use scalable Cloud Firestore and Cloud Functions securely right away.

![https://storage.googleapis.com/skeet-assets/animation/skeet-chat-latest.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-chat-latest.gif)

## Dependency

- [TypeScript](https://www.typescriptlang.org/) ^5.0.0
- [Node.js](https://nodejs.org/ja/) ^18.16.0
- [Yarn](https://yarnpkg.com/) ^1.22.19
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) ^430.0.0
- [Firebase CLI](https://firebase.google.com/docs/cli) ^12.0.0
- [GitHub CLI](https://cli.github.com/) ^2.29.0

## Usage

### Install Skeet CLI and Firebase CLI

```bash
$ npm i -g @skeet-framework/cli
$ npm install -g firebase-tools
```

### Create Skeet App

```bash
$ skeet create <appName>
```

### Run local

```bash
$ cd <appName>
$ skeet s
```

Now you have both frontend and backend running locally ⭐️

📲 Frontend - [http://localhost:19006/](http://localhost:19006/)

💻 Firebase Emulator - [http://localhost:4000/](http://localhost:4000/)

**⚠️ You need to finish _Activate Skeet ChatApp_ step to fully use default skeetApp ⚠️**

## 🤖 Activate Skeet ChatApp 🤖

### 1. Create Googel Cloud Project

Create Google Cloud Project

- [https://console.cloud.google.com/projectcreate](https://console.cloud.google.com/projectcreate)

### 2. Add Firebase Project

Add Firebase Project

- [https://console.firebase.google.com/](https://console.firebase.google.com/)

### 3. Activate Firebase Authentication

- Activate Firebase Authentication
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-auth.png)

- Activate Google Sign-in
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/enable-fb-auth.png)

### 4. Activate Firebase Firestore

- Activate Firestore
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-firestore.png)

- Select Native Mode
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-env-firestore.png)

- Select Region
  ![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/select-region-firestore.png)

### 5. Skeet init to activate Skeet ChatApp

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

### 6. Create OpenAI API Key(https://beta.openai.com/)

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

```bash
$ skeet s
```
