---
id: backend-quickstart
title: Quick Start
description: Skeet Framework Backend Quick Start
---

## What's Skeet?

Skeet is a full-stack TypeScript serverless application framework.

Skeet was born to reduce the cost of software development and operation.

Start developing and deploying serverless apps quickly.

Get ready to use scalable Cloud Firestore and Cloud Functions securely right away.

![https://storage.googleapis.com/skeet-assets/animation/skeet-cli-create.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-cli-create.gif)

## Dependency

- [TypeScript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Google SDK](https://cloud.google.com/sdk/docs)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [GitHub CLI](https://cli.github.com/)

## Cloud Network Configuration

Automatically complete the minimum required settings for security, such as Google Cloud's VPC configuration and Cloud Armor.

- Firewall
- VPC Network
- Subnet Network
- VPC Connector
- Load Balancer
- Cloud Armor
- Cloud DNS

## Usage

### Install Skeet CLI

```bash
$ npm i -g @skeet-framework/cli
```

### Create Skeet App

```bash
$ skeet create ${appName}
```

### Run Locally

```bash
$ cd ${appName}
$ skeet s
```

The Firebase emulator will start.

[http://localhost:4000/](http://localhost:4000/)
