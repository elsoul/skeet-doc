---
id: graphql-api
title: GraphQL API
description: Skeet では Nexus Prisma GraphQL API をすぐに立ち上げることができます。ここでは基本的なブログアプリケーションについて説明します。
---

この章 からは実際に手を動かして Solana Token を送信する簡単なアプリを作成していきたいと思います。
主に以下の機能がついた GraphQL API を構築します。

- ユーザーログイン
- ブログ投稿
- SOL の送受金

ここでは以下のコマンドで作成したプロジェクトを例に作成していきます。

```bash
$ skeet create skeet-example
$ cd skeet-example
```

## schema.prisma の定義

まずは **schema** から定義します。

**apps/api/prisma/schema.prisma**

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

## Prisma マイグレーションファイルの作成

以下のコマンドで **prisma** のマイグレーションファイルを作成することができます。

```bash
$ skeet db migrate <migrationName>
```

実際に、次のようにコマンドを入力します。

```bash
$ skeet db migrate init
```

## Prisma マイグレーションのデプロイ

次のコマンドでマイグレーションファイルをデータベースに適用することで、
定義したテーブルが作成されます。

```bash
$ skeet db deploy
```

本番環境で実行する場合

```bash
$ skeet db deploy --production
```

## Scaffold の実行

GraphQL に必要な

- Model
- Mutation
- Query

を **scaffold** コマンドで

以下のディレクトリにファイルが自動生成されます。

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

各モデルに対して以下の GraphQL Field が追加されます。

| GraphQL  | Query Name     | File Path                                      |
| -------- | -------------- | ---------------------------------------------- |
| Model    | User           | apps/api/graphql/modelManager/User/model.ts    |
| Mutation | createUser     | apps/api/graphql/modelManager/User/mutation.ts |
| Mutation | updateUser     | apps/api/graphql/modelManager/User/mutation.ts |
| Mutation | deleteUser     | apps/api/graphql/modelManager/User/mutation.ts |
| Query    | getUser        | apps/api/graphql/modelManager/User/query.ts    |
| Query    | userConnection | apps/api/graphql/modelManager/User/query.ts    |

## Skeet GraphQL API Server を起動する

```bash
$ skeet s
```

それでは GraphQL Apollo Playground へアクセスしてみましょう

[http://loalhost:4000/graphql](http://loalhost:4000/graphql)

![http://loalhost:4000/graphql](https://storage.googleapis.com/skeet-assets/imgs/backend/localhost4000.png)

各モデルに対して、

以下の GrapQL クエリが作成されていることがドキュメントから確認できます。

| GraphQL  | Query Name     |
| -------- | -------------- |
| Mutation | createUser     |
| Mutation | updateUser     |
| Mutation | deleteUser     |
| Query    | getUser        |
| Query    | userConnection |

`skeet s` 実行時に、

型情報を含む以下のファイルが更新されます。

- **apps/api/src/nexus-typegen.ts**
- **apps/api/src/schema.graphql**

が更新されます。
