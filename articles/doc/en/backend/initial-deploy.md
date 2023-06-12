---
id: initial-deploy
title: Initial Deploy
description: You can learn how to publish your Skeet app. You can also set deploy for each Commit with GitHub Actions with a single command.
---

## First deploy

In this chapter, we will proceed with the project name _skeet-demo_.
The tutorial uses the project created here.

## Install Firebase CLI

```bash
$ npm install -g firebase-tools
```

## Install Skeet CLI

```bash
$ npm install -g @skeet-framework/cli
```

## Login GitHub CLI Auth

```bash
$ gh auth login
```

## Create Google Cloud Project

If you have never used Google Cloud before, follow this link to create a project.

[How to create a project](https://cloud.google.com/resource-manager/docs/creating-managing-projects)

- It is also necessary to set up a billing account for the project.

## Gcloud CLI Auth login

```bash
$ gcloud auth application-default login
$ gcloud auth login
```

## Create a Firebase project

If you have never used Google Firebase before, follow this link to create a project.

[How to create a project](https://firebase.google.com/docs/projects/learn-more?hl=en)

## Create a Skeet Framework project

```bash
$ skeet create skeet-chatbot
```

### Initial deployment with Skeet Init command

Configure the following settings with the Skeet init command.

1. Region selection
2. Specify a GitHub repository name
3. Nameserver domain settings
4. Load balancer subdomain settings

```bash
$ skeet init
```

This command

- Create a GitHub repository
- Commit/push to GitHub repository
- Configure Actions for GitHub repositories
- Configuring secrets for GitHub repositories
- Google Cloud IAM settings
- Setting up Google Cloud DNS
- Configure Google Cloud Load Balancer
- Configure Google Cloud Armor
- Configuring Google Cloud VPC Network
- Configure Google Cloud VPC Subnet Network
- Configure Google Cloud VPC Connector

automatically.

Once configured, you will see the nameserver domain settings in the console log.

```bash
nameServers:
- ns-cloud-dx.googledomains.com.
- ns-cloud-dx.googledomains.com.
- ns-cloud-dx.googledomains.com.
- ns-cloud-dx.googledomains.com.
visibility: public
```

## Setting nameservers

Set the four records displayed above to your domain's nameservers.
The domain settings will be reflected in about 30 minutes to 2 hours after the settings are completed. (depending on your nameserver settings)

You have now completed your first deployment.

Let's go to https://your-domain.com/root.

```json
{
  "status": "success",
  "message": "Skeet APP is running!"
}
```

is displayed, it is successful.

## Start Firebase Emulator

```bash
$ skeet s
```

Let's go to http://localhost:4000.

If you can see the Firebase UI, you're good to go.

## Add Firebase Web APP

Add Web APP from the Firebase project settings screen.

## Configure Firebase Config

Copy the Firebase Config after completing the settings.

And Paste to

`src/lib/firebaseConfig.ts`

```javascript
const firebaseConfig = {
  apiKey: 'AIzaSyAwyELQ5bUI4O1QlIbn9vTR72-fDd4dUFw',
  authDomain: 'skeet-chatbot.firebaseapp.com',
  projectId: 'skeet-chatbot',
  storageBucket: 'skeet-chatbot.appspot.com',
  messagingSenderId: '316270971170',
  appId: '1:316270971170:web:e1bc11b3e70fb840b97d7b',
  measurementId: 'G-XP8HM3X7LS',
}
```

Now while starting the Firebase emulator

```bash
$ skeet login
```

command is now available.
