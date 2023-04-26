---
id: backend-quickstart
title: Quick Start
description: Skeet Framework Backend Quick Start
---

## What's Skeet?

Full-stack TypeScript Serverless Framework 'Skeet'.

The Skeet project was launched with the goal of reducing software development, operation, and maintenance costs.

Build Serverless Apps faster.
Powered by TypeScript, Firebase Cloud FireStore, Jest, Prettier, and Google Cloud Functions 2nd Generation.

![https://storage.googleapis.com/skeet-assets/animation/skeet-cli-create.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-cli-create.gif)

GitHub: https://github.com/elsoul/skeet-cli

## Dependency

- [TypeScript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Google SDK](https://cloud.google.com/sdk/docs)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [Docker](https://www.docker.com/)
- [GitHub CLI](https://cli.github.com/)

## Cloud Network Architecture

Automated to build all the Google Cloud VPC network settings;

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

### Run local

```bash
$ skeet s
```

Now you can access;

`http://localhost:4000/`

## Zero to Deploy

### Project Init

```bash
$ skeet init
```

### Deploy Whole Application

```bash
$ skeet deploy
```

![Skeet Deploy](https://storage.googleapis.com/skeet-assets/animation/skeet-deploy-compressed.gif)

### Add Cloud Functions

```bash
$ skeet add functions <functionName>
```

## Skeet CLI

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
  deploy                    Deploy Skeet App
  init [options]
  iam                       Skeet IAM Comannd
  vpc                       Setup VPC for Google Cloud Platform
  yarn [options] <yarnCmd>
  add                       Add Comannd
  list                      Show Skeet App List
  help [command]            display help for command
```
