---
id: graphql-api
title: GraphQL API
description: Skeet では Nexus Prisma GraphQL API をすぐに立ち上げることができます。ここでは基本的なブログアプリケーションについて説明します。
---

この章 からは実際に手を動かして Solana Token を送信する簡単なアプリを作成していきたいと思います。

## schema.prisma の定義

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
  name          String           @default("Ninja")
  email         String           @unique
  iconUrl       String?
  role          Role             @default(USER)
  createdAt     DateTime         @default(now())
  updatedAt     DateTime         @updatedAt
  userWallets   UserWallets[]
  posts         Post[]
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

  @@unique([title, userId])
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

```

## Prisma Generate

```bash
$ skeet db generate
```

## Prisma マイグレーションファイルの作成

```bash
$ skeet db migrate <migrationName>
```

## Prisma マイグレーションのデプロイ

```bash
$ skeet db deploy
```

本番環境

```bash
$ skeet db deploy --production
```

## Scaffold の実行

```bash
$ skeet g scaffold
```

## Skeet Server を起動する

```bash
$ skeet s
```
