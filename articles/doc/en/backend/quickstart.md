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

## Run local

```bash
$ skeet s
```

Now you can access;

`http://localhost:4000/graphql`

## Zero to Deploy

### Git Init

```bash
$ skeet git init
```

### Make a first commit

```bash
$ git add .
$ git commit -m "first commit"
```

### Create/Push GitHub Repo

```bash
$ skeet git create elsoul/skeet
```

If you want to go with OpenSource;

```bash
$ skeet git create elsoul/skeet --public
```

### Setup Google Cloud IAM

```bash
$ skeet setup gcp
```

### Create Google CloudSQL

```bash
$ skeet sql create
```

### Add Secret ENV to GitHub Secrets

```bash
$ skeet sync env
```

### Commit and Push then CI/CD starts

```bash
$ git add .
$ git commit -m 'first deploy'
$ git push origin main
```

## Deploy with command

### Add your global IP to DB whiteList

Add your global IP to DB white list
This command will automatically add your IP in ./skeet-cloud.config.json

```bash
$ skeet add ip
```

### DB migrate

```bash
$ skeet db deploy --production
```

### Deploy to Google Cloud Run

```bash
$ skeet deploy
```

![Skeet Deploy](https://storage.googleapis.com/skeet-assets/animation/skeet-deploy-compressed.gif)
