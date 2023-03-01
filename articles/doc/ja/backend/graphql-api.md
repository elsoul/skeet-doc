---
id: graphql-api
title: GraphQL API
description: Skeet では Nexus Prisma GraphQL API をすぐに立ち上げることができます。ここでは基本的なブログアプリケーションについて説明します。
---

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
  id                  Int                   @id @default(autoincrement())
  uid                 String                @unique
  name                String                @default("Ninja")
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
