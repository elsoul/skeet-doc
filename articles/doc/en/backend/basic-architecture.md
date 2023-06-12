---
id: basic-architecture
title: Basic Architecture
description: Describes the basic structure of the Skeet framework. Each directory of the application and each command of CLI are explained.
---

The basic structure of the Skeet Framework backend is as follows.

| Features required for common backends | Skeet Framework                      |
| ------------------------------------- | ------------------------------------ |
| Database                              | Firestore                            |
| Login Authentication                  | Firebase Authentication              |
| API                                   | Cloud Functions for Firebase 2nd Gen |
| Load Balancer                         | Cloud Load Balancer                  |
| Schedule Tasks                        | Cloud Scheduler                      |
| Pub/Sub                               | Cloud Pub/Sub                        |
| Domains                               | Cloud DNS                            |
| Security                              | Cloud Armor                          |

- Support for Firestore type definitions from [Typesaurus](https://typesaurus.com)
- Support CI/CD with [GitHub Actions](https://github.com/features/actions)
- Supports local development with [Firebase Emulator](https://firebase.google.com/docs/emulator-suite)
- Supports type-safe development with [TypeScript](https://www.typescriptlang.org/)

## Basic Structure of Skeet Framework

Since the Skeet Framework backend is serverless,
You can start writing from functions right away.

_src_ will contain the frontend source code.

The Cloud Functions for Firebase project will be placed under the _functions_ directory.

You can add multiple functions to functions.

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

| Directory               | Description                              |
| ----------------------- | ---------------------------------------- |
| src                     | Frontend source code                     |
| src/public              | Frontend source code                     |
| src/types               | Frontend type definitions                |
| functions               | Cloud Functions for Firebase source code |
| functions/openai        | functions related to OpenAI API          |
| package.json            | Backend package management               |
| skeet-cloud.config.json | Skeet Framework configuration file       |
| firebase.json           | Firebase Settings                        |

## Basic Structure of Skeet Functions

Skeet Functions are based on Cloud Functions for Firebase.
The Cloud Functions for Firebase project will be placed under the _functions_ directory.
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
Also, Cloud Functions for Firebase option settings are located under routings/options.

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
      res.status(500).json({ message: 'root error!' })
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
      console.log({ status: 'success', topic: TOPIC_NAME, event })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
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
      console.log({ status: 'success', topic: TOPIC_NAME, event })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
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
      console.log({ status: 'error', message: String(error) })
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

Auth Default Option

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
      console.log({ status: 'error', message: String(error) })
    }
  })
```

### Firebase user registration/login in Dev environment

In the Dev environment,
For Firebase user registration and login,
Use the _skeet login_ command.

Run Skeet App in Dev environment

```bash
$ skeet s
```

Open a new terminal and run the _skeet login_ command.

```bash
$ skeet login
```

![画像](https://storage.googleapis.com/skeet-assets/animation/skeet-login-compressed.gif)

Firebase user registration and Firestore user registration are completed.

_ACCESS_TOKEN_ is stored in the local environment variable.

Now you can use _skeet curl_ to call the Cloud Functions endpoint.

```bash
$ skeet help curl
Usage: skeet curl [options] <methodName>

Skeet Curl Command - Call Cloud Functions Endpoint for Dev

Arguments:
  methodName                  Method Name - e.g. skeet curl createUserChatRoom

Options:
  -d,--data [data]            JSON Request Body - e.g. '{ "model": "gpt4", "maxTokens": 420 }'
  --production                For Production (default: false)
  -f,--functions [functions]  For Production Functions Name (default: false)
  -h, --help                  display help for command
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

- [@skeet-framework/firestore](/en/doc/plugins/skeet-firestore)

## Skeet CLI

Skeet CLI is a command line tool for Skeet Framework.

Command List

```bash
$ skeet --help
Usage: skeet [options] [command]

CLI for Skeet - Full-stack TypeScript Serverless framework

Options:
  -V, --version                output the version number
  -h, --help                   display help for command

Commands:
  create <appName>             Create Skeet Framework App
  server|s                     Run Firebase Emulator for Skeet APP
  deploy                       Deploy Skeet APP to Firebase Cloud Functions
  init [options]               Initialize Google Cloud Setups for Skeet APP
  iam                          Skeet IAM Comannd to setup Google Cloud Platform
  yarn [options] <yarnCmd>     Skeet Yarn Comannd to run yarn command for multiple functions
  add                          Skeet Add Comannd to add new functions
  sync                         Skeet Sync Comannd to sync backend and frontend
  delete|d                     Skeet Delete Command
  login [options]              Skeet Login Command - Create Firebase Login Token
  list                         Show Skeet App List
  curl [options] <methodName>  Skeet Curl Command - Call Cloud Functions Endpoint for Dev
  help [command]               display help for command
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

### Skeet Add Command

```bash
Usage: skeet add [options] [command]

Skeet Add Comannd to add new functions

Options:
  -h, --help                 display help for command

Commands:
  functions <functionsName>
  method <methodName>
  model <modelName>
  help [command]             display help for command
```

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

### Add Method

If you want to add a method to an existing Cloud Functions,
run the following command and select the instance type.

```bash
$ skeet add help method
Usage: skeet add method [options] <methodName>

Arguments:
  methodName  Method Name - e.g. addStreamUserChat

Options:
  -h, --help  display help for command
```

e.g http method name - _createArticle_

```bash
$ skeet add method createArticle
? Select Instance Type to add (Use arrow keys)
   = Instance Type =
❯ http
  firestore
  pubSub
  scheduler
  auth
```

Select the function to add the method to.

```bash
$ skeet add method createArticle
? Select Instance Type to add (Use arrow keys)
   = Instance Type =
❯ http
  firestore
  pubSub
  scheduler
  auth
```

Next, select the function to add the method to.

```bash
? Select Instance Type to add http
? Select Functions to add (Use arrow keys)
   = Functions =
❯ openai
  solana
? Select Instance Type to add http
? Select Functions to add solana
✔️ ./functions/openai/src/types/http/createArticleParams.ts created!
✔️ ./functions/openai/src/routings/http/createArticle.ts created!
```

New method and type definitions will be created.

### Skeet Sync Command

Skeet Sync Command is a command to sync the latest model definitions to other backend packages and frontend packages.

```bash
$ skeet sync
Usage: skeet sync [options] [command]

Skeet Sync Comannd to sync backend and frontend

Options:
  -h, --help       display help for command

Commands:
  models           Skeet Sync Models
  types            Skeet Sync Types
  routings         Skeet Sync Routings
  armors           Skeet Sync Cloud Armor Rules
  firebase:config  Export Firebase Config File to `./lib/firebaseConfig.ts`
  help [command]   display help for command
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

### Skeet Sync Firebase Config

_lib/firebaseConfig.ts_ will be generated by running the following command.

```bash
$ skeet sync firebase:config
```

### Skeet Curl Command

_skeet curl_ is a command to call the Cloud Functions endpoint.

** Please run _skeet login_ command to set _ACCESS_TOKEN_ in your env for Authorization **

```bash
$ skeet help curl
Usage: skeet curl [options] <methodName>

Skeet Curl Command - Call Cloud Functions Endpoint for Dev

Arguments:
  methodName                  Method Name - e.g. skeet curl createUserChatRoom

Options:
  -d,--data [data]            JSON Request Body - e.g. '{ "model": "gpt4", "maxTokens": 420 }'
  --production                For Production (default: false)
  -f,--functions [functions]  For Production Functions Name (default: false)
  -h, --help                  display help for command
```

### Skeet Login Command

Login to Firebase and set _ACCESS_TOKEN_ in your env for Authorization

** run _skeet s_ in a new terminal before _skeet login_ **

```bash
$ skeet help login
Usage: skeet login [options]

Skeet Login Command - Create Firebase Login Token

Options:
  --production           For Production (default: false)
  --email [email]        Login Email (default: "")
  --password [password]  Login Password (default: "")
  -h, --help             display help for command
```
