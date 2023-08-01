---
id: tutorial
title: Tutorial - GraphQL
description: This tutorial will create an OpenAI Chat App using Skeet Framework.
---

## Tutorial - GraphQL

This tutorial uses the Skeet Framework GraphQL to create a chat app. This is a comprehensive cloud application development tutorial including the programming language TypeScript, GraphQL, and GitHub.

![https://storage.googleapis.com/skeet-assets/animation/skeet-db-studio.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-db-studio.gif)

This tutorial creates a basic chatbot app.
I learned the basic usage of Skeet Framework in the quick start,
This tutorial uses the power of the Skeet Framework to do things that weren't easy to do before.
Learn how it can be done easily.
We would like to express our deepest gratitude to the developers who have released their libraries as open source.

Skeet Framework efficiently uses computer resources to
It's designed to help developers do more with less code.
Furthermore, environmental problems are becoming more serious on the earth these days, and efficient use of energy is
I think it's the developer's responsibility.

**You may be tempted to skip this because you don't want to build a chatbot, but please read it.**

The techniques you learn in this tutorial are fundamental to any Skeet Framework app, and mastering them will give you a deep understanding of Skeet.

In this chapter, we will add new features to the chatbot app using the machine learning (OpenAI) API created in Quick Start.

## The Goal of Tutorial

In this tutorial you will learn:

- Define RDB schema
- Generate GraphQL files with Scaffold
- Get a development login authentication key
- Send API requests using GraphQL Playground
- Deploy to Cloud Run

## Tutorial prerequisites

If you haven't completed the [quick start](/ja/doc/skeet-graphql/quickstart), please complete it first.

## Development environment

Skeet Framework recommends VScode as editor.
By proceeding with development according to the framework,
Get powerful code completion support with GitHub Copilot.

- [VScode](https://code.visualstudio.com/)
- [GitHub Copilot](https://copilot.github.com/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

Chatbot uses OpenAI's API.

- [OpenAI](https://openai.com/)

Skeet GraphQL encourages schema-driven development.
In schema-driven development, by defining a schema,
You can minimize what developers need to be aware of.

Use PostgreSQL or MySQL for RDBMS.
We use Prisma as our ORM.

- [PostgreSQL](https://www.postgresql.org/)
- [MySQL](https://www.mysql.com/)
- [Prisma](https://www.prisma.io/)

## Define the RDB schema

By defining the RDB schema in Skeet Framework,
GraphQL schema can be automatically generated.

Here in addition to the default schema,
Add _@@unique([userId, chatRoomId])_ to _UserChatRoom_.

_graphql/prisma/schema.prisma_

```ts
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
+ @@unique([userId, chatRoomId])
}
```

### Configure the database

Run the following command to configure the database.

```bash
$ skeet db generate
```

When I run the _skeet db migrate <migrationName>_ command,

Create a migration file.

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

Database updated 🎉

## Generate GraphQL files with Scaffold

If you add a new model,

By running the _skeet generate scaffold_ command,

You can auto-generate a GraphQL API with CRUD functionality.

```bash
$ skeet generate scaffold
successfully created ✔ - ./graphql/src/graphql/index.ts
successfully created ✔ - ./graphql/src/graphql/modelManager/index.ts
```

In Skeet GraphQL like this,
By defining the schema
GraphQL schema can be automatically generated.

## Get a development login authentication key

Now let's get ready for development.
Start the Firebase emulator and get an _ACCESS_TOKEN_.

```bash
$ skeet s
```

Run the following command in another window,
Get an _accessToken_.

```bash
$ skeet login
🚸 === Copy & Paste below command to your terminal === 🚸

export ACCESS_TOKEN={accessToken}

🚸 =========           END           ========= 🚸
```

By setting the accessToken displayed in the console log to the environment variable,

You can send API requests using the _skeetGraphql_ function.

If the login command succeeds,

Defined in _authOnCreateUser.ts_ by default

Auth instance trigger fired

User information is stored in Firebase Firestore.

_functions/openai/routings/auth/authOnCreateUser.ts_

By default, a notification is sent to Discord when a user is created.

By setting Discord's _DISCORD_WEBHOOK_URL_ in the environment variable,
You can receive notifications.

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

User information is

_await getLoginUser(req)_

to get it from Firebase.

```typescript
import { getLoginUser } from '@/lib'

const user: CurrentUser = await getLoginUser(req)
```

The default return type definition for _getLoginUser_ is:

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

## Send API requests using GraphQL Playground

## Deploy to Cloud Run

```bash
$ skeet deploy
```

## Skeet yarn build

With the Skeet yarn build command
Press the a key to build all functions.

```bash
$ skeet yarn build
```

## Skeet Deploy

Skeet Framework has two deployment methods.

- CI/CD with GitHub Actions
- Deploy with Skeet CLI

## CI/CD with GitHub Actions

```bash
$ git add .
$ git commit -m "first deploy"
$ git push origin main
```

GitHub Actions automatically deploy when you push to GitHub.

**⚠️ [Initial deployment](/en/doc/skeet-graphql/initial-deploy) must be completed. ⚠️**

## Skeet CLI によるデプロイ

```bash
$ skeet deploy
? Select Services to run functions command (Press <space> to select, <a> to toggle all, <i> to invert
selection, and <enter> to proceed)
  = Services =
❯◯ graphql
 ◯ openai
```

Select the _services_ to deploy,
Deploy only selected _services_.
Press a to select all _services_.

Skeet Framework is now deployed 🎉
Now all you have to do is implement your idea 🎉
