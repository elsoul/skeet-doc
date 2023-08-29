---
id: tutorial
title: チュートリアル - GraphQL
description: Skeet フレームワーク を使ってAIチャットアプリを作成するチュートリアルです。
---

## チュートリアル - GraphQL

このチュートリアルでは Skeet Framework GraphQL を使ってチャットアプリを作成します。
プログラミング言語 TypeScript と GraphQL, GitHub を含めた総合的なクラウドアプリの開発チュートリアルです。

![https://storage.googleapis.com/skeet-assets/animation/skeet-db-studio.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-db-studio.gif)

このチュートリアルでは 基本的なチャットボットアプリ を作成します。
クイックスタートでは Skeet Framework GraphQL の基本的な使い方を学びましたが、
このチュートリアルでは Skeet Framework の機能を使ってこれまでには簡単にできなかったことが、
どのように簡単にできるようになるかを学びます。
オープンソースとしてライブラリーを公開して下さっている開発者の方々には多大なる感謝を申し上げます。

Skeet Framework は、コンピューターリソースを効率的に使うことで、
開発者がより少ないコードでより多くのことを実現できるように設計されています。
さらに、昨今の地球では環境問題が深刻化しており、エネルギーを効率的に使うことは、
開発者の責務であると考えています。

このチュートリアルで学ぶ技法はどのような Skeet Framework のアプリにおいても基本的なものであり、マスターすることで Skeet への深い理解が得られます。

この章では クイックスタートで作成した 機械学習（OpenAI） の API を使ったチャットボットアプリに新しい機能を追加していきます。

## チュートリアルの目標

このチュートリアルでは、以下のことを学びます。

- RDB スキーマを定義する
- Scaffold で GraphQL ファイルを生成する
- 開発用ログイン認証キーを取得する
- GraphQL Playground を使って API リクエストを送信する
- Cloud Run へデプロイする

## チュートリアルの前提条件

[クイックスタート](/ja/doc/skeet-graphql/quickstart) が完了していない場合は先に完了させてください。

## 開発環境

Skeet Framework では エディタに VScode を推奨しています。
フレームワークに沿って開発を進めることで、
GitHub Copilot を使った強力なコード補完サポートを受けることができます。

- [VScode](https://code.visualstudio.com/)
- [GitHub Copilot](https://copilot.github.com/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

Chatbot には OpenAI の API を使います。

- [OpenAI](https://openai.com/)

Skeet GraphQL は スキーマ駆動開発 を推奨しています。
スキーマ駆動開発では、スキーマを定義することで、
開発者が意識するべきことを最小限に抑えることができます。

RDBMS には PostgreSQL または MySQL を使います。
ORM には Prisma を使います。

- [PostgreSQL](https://www.postgresql.org/)
- [MySQL](https://www.mysql.com/)
- [Prisma](https://www.prisma.io/)

## RDB スキーマを定義する

Skeet Framework では RDB スキーマを定義することで、
GraphQL のスキーマを自動生成することができます。

ここではデフォルトのモデルに加えて、
ブログの記事を保存するためのモデルを追加します。

_graphql/prisma/schema.prisma_

```typescript
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

enum Role {
  USER
  ADMIN
  MASTER
}

model User {
  id               Int               @id @default(autoincrement())
  uid              String            @unique
  username         String?
  email            String            @unique
  iconUrl          String?
  role             Role              @default(USER)
  iv               String?
  createdAt        DateTime          @default(now())
  updatedAt        DateTime          @updatedAt
  chatRoomMessages ChatRoomMessage[]
  userChatRooms    UserChatRoom[]

  @@index([username])
}

model ChatRoom {
  id               Int               @id @default(autoincrement())
  name             String?
  title            String?
  model            String            @default("gpt4")
  maxTokens        Int               @default(500)
  temperature      Int               @default(0)
  stream           Boolean           @default(false)
  createdAt        DateTime          @default(now())
  updatedAt        DateTime          @updatedAt
  chatRoomMessages ChatRoomMessage[]
  userChatRooms    UserChatRoom[]
}

model ChatRoomMessage {
  id         Int      @id @default(autoincrement())
  role       String
  content    String
  userId     Int
  chatRoomId Int
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  User       User     @relation(fields: [userId], references: [id])
  ChatRoom   ChatRoom @relation(fields: [chatRoomId], references: [id])
}

model UserChatRoom {
  userId     Int
  chatRoomId Int
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  User       User     @relation(fields: [userId], references: [id])
  ChatRoom   ChatRoom @relation(fields: [chatRoomId], references: [id])

  @@id([userId, chatRoomId])
}
```

### データベースを設定する

次のコマンドを実行し、データベースを設定します。

```bash
$ skeet db generate
```

_skeet db migrate <migrationName>_ コマンドを実行すると、

マイグレーションファイルを作成します。

```bash
$ skeet db migrate addUniqToUserChatRoom
Applying migration `20230801172446_add_uniq_to_user_chat_room`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20230801172446_add_uniq_to_user_chat_room/
    └─ migration.sql

Your database is now in sync with your schema.
Running generate... - Nexus Prisma
You can now start using Nexus Prisma in your code. Reference: https://pr
✔ Generated Prisma Client (5.0.0 | library) to ./node_modules/@prisma/cl
ient in 62ms
✔ Generated Nexus Prisma to ./node_modules/.nexus-prisma in 20ms
```

データベースが更新されました 🎉

## Scaffold で GraphQL ファイルを生成する

新しくモデルを追加した場合は、

_skeet generate scaffold_ コマンドを実行することで、

CRUD 機能を持つ GraphQL API を自動生成することができます。

```bash
$ skeet generate scaffold
successfully created ✔ - ./graphql/src/graphql/index.ts
successfully created ✔ - ./graphql/src/graphql/modelManager/index.ts
```

このように Skeet GraphQL では、
スキーマを定義することで、
GraphQL のスキーマを自動生成することができます。

## 開発用ログイン認証キーを取得する

それではさっそく開発の準備に入ります。
まずは Firebase エミュレーターを起動し、_ACCESS_TOKEN_ を取得します。

```bash
$ skeet s
```

別ウィンドウで次のコマンドを実行し、
_accessToken_ を取得します。

```bash
$ skeet login
🚸 === Copy & Paste below command to your terminal === 🚸

export ACCESS_TOKEN={accessToken}

🚸 =========           END           ========= 🚸
```

コンソールログに表示された accessToken を環境変数に設定することで、

_skeetGraphql_ 関数を使って API リクエストを送信することができます。

ログインコマンドが成功すると、

デフォルトで　*authOnCreateUser.ts* に定義されている

Auth インスタンスのトリガーが作動して

Firebase Firestore にユーザー情報が保存されます。

_functions/skeet/routings/auth/authOnCreateUser.ts_

デフォルトの設定では、ユーザー作成時に Discord に通知が送信されます。

環境変数に Discord の _DISCORD_WEBHOOK_URL_ を設定することで、
通知を受け取ることができます。

```typescript
import { User } from '@/models'
import { addCollectionItem } from '@skeet-framework/firestore'
import * as functions from 'firebase-functions/v1'
import { authPrivateOption } from '@/routings'
import { gravatarIconUrl } from '@/utils/placeholder'
import skeetConfig from '../../../skeetOptions.json'
import { defineSecret } from 'firebase-functions/params'
const DISCORD_WEBHOOK_URL = defineSecret('DISCORD_WEBHOOK_URL')
const SKEET_GRAPHQL_ENDPOINT_URL = defineSecret('SKEET_GRAPHQL_ENDPOINT_URL')
const region = skeetConfig.region

export const authOnCreateUser = functions
  .runWith({
    ...authPrivateOption,
    secrets: [DISCORD_WEBHOOK_URL, SKEET_GRAPHQL_ENDPOINT_URL],
  })
  .region(region)
  .auth.user()
  .onCreate(async (user) => {
    try {
      if (!user.email) throw new Error(`no email`)
      const { uid, email, displayName, photoURL } = user
      const userParams: User = {
        uid,
        email: email,
        username: displayName || email?.split('@')[0],
        iconUrl:
          photoURL == '' || !photoURL
            ? gravatarIconUrl(email ?? 'info@skeet.dev')
            : photoURL,
      }

      console.log({ userParams })
      const accessToken = 'skeet-access-token'
      const createUserResponse = await skeetGraphql(
        accessToken,
        SKEET_GRAPHQL_ENDPOINT_URL.value(),
        'mutation',
        queryName,
        userParams
      )

      console.log(
        inspect(createUserResponse, false, null, true /* enable colors */)
      )

      // Send Discord message when new user is created
      const content = `Skeet APP New user: ${userParams.username} \nemail: ${userParams.email}\niconUrl: ${userParams.iconUrl}`
      if (process.env.NODE_ENV === 'production') {
        await sendDiscord(content, DISCORD_WEBHOOK_URL.value())
      }
      console.log({ status: 'success' })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  })
```

ユーザー情報は、

_await getLoginUser(req)_

を使って Firebase から取得します。

```typescript
import { getLoginUser } from '@/lib'

const user: CurrentUser = await getLoginUser(req)
```

getLoginUser の戻り値の型定義はデフォルトで次のようになっています。

```typescript
export type CurrentUser = {
  id: string
  uid: string
  username: string | null
  email: string
  iconUrl: string | null
  role: Role
  iv: string | null
  createdAt: Date
  updatedAt: Date
}
```

## GraphQL Playground を使って API リクエストを送信する

## Cloud Run へデプロイする

```bash
$ skeet deploy
```

## Skeet yarn build

Skeet yarn build コマンドで
a キーを押すと、全てのファンクションのビルドが行われます。

```bash
$ skeet yarn build
```

## Skeet Framework のデプロイ

Skeet Framework に 2 種類のデプロイ方法があります。

- GitHub Actions による CI/CD
- Skeet CLI によるデプロイ

## GitHub Actions による CI/CD

```bash
$ git add .
$ git commit -m "first deploy"
$ git push origin main
```

GitHub に push すると、GitHub Actions により、自動でデプロイが行われます。

**⚠️ [最初のデプロイ](/ja/doc/backend/initial-deploy) を完了させる必要があります。 ⚠️**

## Skeet CLI によるデプロイ

```bash
$ skeet deploy
? Select Services to run functions command (Press <space> to select, <a> to toggle all, <i> to invert
selection, and <enter> to proceed)
  = Services =
❯◯ graphql
 ◯ skeet
```

デプロイする _service_ を選択し,
選択された _service_ のみをデプロイします。
a を押すと全ての _service_ を選択します。

これで、Skeet Framework のデプロイは完了です 🎉
あとはあなたのアイディアを実装するだけです 🎉
