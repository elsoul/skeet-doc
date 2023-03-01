---
id: zero-to-deploy
title: Zero to Deploy
description: Zero to Deploy with Skeet TypeScript Serverless Framework
---

## Zero to deploy

### Create a Google Cloud project

If you have never used Google Cloud before, follow this link to create a project.

[How to create a project](https://cloud.google.com/resource-manager/docs/creating-managing-projects)

:::div{.success}
Beginners as well as those already using Google Cloud

You can get $200 free credits from the link below.

[Google Cloud credit link](https://cloud.google.com/partners/partnercredit?pcn_code=0014M00001h3BjPQAU)
:::

## Gcloud Auth login

```bash
$ gcloud auth application-default login
```

## Github CLI Auth Login

```bash
$ gh auth login
```

### Git Init

```bash
$ skeet init
```

![Skeet Init](https://storage.googleapis.com/skeet-assets/animation/skeet-init-compressed.gif)

Set your Name Server and it's ready!

### Commit and Push to start CI/CD

```bash
$ git add .
$ git commit -m 'first deploy'
$ git push origin main
```

### Deploy with Deploy Command

```bash
$ skeet deploy
```

![Skeet Deploy](https://storage.googleapis.com/skeet-assets/animation/skeet-deploy-compressed.gif)
