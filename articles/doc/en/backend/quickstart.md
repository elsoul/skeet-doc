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

## Skeet CLI

Add new Firebase functions using Skeet CLI,
Loadbalancer's Routing etc. can be done automatically.

```bash
$ skeet --help
Usage: skeet [options] [command]

CLI for Skeet - Full-stack TypeScript Serverless framework

Options:
  -V, --version             output the version number
  -h, --help                display help for command

Commands:
  create <appName>          Create Skeet App
  server|s                  Run Skeet Server
  deploy                    Deploy Skeet APP to Google Cloud Platform
  init [options]            Generate Skeet Cloud Config
  iam                       Skeet IAM Comannd
  vpc                       Setup VPC for Google Cloud Platform
  yarn [options] <yarnCmd>
  add                       Add Comannd
  sync                      Skeet Sync Comannd
  delete|d                  Skeet Delete Command
  list                      Show Skeet App List
  help [command]            display help for command
```

## Sample Skeet command

Skeet CLI can be used to manage the entire lifecycle of the application.

### Skeet Yarn Install/Build

```bash
$ skeet yarn install/build
? Select Services to run yarn command (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  = Services =
❯◯ openai
 ◯ solana
```

### Add Yarn Package

You can add packages for specific features with the skeet Yarn command.

```bash
$ skeet yarn add -p ${packageName}
? Select Services to run yarn command (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  = Services =
❯◯ openai
 ◯ solana
```

For Development

```bash
$ skeet yarn add -p ${packageName} -D
? Select Services to run yarn command (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  = Services =
❯◯ openai
 ◯ solana
```

### Skeet Deploy

```bash
$ skeet deploy
? Select Services to run yarn command (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  = Services =
❯◯ openai
 ◯ solana
```

![Skeet Deploy](https://storage.googleapis.com/skeet-assets/animation/skeet-deploy-compressed.gif)

### Add Cloud Functions

```bash
$ skeet add functions <functionName>
```
