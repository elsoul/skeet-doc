---
id: basic-architecture
title: Basic Architecture
description: Describes the basic tree structure and usage of the Skeet Framework backend.
---

The basic structure of the Skeet Framework backend is as follows.

| Features required for common backends | Skeet Framework            |
| ------------------------------------- | -------------------------- |
| Database                              | Firestore                  |
| Login Authentication                  | Firebase Authentication    |
| API Server                            | Firebase Functions 2nd Gen |
| Load Balancer                         | Cloud Load Balancer        |
| Schedule Tasks                        | Cloud Scheduler            |
| Pub/Sub                               | Cloud Pub/Sub              |
| Domains                               | Cloud DNS                  |
| Security                              | Cloud Armor                |

- Support for Firestore type definitions from [Typesaurus](https://typesaurus.com)
- Support CI/CD with [GitHub Actions](https://github.com/features/actions)
- Supports local development with [Firebase Emulator](https://firebase.google.com/docs/emulator-suite)
- Supports type-safe development with [TypeScript](https://www.typescriptlang.org/)

## Basic Structure of Skeet Framework

Since the Skeet Framework backend is serverless,
You can start writing from functions right away.

_src_ will contain the frontend source code.

The firebase functions project will be placed under the _functions_ directory.

You can add multiple functions to functions.

```bash
├── src
│   ├── public
│   └── types
├── functions
│   ├── openai
│   └── solana
├── package.json
├── skeet-cloud.config.json
└── firebase.json
```

| Directory               | Description                        |
| ----------------------- | ---------------------------------- |
| src                     | Frontend source code               |
| src/public              | Frontend source code               |
| src/types               | Frontend type definitions          |
| functions               | Firebase Functions source code     |
| functions/openai        | functions related to OpenAI API    |
| functions/solana        | functions related to Solana Web3js |
| package.json            | Backend package management         |
| skeet-cloud.config.json | Skeet Framework configuration file |
| firebase.json           | Firebase の設定ファイル            |

## Basic Structure of Skeet Functions

Skeet Functions are based on Firebase Functions.
The firebase functions project will be placed under the _functions_ directory.
You can add multiple functions to functions.

e.g. _functions/openai_

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

| Directory     | Description                |
| ------------- | -------------------------- |
| build.ts      | build script               |
| devBuild.ts   | build script               |
| dist          | Source code after build    |
| nodemon.json  | Local launch configuration |
| package.json  | Backend package management |
| src           | source code                |
| src/index.ts  | entry point                |
| src/lib       | Libraries                  |
| src/models    | models                     |
| src/routings  | routings                   |
| src/scripts   | scripts                    |
| src/types     | type definitions           |
| src/utils     | Utilities                  |
| tsconfig.json | TypeScript configuration   |
| yarn.lock     | Package lock file          |

## Instance types for Skeet Functions

| Instance type | Description                                                                                   |
| ------------- | --------------------------------------------------------------------------------------------- |
| Http          | Function that receives HTTP requests                                                          |
| PubSub        | function that receives PubSub messages                                                        |
| Scheduler     | Scheduled Functions                                                                           |
| Firestore     | Functions that receive triggers for creating, updating, deleting, etc. documents in Firestore |
| Auth          | Functions that receive triggers for creating, deleting, etc. users in Firebase Auth           |

## Basic Structure of Skeet Routings

Routing settings differ depending on the instance type.
Also, Firebase Functions option settings are located under routings/options.

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

### Http Instance Settings

Http Default Option

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

Define Http Instance Settings _routings/http/{httpInstance}.ts_

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

Define Http Instance Type _src/types/http/{httpInstance}Params.ts_

_types/http/rootParams.ts_

```ts
export type RootParams = {
  name?: string
}
```

### PubSub Instance Settings

PubSub Default Option

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

Define PubSub Instance Settings _routings/pubsub/{pubsubInstance}.ts_

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

Define PubSub Instance Types _src/types/pubsub/{pubsubInstance}Params.ts_

_types/pubsub/pubsubExampleParams.ts_

```ts
export type PubsubExampleParams = {
  message?: string
}
```

### Scheduler Instance Settings

Scheduler Default Option

_routings/options/scheduler/schedulerOptions.ts_

```ts
import { ScheduleOptions } from 'firebase-functions/v2/scheduler'
import dotenv from 'dotenv'
dotenv.config()

const project = process.env.PROJECT_ID || 'skeet-chat'
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

Define Scheduler Instance Settings*routings/scheduler/{schedulerInstance}.ts*

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

### Firestore Instance Settings1

Firestore Default Option

_routings/options/firestore/firestoreOptions.ts_

```ts
import { DocumentOptions } from 'firebase-functions/v2/firestore'
import dotenv from 'dotenv'
dotenv.config()

const project = process.env.PROJECT_ID || 'skeet-chat'
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

Define Firestore Instance Settings in _routings/firestore/{firestoreInstance}_

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

Cloud Firestore function triggers

| Event Type        | Trigger                                                                                |
| ----------------- | -------------------------------------------------------------------------------------- |
| onDocumentCreated | Triggered when a document is written to for the first time.                            |
| onDocumentDeleted | Triggered when a document already exists and has any value changed.                    |
| onDocumentUpdated | Triggered when a document is deleted.                                                  |
| onDocumentWritten | Triggered when onDocumentCreated, onDocumentUpdated or onDocumentDeleted is triggered. |

### Configure Auth instance

In the Auth instance's default function,
When a Firebase user is created,
Create user documentation.

Auth instance settings are described in _routings/auth/auth{MethoName}.ts_.

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

### Firebase user registration/login in Dev environment

In the Dev environment,
For Firebase user registration and login,
Use the _skeet yarn dev:login_ command.

```bash
$ skeet yarn dev:login
? Select Services to run yarn command (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter>
to proceed)
  = Services =
❯◯ openai
```

Select _openai_ and press enter.

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

Firebase user registration and Firestore user registration are completed.

Copy the _accessToken_ displayed in the console,
Used for dev environment login authentication.

If you simply send a POST request with _curl_,
It is convenient to set the environment settings as follows.

```bash
export $ACCESS_TOKEN={your-access-token}
export $PROJECT_ID={your-project-id}
export $REGION={your-region}
```

## Model definition

Define Models

_src/models/{modelName}Models.ts_

- [Typesaurus](https://typesaurus.com) for type definitions.

The NoSQL data model is so flexible that
Model definition is not required, but

for each model

- CollectionId
- DocumentId

is recommended to be described as a comment.
Increased readability,

In addition, code completion in CodePilot will work.

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

To Add/Get/Query/Remove Data,

install

_@skeet-framework/firestore_

```ts
import {
  addCollectionItem,
  getCollectionItem,
} from '@skeet-framework/firestore'
```

- [@skeet-framework/firestore](/en/doc/backend/skeet-firestore)

## Skeet CLI

Skeet CLI is a command line tool for Skeet Framework.

Command List

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
  deploy                    Deploy Skeet APP to Firebase Cloud Functions
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

Select Functions to run yarn command
Press a key to toggle all functions

```bash
$ skeet yarn install/build
? Select Services to run yarn command (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  = Services =
❯◯ openai
 ◯ solana
```

### Add Yarn Package

Select Functions to add yarn package
Press a key to toggle all functions

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

### Skeet Deploy Comannd

Select Functions to add yarn package
Press a key to toggle all functions

```bash
$ skeet deploy
? Select Services to run yarn command (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  = Services =
❯◯ openai
 ◯ solana
```

![Skeet Deploy](https://storage.googleapis.com/skeet-assets/animation/skeet-deploy-compressed.gif)

### Add Cloud Functions

Run the following command to add a function.

```bash
$ skeet add functions <functionName>
```

new function will be created in the following directory.

```bash
├── functions
│   ├── openai
│   └── <functionName>
```

### Skeet Sync Command

Skeet Sync Command is a command to sync the latest model definitions to other backend packages and frontend packages.

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

Copy the latest model definitions to the backend packages and frontend packages.

```bash
$ skeet sync models
```

Copy the types of the HTTP Instances to frontend packages.

### Skeet Sync Types

```bash
$ skeet sync types
```

Create routings for the HTTP Instances.

### Skeet Sync Routings

```bash
$ skeet sync routings
```

_skeet-cloud.config.json_ is a file that defines the rules for accessing the Cloud Functions.

### Skeet Sync Armor

```bash
$ skeet sync armors
```
