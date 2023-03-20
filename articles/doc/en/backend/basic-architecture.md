---
id: basic-architecture
title: Basic Architecture
description: Basic Architecture - Skeet TypeScript Serverless Framework
---

## Introduction

The Skeet framework manages applications with [Monorepo](https://en.wikipedia.org/wiki/Monorepo).

Web applications include user apps, admin apps, backend APIs, task processing by workers, etc.

There are various roles.. but

All in one git repository.

This greatly improves development efficiency between teams.

## Overall directory structure

Skeet has multiple services in one repository.

Services are placed in a directory under apps.

for backend services

There are two types, api and worker,

Multiple workers can be created.

Front-end services are arranged for each app,
It supports web, iOS, and Android.

tree structure

```
skeet-example
├── apps
│   ├── api
│   ├── workers
│   ├── app

  .
  .
```

## Skeet GraphQL API Structure

```
skeet-example
├── apps
│   ├── api
│        ├── prisma
│        │      ├── migrations
│        │      ├── schema.prisma
│        ├── src
│        │    ├── graphql
│        │    │      ├── authManager
│        │    │      ├── modelManager
│        │    │      ├── responseManager
│        │    │      ├── taskManager
│        │    │      ├── enums.ts
│        │    │      ├── index.ts
│        │    ├── lib
│        │    ├── utils
│        │    ├── index.ts
│        │    ├── nexus-typegen.ts
│        │    ├── permission.ts
│        │    ├── schema.graphql
│        │    ├── schema.ts
│        ├── tests
  .
  .
```

Let's start by defining a model in `schema.prisma`.

- `authManager` manages GraphQL queries regarding user logins, etc.

- `modelManager` manages CRUD GraphQL queries defined in Prisma Schema. Files in this directory are automatically generated.

- Manage GraphQL queries on return values ​​from the `responseManager` Skeet Worker.

- `taskManager` manages GraphQL queries that are queued to the Skeet Worker.

## Schema driven development

Skeet combines with Nexus to auto-generate Prisma schemas to GraphQL endpoints (resolvers).

- [Nexus Prisma](https://graphql-nexus.github.io/nexus-prisma)

- [Apollo GraphQL](https://www.apollographql.com/)

- [GraphQL Shield](https://the-guild.dev/graphql/shield/docs)

Maximize development efficiency with Prisma schema-driven scaffolding (automatic generation). It achieves global scale with lower management costs.

## Automatic deployment with GitHub Actions

The Skeet framework uses `Github Actions`,

CI/CD environment is already setup.

`API`, detects changes in each `Worker` directory,

If there are any changes, just `push` to the `main` branch and the deployment will be completed.
I run tests before deploying, so
In the unlikely event that the test fails, the deployment will be rolled back, so
It is not deployed in production.
This allows projects to proceed in a safe and rapid development environment.

## What is CI/CD

CI/CD (continuous integration/continuous delivery) is the practice of introducing automation into the application development stage to deliver applications to customers more frequently. The main concepts that emerged from CI/CD are continuous integration, continuous delivery and continuous deployment. CI/CD is a solution to the problems that new code integration creates for development and operations teams (or "integration hell").

## Skeet CLI

Skeet CLI provides a set of useful commands for developing with Skeet. The current list of commands is as follows:

```bash
$ skeet --help
Usage: skeet [options] [command]

CLI to Skeet TypeScript Serverless Framework

Options:
  -V, --version             output the version number
  -h, --help                display help for command

Commands:
  test
  create <initAppName>      Create Skeet App
  init                      Setup Google Cloud Platform
  server|s                  Run Skeet Server
  deploy                    Deploy to Google Cloud Run
  yarn [options] <yarnCmd>
  add                       Add Comannd
  g|generate                Generate Comannd
  d|delete                  Delete Comannd
  db                        DB Command
  sql                       CloudSQL Comannd
  setup                     Setup Command
  sync                      Sync Command
  docker                    Docker Command
  help [command]            display help for command
```

You can access these commands from the Skeet CLI tool. For more information on each command, use the --help option followed by the command name.

For example:

```bash
$ skeet create --help
Usage: skeet create [options] <initAppName>

Create Skeet App

Options:
  -t, --template <template>  Skeet app template to use (default: "typescript")
  -h, --help                 display help for command
```

## Skeet Yarn Command

Use the Skeet Yarn command to add modules to the package.json for API and Worker.

```bash
$ skeet yarn --help
Usage: skeet yarn [options] <yarnCmd>

Arguments:
  yarnCmd                  dev,install,build,start,add

Options:
  --service <serviceName>  Skeet Service Name (default: "")
  -p, --p <packageName>    npm package name (default: "")
  -D                       Dependency environment (default: false)
  -h, --help               display help for command
```

For example, to add the npm module bs58:

```bash
$ skeet yarn add -p bs58
? Select Services to run yarn command (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  = Services =
❯◯ api
```

Select the services you want to update by using the space key to select and the enter key to execute. If you have workers, you can select them for multiple apps simultaneously.

## Skeet Sync Command

Using the Skeet Sync command, synchronize the configuration of Google Cloud and skeet-cloud.config.json.

```bash
$ skeet help sync
Usage: skeet sync [options] [command]

Sync Command

Options:
  -h, --help      display help for command

Commands:
  type
  gcloud
  actions
  env
  armor
  sql
  taskQueue
  runUrl
  help [command]  display help for command
```
