---
id: backend-quickstart
title: Quick Start
description: Skeet Framework Backend Quick Start
---

## Dependency

- [TypeScript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Google SDK](https://cloud.google.com/sdk/docs)
- [Docker](https://www.docker.com/)
- [GitHub CLI](https://cli.github.com/)
- [Git Crypt](https://github.com/AGWA/git-crypt)

## Install Skeet

```bash
$ npm i -g skeet
```

## Create Skeet API

```bash
$ skeet create ${appName}
```

![Skeet Create](https://storage.googleapis.com/skeet-assets/animation/skeet-create-compressed.gif)

## Run Local

```bash
$ skeet s
```

A GraphQL API will pop up.

[http://localhost:4000/graphql](http://localhost:4000/graphql)

## Deploy command

### Add Global IP to DB Whitelist

Add your global IP to the DB whitelist and also save it in `./skeet-cloud.config.json`.

```bash
$ skeet add ip
```

### DB Migration

```bash
$ skeet db deploy --production
```

### Deploy to Google Cloud Run

```bash
$ skeet deploy
```

![Skeet Deploy](https://storage.googleapis.com/skeet-assets/animation/skeet-deploy-compressed.gif)
