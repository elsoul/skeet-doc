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

## directory structure

Skeet has multiple services in one repository.

Services are located in the apps directory.

for backend services

There are two types, api and worker,

Multiple workers can be created.

Tree structure

```
skeeter-app
├── apps
│   ├── api
│   ├── workers
│       ├── token-transfer
│       ├── scraper

  .
  .
```

## Schema driven development

Skeet combines with Nexus to auto-generate Prisma schemas to GraphQL endpoints (resolvers).

- [Nexus Prisma](https://graphql-nexus.github.io/nexus-prisma)

- [Apollo GraphQL](https://www.apollographql.com/)

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
