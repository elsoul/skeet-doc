---
id: basic-architecture
title: 基本構造
description: Skeet Framework バックエンドの基本的ツリー構造や使い方について説明します。
---

Skeet Framework バックエンドの基本的な構造は以下の通りです。

| 一般的なバックエンドに必要な機能 | Skeet Framework                        |
| -------------------------------- | -------------------------------------- |
| データベース                     | Firestore                              |
| ログイン認証                     | Firebase Authentication                |
| API                              | Cloud Functions for Firebase 第 2 世代 |
| ロードバランサー                 | Cloud Load Balancer                    |
| スケジュールタスク               | Cloud Scheduler                        |
| Pub/Sub                          | Cloud Pub/Sub                          |
| ドメイン                         | Cloud DNS                              |
| セキュリティ                     | Cloud Armor                            |

- [Typesaurus](https://typesaurus.com) による Firestore の型定義をサポート
- [GitHub Actions](https://github.com/features/actions) による CI/CD をサポート
- [Firebase Emulator](https://firebase.google.com/docs/emulator-suite) によるローカル開発をサポート
- [TypeScript](https://www.typescriptlang.org/) による型安全な開発をサポート

## Skeet Framework の基本構造

Skeet Framework のバックエンドはサーバーレスなため、
すぐにファンクションから書き始めることができます。

_src_ にフロントエンドのソースコードが配置されます。

_functions_ ディレクトリ以下に Cloud Functions for Firebase のプロジェクトが配置されます。

functions には複数の functions を追加することができます。

```bash
├── src
│   ├── public
│   └── types
├── functions
│   └── openai
├── package.json
├── skeet-cloud.config.json
└── firebase.json
```

| ディレクトリ            | 説明                                        |
| ----------------------- | ------------------------------------------- |
| src                     | フロントエンドのソースコード                |
| src/public              | フロントエンドのソースコード                |
| src/types               | フロントエンドの型定義                      |
| functions               | Cloud Functions for Firebase のソースコード |
| functions/openai        | OpenAI API に関する functions               |
| package.json            | バックエンドのパッケージ管理                |
| skeet-cloud.config.json | Skeet Framework の設定ファイル              |
| firebase.json           | Firebase の設定ファイル                     |

## Skeet Functions の基本構造

Skeet Functions は Cloud Functions for Firebase をベースにしています。
_functions_ ディレクトリ以下に Cloud Functions for Firebase のプロジェクトが配置されます。
functions には複数の functions を追加することができます。

例: _functions/openai_

```bash
.
├── build.ts
├── devBuild.ts
├── dist
│   └── index.js
├── nodemon.json
├── package.json
├── src
│   ├── index.ts
│   ├── lib
│   ├── models
│   ├── routings
│   ├── scripts
│   ├── types
│   └── utils
├── tsconfig.json
└── yarn.lock
```

| ディレクトリ  | 説明                         |
| ------------- | ---------------------------- |
| build.ts      | ビルドスクリプト             |
| devBuild.ts   | ビルドスクリプト             |
| dist          | ビルド後のソースコード       |
| nodemon.json  | ローカルでの起動設定         |
| package.json  | バックエンドのパッケージ管理 |
| src           | ソースコード                 |
| src/index.ts  | エントリーポイント           |
| src/lib       | ライブラリ                   |
| src/models    | モデル                       |
| src/routings  | ルーティング                 |
| src/scripts   | スクリプト                   |
| src/types     | 型定義                       |
| src/utils     | ユーティリティ               |
| tsconfig.json | TypeScript の設定            |
| yarn.lock     | パッケージのロックファイル   |

## Skeet Functions のインスタンスタイプ

| インスタンスタイプ | 説明                                                                   |
| ------------------ | ---------------------------------------------------------------------- |
| Http               | HTTP リクエストを受け取る関数                                          |
| PubSub             | PubSub メッセージを受け取る関数                                        |
| Scheduler          | スケジュールされた関数                                                 |
| Firestore          | Firestore のドキュメントの作成、更新、削除などのトリガーを受け取る関数 |
| Auth               | Firebase ユーザーアカウントの作成と削除などのトリガーを受け取る関数    |

## Skeet Rountings の基本構造

インスタンスのタイプによって、ルーティングの設定が異なります。
また、Cloud Functions for Firebase のオプション設定は routings/options 以下に配置されています。

```bash
├── auth
│   ├── authOnCreateUser.ts
│   └── index.ts
├── firestore
│   ├── firestoreExample.ts
│   └── index.ts
├── http
│   ├── addUserChatRoomMessage.ts
│   ├── createUserChatRoom.ts
│   ├── getUserChatRoomMessages.ts
│   ├── index.ts
│   └── root.ts
├── index.ts
├── options
│   ├── authOptions.ts
│   ├── firestoreOptions.ts
│   ├── httpOptions.ts
│   ├── index.ts
│   ├── pubsubOptions.ts
│   └── schedulerOptions.ts
├── pubsub
│   ├── index.ts
│   └── pubsubExample.ts
└── scheduler
    ├── index.ts
    └── schedulerExample.ts
```

### Http インスタンスの設定

Http のデフォルトオプション設定

_routings/options/http/httpOptions.ts_

```ts
import { HttpsOptions } from 'firebase-functions/v2/https'
const project = process.env.PROJECT_ID || 'skeet-chat'
const cors = ['http://localhost:4000', 'https://app.skeeter.app']
const serviceAccount = `${project}@${project}.iam.gserviceaccount.com`
const vpcConnector = `${project}-con`
const region = process.env.REGION || 'europe-west6'

export const defaultHttpOption: HttpsOptions = {
  region,
  cpu: 1,
  memory: '1GiB',
  maxInstances: 100,
  minInstances: 0,
  concurrency: 1,
  serviceAccount,
  ingressSettings: 'ALLOW_INTERNAL_AND_GCLB',
  vpcConnector,
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY',
  cors,
}
```

Http インスタンスの設定は、_routings/http/{httpInstance}_ に記述します。

_routings/http/root.ts_

```ts
import { onRequest } from 'firebase-functions/v2/https'
import { defaultHttpOption } from '@/routings/options'
import { TypedRequestBody } from '@/index'
import { RootParams } from '@/types/http/rootParams'

export const root = onRequest(
  defaultHttpOption,
  async (req: TypedRequestBody<RootParams>, res) => {
    try {
      res.json({
        status: 'Skeet APP is Running!',
        name: req.body.name || 'Anonymous',
      })
    } catch (error) {
      const errorLog = `root - ${error}`
      console.log(errorLog)
      res.status(400).json({ result: 'root error!' })
    }
  }
)
```

Http インスタンスの型定義は、_src/types/http/{httpInstance}Params.ts_ に記述します。

_types/http/rootParams.ts_

```ts
export type RootParams = {
  name?: string
}
```

### PubSub インスタンスの設定

PubSub デフォルトオプション設定

_routings/options/pubsub/pubsubOptions.ts_

```ts
import { PubSubOptions } from 'firebase-functions/v2/pubsub'
import dotenv from 'dotenv'
dotenv.config()

const project = process.env.PROJECT_ID || 'skeet-chat'
const region = process.env.REGION || 'europe-west6'
const serviceAccount = `${project}@${project}.iam.gserviceaccount.com`
const vpcConnector = `${project}-con`

export const pubsubDefaultOption = (topic: string): PubSubOptions => ({
  topic,
  region,
  cpu: 1,
  memory: '1GiB',
  maxInstances: 100,
  minInstances: 0,
  concurrency: 1,
  serviceAccount,
  ingressSettings: 'ALLOW_INTERNAL_ONLY',
  vpcConnector,
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY',
})
```

PubSub インスタンスルーティングは、_routings/pubsub/{pubsubInstance}_ に記述します。

_routings/pubsub/pubsubExample.ts_

```ts
import { onMessagePublished } from 'firebase-functions/v2/pubsub'
import { pubsubDefaultOption } from '@/routings/options'

export const TOPIC_NAME = 'pubsubExample'

export const pubsubExample = onMessagePublished(
  pubsubDefaultOption(TOPIC_NAME),
  async (event) => {
    try {
      console.log({ result: 'success', topic: TOPIC_NAME, event })
    } catch (error) {
      console.error({ result: 'error', error: String(error) })
    }
  }
)
```

PubSub インスタンスの型定義は、_src/types/pubsub/{pubsubInstance}Params.ts_ に記述します。

_types/pubsub/pubsubExampleParams.ts_

```ts
export type PubsubExampleParams = {
  message?: string
}
```

### Scheduler インスタンスの設定

Scheduler デフォルトオプション設定

_routings/options/scheduler/schedulerOptions.ts_

```ts
import { ScheduleOptions } from 'firebase-functions/v2/scheduler'
import dotenv from 'dotenv'
dotenv.config()

const project = process.env.PROJECT_ID || 'skeet-example'
const region = process.env.REGION || 'europe-west6'
const serviceAccount = `${project}@${project}.iam.gserviceaccount.com`
const vpcConnector = `${project}-con`

export const schedulerDefaultOption: ScheduleOptions = {
  region,
  schedule: 'every 1 hours',
  timeZone: 'UTC',
  retryCount: 3,
  maxRetrySeconds: 60,
  minBackoffSeconds: 1,
  maxBackoffSeconds: 10,
  serviceAccount,
  ingressSettings: 'ALLOW_INTERNAL_ONLY',
  vpcConnector,
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY',
}
```

Scheduler インスタンスの設定は、_routings/scheduler/{schedulerInstance}_ に記述します。

_routings/scheduler/schedulerExample.ts_

```ts
import { onSchedule } from 'firebase-functions/v2/scheduler'
import { schedulerDefaultOption } from '@/routings/options'

const TOPIC_NAME = 'schedulerExample'

export const schedulerExample = onSchedule(
  schedulerDefaultOption,
  async (event) => {
    try {
      console.log({ result: 'success', topic: TOPIC_NAME, event })
    } catch (error) {
      console.log({ result: 'error', message: String(error) })
    }
  }
)
```

### Firestore インスタンスの設定

Firestore デフォルトオプション設定

_routings/options/firestore/firestoreOptions.ts_

```ts
import { DocumentOptions } from 'firebase-functions/v2/firestore'
import dotenv from 'dotenv'
dotenv.config()

const project = process.env.PROJECT_ID || 'skeet-example'
const region = process.env.REGION || 'europe-west6'
const serviceAccount = `${project}@${project}.iam.gserviceaccount.com`
const vpcConnector = `${project}-con`

export const firestoreDefaultOption = (document: string): DocumentOptions => ({
  document,
  region,
  cpu: 1,
  memory: '1GiB',
  maxInstances: 100,
  minInstances: 0,
  concurrency: 1,
  serviceAccount,
  ingressSettings: 'ALLOW_INTERNAL_ONLY',
  vpcConnector,
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY',
})
```

Firestore インスタンスの設定は、_routings/firestore/{firestoreInstance}_ に記述します。

_routings/firestore/firestoreExample.ts_

```ts
import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { firestoreDefaultOption } from '@/routings/options'

export const firestoreExample = onDocumentCreated(
  firestoreDefaultOption('User/{userId}'),
  (event) => {
    console.log('firestoreExample triggered')
    try {
      console.log(event.params)
    } catch (error) {
      const errorLog = `solanatransfer - ${error}`
      console.log(errorLog)
    }
  }
)
```

Firestore Trigger のタイプ

| イベントタイプ    | トリガー                                 |
| ----------------- | ---------------------------------------- |
| onDocumentCreated | ドキュメントが作成されたとき             |
| onDocumentDeleted | ドキュメントが削除されたとき             |
| onDocumentUpdated | ドキュメントが更新されたとき             |
| onDocumentWritten | ドキュメントが作成、更新、削除されたとき |

### Auth インスタンスの設定

Auth デフォルトオプション設定

_routings/options/auth/authOptions.ts_

```ts
import dotenv from 'dotenv'
import { RuntimeOptions } from 'firebase-functions/v1'
dotenv.config()

const project = process.env.PROJECT_ID || 'skeet-example'
const serviceAccount = `${project}@${project}.iam.gserviceaccount.com`
const vpcConnector = `${project}-con`

export const authDefaultOption: RuntimeOptions = {
  memory: '1GB',
  maxInstances: 100,
  minInstances: 0,
  timeoutSeconds: 300,
  serviceAccount,
  ingressSettings: 'ALLOW_INTERNAL_ONLY',
  vpcConnector,
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY',
}
```

Auth インスタンスのデフォルトファンクションでは、
Firebase ユーザーが作成されたときに、
ユーザーのドキュメントを作成します。

Auth インスタンスの設定は、_routings/auth/auth{MethoName}.ts_ に記述します。

_routings/auth/authOnCreateUser.ts_

```ts
import { User } from '@/models'
import { addCollectionItem } from '@skeet-framework/firestore'
import * as functions from 'firebase-functions/v1'
import { authDefaultOption } from '@/routings'

const region = process.env.REGION || 'asia-northeast1'

export const authOnCreateUser = functions
  .runWith(authDefaultOption)
  .region(region)
  .auth.user()
  .onCreate(async (user) => {
    try {
      const { uid, email, displayName, photoURL } = user
      const userParams = {
        uid,
        email: email || '',
        username: displayName || '',
        iconUrl: photoURL || '',
      }
      const userRef = await addCollectionItem<User>('User', userParams, uid)
      console.log({ status: 'success', userRef })
    } catch (error) {
      console.log(`error - ${String(error)}`)
    }
  })
```

### Dev 環境での Firebase ユーザー登録・ログイン

Dev 環境では、
Firebase ユーザーの登録・ログインに、
_skeet yarn dev:login_ コマンドを使用します。

```bash
$ skeet yarn dev:login
? Select Services to run yarn command (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter>
to proceed)
  = Services =
❯◯ openai
```

_openai_ ファンクションを選択して実行すると

```bash
i  functions: Beginning execution of "us-central1-authOnCreateUser"
>  {
>    status: 'success',
>    userRef: {
>      __type__: 'ref',
>      collection: { __type__: 'collection', path: 'User' },
>      id: '65N7Yl6rWzGASPrqhjC7wyhqUfpg'
>    }
>  }
```

Firebase ユーザー登録と Firestore ユーザー登録が完了します。

コンソールに表示される _accessToken_ をコピーして、
Dev 環境のログイン認証に使用します。

簡易的に _curl_ で POST リクエストを送信する場合、
以下のように環境設定に設定しておくと便利です。

```bash
export $ACCESS_TOKEN={your-access-token}
export $PROJECT_ID={your-project-id}
export $REGION={your-region}
```

## モデルの定義

モデルの定義は、
コレクションのツリー構造を

_src/models/{modelName}Models.ts_

に記述します。

型定義には [Typesaurus](https://typesaurus.com) を使用しています。

NoSQL データモデルは非常に柔軟であるため、
モデルの定義は必須ではありませんが、

それぞれのモデルに

- CollectionId
- DocumentId

をコメントで記述しておくことを推奨します。
可読性が上がり、

さらに CodePilot でのコード補完が効くようになります。

_models/userModels.ts_

```ts
import { Ref } from 'typesaurus'

// CollectionId: User
// DocumentId: uid
export type User = {
  uid: string
  username: string
  email: string
  iconUrl: string
  createdAt?: string
  updatedAt?: string
}

// CollectionId: UserChatRoom
// DocumentId: auto
export type UserChatRoom = {
  userRef: Ref<User>
  model: string
  maxTokens: number
  temperature: number
  stream: boolean
  createdAt?: string
  updatedAt?: string
}

// CollectionId: UserChatRoomMessage
// DocumentId: auto
export type UserChatRoomMessage = {
  userChatRoomRef: Ref<UserChatRoom>
  role: string
  content: string
  createdAt?: string
  updatedAt?: string
}
```

データの取得、更新、削除は、
_@skeet-framework/firestore_ プラグインを使用して行います。

```ts
import {
  addCollectionItem,
  getCollectionItem,
} from '@skeet-framework/firestore'
```

詳しくは、[Skeet Firestore](/ja/doc/plugins/skeet-firestore) を参照してください。

## Skeet CLI

Skeet CLI を使って新たに Cloud Functions for Firebase を追加したり、
yarn コマンドを 各ファンクションごとに実行することができます。

コマンド一覧

```bash
$ skeet --help
Usage: skeet [options] [command]

CLI for Skeet - Full-stack TypeScript Serverless framework

Options:
  -V, --version             output the version number
  -h, --help                display help for command

Commands:
  create <appName>          Create Skeet Framework App
  server|s                  Run Firebase Emulator for Skeet APP
  deploy                    Deploy Skeet APP to Firebase (GCP)
  init [options]            Initialize Google Cloud Setups for Skeet APP
  iam                       Skeet IAM Comannd to setup Google Cloud Platform
  yarn [options] <yarnCmd>  Skeet Yarn Comannd to run yarn command for multiple functions
  add                       Skeet Add Comannd to add new functions
  sync                      Skeet Sync Comannd to sync backend and frontend
  delete|d                  Skeet Delete Command
  list                      Show Skeet App List
  help [command]            display help for command
```

### Skeet Yarn Install/Build

```bash
$ skeet yarn install/build
? Select Services to run yarn command (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  = Services =
❯◯ openai
 ◯ solana
```

### Add Yarn Package

指定したパッケージを選択したファンクションにインストールします。
a を押すと全ての _functions_ を選択します。

```bash
$ skeet yarn add -p ${packageName}
? Select Services to run yarn command (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  = Services =
❯◯ openai
 ◯ solana
```

For Development

```bash
$ skeet yarn add -p ${packageName} -D
? Select Services to run yarn command (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  = Services =
❯◯ openai
 ◯ solana
```

### Skeet デプロイコマンド

```bash
$ skeet deploy
? Select Services to run yarn command (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  = Services =
❯◯ openai
 ◯ solana
```

![Skeet Deploy](https://storage.googleapis.com/skeet-assets/animation/skeet-deploy-compressed.gif)

### Skeet Add コマンド

```bash
Usage: skeet add [options] [command]

Skeet Add Comannd to add new functions

Options:
  -h, --help                 display help for command

Commands:
  functions <functionsName>
  method <methoName>
  help [command]             display help for command
```

### Cloud Functions の追加

新規に Cloud Functions を追加する場合は、
以下のコマンドを実行します。

```bash
$ skeet add functions <functionName>
```

すると、
以下のようなフォルダ構成が作成され、
最新のモデルの定義がコピーされます。

```bash
├── functions
│   ├── openai
│   └── <functionName>
```

### メソッドの追加

既存の Cloud Functions にメソッドを追加する場合は、
メソッド名を指定して以下のコマンドを実行し、インスタンスタイプを選択します。

```bash
$ skeet add method <methodName>
? Select Instance Type to add (Use arrow keys)
   = Instance Type =
❯ http
  firestore
  pubSub
  scheduler
  auth
```

メソッドを追加するするファンクションを選択します。

```bash
? Select Instance Type to add http
? Select Functions to add (Use arrow keys)
   = Functions =
❯ openai
  solana
? Select Instance Type to add http
? Select Functions to add solana
✔️ ./functions/solana/src/types/http/createUserParams.ts created!
✔️ ./functions/solana/src/routings/http/createUser.ts created!
```

新しいメソッドと型定義が作成されます。

### Skeet Sync コマンド

Skeet Sync コマンドは複数のパッケージ間での同期を行います。

```bash
$ skeet sync
Usage: skeet sync [options] [command]

Skeet Sync Comannd

Options:
  -h, --help      display help for command

Commands:
  models          Sync Models
  types           Sync Types
  routings        Sync Routings
  armors           Sync Cloud Armor Rules
  help [command]  display help for command
```

### Skeet Sync Models

最新のモデルの定義を他のバックエンドパッケージとフロントエンドのパッケージにコピーします。

```bash
$ skeet sync models
```

全てのバックエンドへの Http 通信の型定義をフロントエンドのパッケージにコピーします。

### Skeet Sync Types

```bash
$ skeet sync types
```

全てのバックエンドの Http インスタンスのルーティングを自動でロードバランサーに設定します。

### Skeet Sync Routings

```bash
$ skeet sync routings
```

_skeet-cloud.config.json_ に記述された Cloud Armor のルールを自動で設定します。

### Skeet Sync Armor

```bash
$ skeet sync armors
```
