---
id: backend-quickstart
title: Quickstart - GraphQL
description: Describes the setup for getting started with the Skeet framework.
---

## 🕺 What is Skeet? 💃

⚡️ Do more, manage less ⚡️

Let's lower the development and operation cost of the application and realize more plans.

Skeet is an open source full-stack app development solution.
You can start right away with your app logic and don't worry about infrastructure.

Skeet Framework can be assembled with a combination of SQL and NoSQL.

Here, we will create an application using Cloud SQL and GraphQL.

📱 Demo App made by Skeet: https://skeeter.dev/

![https://storage.googleapis.com/skeet-assets/animation/skeet-db-studio.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-db-studio.gif)

## 🧪 Dependency 🧪

- [TypeScript](https://www.typescriptlang.org/) ^5.0.0
- [Node.js](https://nodejs.org/ja/) ^18.16.0
- [Yarn](https://yarnpkg.com/) ^1.22.19
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) ^430.0.0
- [Firebase CLI](https://firebase.google.com/docs/cli) ^12.0.0
- [GitHub CLI](https://cli.github.com/) ^2.29.0
- [Java](https://www.java.com/en/download/)

※ We don't write Java but we need it for mobile apps working

## 📗 Usage 📗

### ① Install Skeet/Firebase CLI

```bash
$ npm i -g @skeet-framework/cli
$ npm install -g firebase-tools
```

### ② Create Skeet App

```bash
$ skeet create <appName>
```

![Skeet Create Select Template](/doc-images/cli/SkeetCreateV022.png)

In this tutorial, we will use the GraphQL template.

Next.js (React)-GraphQL

Select a template.

### ③ Run Skeet App

```bash
$ cd <appName>
$ skeet docker psql
$ skeet s
```

The Skeet App frontend and Firebase emulator, GraphQL PlayGround will start.

📲 Frontend(Next.js) - [http://localhost:4200/](http://localhost:4200/)

💻 Firebase Emulator - [http://localhost:4000/](http://localhost:4000/)

📊 GraphQL Playground - [http://localhost:3000/graphql](http://localhost:3000/graphql)

**⚠️ You need to finish _Activate Skeet ChatApp_ step to fully use default Skeet App ⚠️**

## 🤖 Activate Skeet ChatApp 🤖

### ① Create Googel Cloud Project

Create Google Cloud Project

- [https://console.cloud.google.com/projectcreate](https://console.cloud.google.com/projectcreate)

### ② Add Firebase Project

Add Firebase Project

- [https://console.firebase.google.com/](https://console.firebase.google.com/)

### ③ Activate Firebase Build

#### - Activate Firebase Authentication

- Activate Firebase Authentication
  ![Firebase Authentication](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-auth.png)

- Activate Email/Password Sign-in
  ![Email/Password Sign in](https://storage.googleapis.com/skeet-assets/imgs/backend/enable-fb-auth.png)

#### - Firebase Storage

- Activate Firebase Storage
  ![Firebase Storage](https://storage.googleapis.com/skeet-assets/imgs/backend/create-fb-storage.png)

- Select Native Mode
  ![Firebase Storage](https://storage.googleapis.com/skeet-assets/imgs/backend/select-env-storage.png)

- Select Region
  ![Firebase Storage](https://storage.googleapis.com/skeet-assets/imgs/backend/select-region-storage.png)

### ④ Skeet init to setup project

Run _skeet init_ command and select your GCP Project ID and Regions to setup.

Then, please visit the URL to authenticate your Firebase account.

```bash
// Please login to Google Cloud if you have not
$ gcloud auth login

$ skeet init --login
? What's your GCP Project ID skeet-demo
? Select Regions to deploy
  europe-west1
  europe-west2
  europe-west3
❯ europe-west6
  northamerica-northeast1
  southamerica-east1
  us-central1

Visit this URL on this device to log in:

https://accounts.google.com/o/oauth2/auth?project...

Waiting for authentication...
```

### ⑤ How to setup Secret Key

#### - Upgrade to Firebase Blaze Plan

Skeet Framework uses [Cloud Secret Manager](https://firebase.google.com/docs/functions/config-env?hl=en&gen=2nd) environment variables to manage sensitive information such as API keys.

This command requires a Firebase Blaze or higher plan.

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/firebase-plan-en.png)

From the Firebase console's bottom left menu, select _Upgrade_.

- [Firebase Console](https://console.firebase.google.com/u/0/project/_/usage/details)

#### - Cloud Usage of Skeet Framework

Skeet Framework requires a Firebase Blaze plan or higher.

Google Cloud Free Program should cover the usage fee for the development environment.

The Google Cloud Free Tier has two parts:

- A 90-day free trial with a $300 credit to use with any Google Cloud services.
- Always Free, which provides limited access to many common Google Cloud resources, free of charge.

[Free cloud features and trial offer](https://cloud.google.com/free/docs/free-cloud-features)

[Firabse Blaze Pricing Plans](https://firebase.google.com/pricing#blaze-calculator)

**⚠️ We also recommend setting things like budget alerts to avoid unexpected charges. ⚠️**

- [Avoid surprise bills](https://firebase.google.com/docs/projects/billing/avoid-surprise-bills)

#### - Create OpenAI API Key

- [https://beta.openai.com/](https://beta.openai.com/)

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/openai-api-key.png)

📕 [OpenAI API Document](https://platform.openai.com/docs/introduction)

#### - Set Secret Key in Cloud Secret Manager

using the _skeet add secret <secretKey>_ command

Set the OpenAI API key as an environment variable.

```bash
$ skeet add secret CHAT_GPT_ORG
? Enter value for CHAT_GPT_ORG: <yourOpenAIKey>
```

Set CHAT_GPT_KEY as well.

```bash
$ skeet add secret CHAT_GPT_KEY
? Enter value for CHAT_GPT_KEY: <yourOpenAIKey>
```

You can also write it in _functions/openai/.env_ to try it easily,
This method does not translate to production environments.

set Discord Webhook URL as well.

```bash
$ skeet add secret DISCORD_WEBHOOK_URL
? Enter value for DISCORD_WEBHOOK_URL: <yourDiscordWebhookURL>
```

If you don't want to use Discord Webhook, please comment out or delete the following part in

_functions/openai/src/routings/auth/authOnCreateUser.ts_

```ts
// const DISCORD_WEBHOOK_URL = defineSecret('DISCORD_WEBHOOK_URL')

  .runWith({
    ...authPublicOption,
    secrets: [SKEET_GRAPHQL_ENDPOINT_URL],
  })
```

```ts
// Send Discord message when new user is created
if (process.env.NODE_ENV === 'production') {
  // await sendDiscord(content, DISCORD_WEBHOOK_URL.value())
}
```

set SKEET_GRAPHQL_ENDPOINT_URL as well.

```bash
$ skeet add secret SKEET_GRAPHQL_ENDPOINT_URL
? Enter value for SKEET_GRAPHQL_ENDPOINT_URL: <yourSkeetGraphQLEndpointURL>
```

In development environments, it will look like this.

```bash
$ skeet add secret SKEET_GRAPHQL_ENDPOINT_URL
? Enter value for SKEET_GRAPHQL_ENDPOINT_URL: http://localhost:3000/graphql
```

Now you are ready to use Skeet ChatApp 🎉

## 📱 User Login Auth 📱

```bash
$ skeet s
```

Run Skeet App locally and access to

[http://localhost:19006/register](http://localhost:19006/register)
(with Next.js: [http://localhost:4200/auth/register](http://localhost:4200/auth/register))

Let's create a new user account with your email address and password.

![User Register](https://storage.googleapis.com/skeet-assets/imgs/backend/user-register.png)

After registration, you will see the console log like below.

![Email Validation](https://storage.googleapis.com/skeet-assets/imgs/backend/email-validation.png)

Click the link in the console log to verify your email address.

```bash
To verify the email address epics.dev@gmail.com, follow this link: <Link>
```

Successfully verified your email address.

![画像](https://storage.googleapis.com/skeet-assets/imgs/backend/email-validation-clicked.png)

## ✉️ Create AI Chat Room ✉️

After login, access this page to create a chat room.

[http://localhost:19006/user/open-ai-chat](http://localhost:19006/user/open-ai-chat)
(with Next.js: [http://localhost:4200/user/chat](http://localhost:4200/user/chat))

Let's create a chat room with the following settings.

OpenAI Chat Room Settings

| item             | description                       | type                  |
| ---------------- | --------------------------------- | --------------------- |
| Model            | Select OpenAI API's Model         | gpt-3.5-turbo / gpt-4 |
| Max Tokens       | Set OpenAI API's Max Tokens       | number                |
| Temperature      | Set OpenAI API's Temperature      | number                |
| System Charactor | Set OpenAI API's System Charactor | string                |

![OpenAI ChatGPT AI Chat](https://storage.googleapis.com/skeet-assets/imgs/backend/create-chatroom.png)

Now you are all set 🎉

![OpenAI ChatGPT AI Chat](https://storage.googleapis.com/skeet-assets/imgs/backend/skeet-chat-stream.gif)
