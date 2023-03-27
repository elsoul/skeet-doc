---
id: graphql-api
title: GraphQL API
description: Build Nexus Prisma GraphQL API in a sec. How to build GraphQL.
---

I want to move my hands and create a simple application that sends Solana Tokens.
Build a GraphQL API with the following features:

- User login
- Blog post
- Send and receive SOL money

Here, we will create a project created with the following command as an example.

```bash
$ skeet create skeet-example
$ cd skeet-example
```

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
  id            Int              @id @default(autoincrement())
  uid           String           @unique
  name          String           @default("Satoshi")
  email         String           @unique
  iconUrl       String?
  role          Role             @default(USER)
  createdAt     DateTime         @default(now())
  updatedAt     DateTime         @updatedAt
  userWallets   UserWallets[]
  posts         Post[]
  fromTransfers SolanaTransfer[] @relation("SolanaTransferFromUser")
  toTransfers   SolanaTransfer[] @relation("SolanaTransferToUser")
}

enum Role {
  USER
  ADMIN
  MASTER
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String   @default("title")
  body      String   @default("body")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    Int?
  user      User?    @relation(fields: [userId], references: [id])

  @@index([title])
  @@index([body])
}

model UserWallets {
  id         Int      @id @default(autoincrement())
  name       String   @default("EpicsDAO")
  chainType  String   @default("Solana")
  imgUrl     String   @default("")
  pubkey     String   @default("")
  privateKey String   @default("")
  priority   Int      @default(5)
  sol        Float    @default(0)
  usdc       Float    @default(0)
  epct       Float    @default(0)
  iv         Bytes
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  userId     Int?
  user       User?    @relation(fields: [userId], references: [id])

  @@unique([name, userId])
  @@index([pubkey])
}

model SolanaTransfer {
  id            Int      @id @default(autoincrement())
  amountLamport Float    @default(0)
  fromUser      User     @relation("SolanaTransferFromUser", fields: [fromUserId], references: [id])
  fromUserId    Int
  toUser        User     @relation("SolanaTransferToUser", fields: [toUserId], references: [id])
  toUserId      Int
  signature     String   @default("")
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

## Create Prisma migration file

You can create a **prisma** migration file with the following command.

```bash
$ skeet db migrate <migrationName>
```

In fact, enter the command like this:

```bash
$ skeet db migrate init
```

## Deploy Prisma migration

By applying the migration file to the database with the following command,
The defined table is created.

```bash
$ skeet db deploy
```

When running in production

```bash
$ skeet db deploy --production
```

## Run Scaffold

required for GraphQL

- Model

- Mutation
  -Query

with the **scaffold** command

Files are automatically generated in the following directory.

**apps/api/src/graphql/modelManager/**

```bash
$ skeet g scaffold
successfully created ✔ - ./apps/api/src/graphql/modelManager/User/mutation.ts
successfully created ✔ - ./apps/api/src/graphql/modelManager/User/model.ts
successfully created ✔ - ./apps/api/src/graphql/modelManager/User/query.ts
successfully created ✔ - ./apps/api/src/graphql/modelManager/User/index.ts
.
.
.
```

The following GraphQL Fields are added for each model:

| GraphQL  | Query Name     | File Path                                      |
| -------- | -------------- | ---------------------------------------------- |
| Model    | User           | apps/api/graphql/modelManager/User/model.ts    |
| Mutation | createUser     | apps/api/graphql/modelManager/User/mutation.ts |
| Mutation | updateUser     | apps/api/graphql/modelManager/User/mutation.ts |
| Mutation | deleteUser     | apps/api/graphql/modelManager/User/mutation.ts |
| Query    | getUser        | apps/api/graphql/modelManager/User/query.ts    |
| Query    | userConnection | apps/api/graphql/modelManager/User/query.ts    |

## Start the Skeet GraphQL API server

```bash
$ skeet s
```

Let's access the GraphQL Apollo Playground

[http://loalhost:4000/graphql](http://loalhost:4000/graphql)

![http://loalhost:4000/graphql](https://storage.googleapis.com/skeet-assets/imgs/backend/localhost4000.png)

For each model,

You can see from the documentation that the following GrapQL query was created.

| GraphQL  | Query Name     |
| -------- | -------------- |
| Mutation | createUser     |
| Mutation | updateUser     |
| Mutation | deleteUser     |
| Query    | getUser        |
| Query    | userConnection |

When running `skeet s`,

The following files containing type information are updated:

- **apps/api/src/nexus-typegen.ts**
- **apps/api/src/schema.graphql**
