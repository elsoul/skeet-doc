---
id: graphql-api
title: GraphQL API
description: Build Nexus Prisma GraphQL API in a sec. How to build GraphQL.
---

## Define schema.prisma

`prisma/schema.prisma`

```json
generator client {
  provider = "prisma-client-js"
}

generator nexusPrisma {
  provider = "nexus-prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id                  Int                   @id @default(autoincrement())
  uid                 String                @unique
  name                String                @default("Ninja")
}
```

## Prisma Generate

```bash
$ skeet db generate
```

## Create Prisma Migration File

```bash
$ skeet db migrate <migrationName>
```

## Prisma Migrate Deploy

```bash
$ skeet db deploy
```

For Production

```bash
$ skeet db deploy --production
```

## Run Scaffold

```bash
$ skeet g scaffold
```

## Run Skeet Server

```bash
$ skeet s
```
