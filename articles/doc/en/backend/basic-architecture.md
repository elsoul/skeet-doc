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
