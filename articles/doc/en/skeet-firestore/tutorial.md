---
id: tutorial
title: Tutorial - Firestore
description: This tutorial will create an OpenAI Chat App using Skeet Framework.
---

## Tutorial - Firestore

This tutorial uses the Skeet Framework to create a chat app. This is a comprehensive cloud application development tutorial including the programming language TypeScript, Firebase Firestore, and GitHub.

![https://storage.googleapis.com/skeet-assets/animation/skeet-chat-latest.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-chat-latest.gif)

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

- How to set environment variables
- Get a development login authentication key
- test API requests with skeet curl
- Check code for chat stream
- Isolate tasks using PubSub triggers
- Deploy to Firebase

## Tutorial prerequisites

If you haven't completed the [quick start](/en/doc/skeet-firestore/quickstart), please complete it first.

## Development environment

Skeet Framework recommends VScode as editor.
By proceeding with development according to the framework,
Get powerful code completion support with GitHub Copilot.

- [VScode](https://code.visualstudio.com/)
- [GitHub Copilot](https://copilot.github.com/)

Chatbot uses OpenAI's API.

- [OpenAI](https://openai.com/)

## How to set environment variables

Skeet Framework uses [Cloud Secret Manager](https://firebase.google.com/docs/functions/config-env?hl=en&gen=2nd) environment variables to manage sensitive information such as API keys.

using the _skeet add secret <secretKey>_ command

Set the OpenAI API key to an environment variable.

```bash
$ skeet add secret CHAT_GPT_ORG
? Enter value for CHAT_GPT_ORG: <yourOpenAIKey>
```

Set CHAT_GPT_KEY as well.

```bash
$ skeet add secret CHAT_GPT_KEY
? Enter value for CHAT_GPT_KEY: <yourOpenAIKey>
```

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


💃Let's try `$ skeet curl <MethodName>` to test request🕺

$ skeet curl createUserChatRoom
     or
$ skeet curl createUserChatRoom --data '{ "model": "gpt4", "maxTokens": 4200 }'
```

By setting the accessToken displayed in the console log to the environment variable,

You can send API requests using the _skeet curl_ command.

Acquiring login authentication keys and sending POST requests during development costs money.
In Skeet Framework, using the following two commands,
It's designed to help developers work more efficiently.

- skeet login
- skeet curl

If the login command succeeds,

Defined in _authOnCreateUser.ts_ by default

Auth instance trigger fired

User information is stored in Firebase Firestore.

_functions/skeet/routings/auth/authOnCreateUser.ts_

```typescript
import { User } from '@/models'
import { addCollectionItem } from '@skeet-framework/firestore'
import * as functions from 'firebase-functions/v1'
import { authPublicOption } from '@/routings'
import { gravatarIconUrl } from '@/utils/placeholder'
import skeetConfig from '../../../skeetOptions.json'
const region = skeetConfig.region

export const authOnCreateUser = functions
  .runWith(authPublicOption)
  .region(region)
  .auth.user()
  .onCreate(async (user) => {
    try {
      const { uid, email, displayName, photoURL } = user
      const userParams = {
        uid,
        email: email || '',
        username: displayName || email?.split('@')[0] || '',
        iconUrl:
          photoURL == '' || !photoURL
            ? gravatarIconUrl(email ?? 'info@skeet.dev')
            : photoURL,
      }
      const userRef = await addCollectionItem<User>('User', userParams, uid)
      console.log({ status: 'success', userRef })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  })
```

User information is

_await getUserAuth(req)_

to get it from Firebase.

```typescript
import { getUserAuth } from '@/lib'

const user: UserAuthType = await getUserAuth(req)
```

The default return type definition for _getUserAuth_ is:

```typescript
export type UserAuthType = {
  uid: string
  username: string
  email: string
  iconUrl: string
}
```

## test API requests with skeet curl

Let's send an API request using the _skeet curl_ command.

```bash
$ skeet curl createUserChatRoom
{
   "status" : "success",
   "userChatRoomMessageRef" : {
      "__type__" : "ref",
      "collection" : {
         "__type__" : "collection",
         "path" : "User/QIVG7UQUA2toIwCQOiXHqYh5sncE/UserChatRoom/l2WRsPH2RXobWD7mOJPP/UserChatRoomMessage"
      },
      "id" : "YS7wCHoztt1eEUHjvxhw"
   },
   "userChatRoomRef" : {
      "__type__" : "ref",
      "collection" : {
         "__type__" : "collection",
         "path" : "User/QIVG7UQUA2toIwCQOiXHqYh5sncE/UserChatRoom"
      },
      "id" : "l2WRsPH2RXobWD7mOJPP"
   }
}
```

UserChatRoom and UserChatRoomMessage are created.

## Check code for chat stream

The code for Skeet Functions is
located in the functions directory.

For Http triggers, they are located in the _routings/http_ directory.

```bash
$ tree functions
functions
├── skeet
│   ├── routings
│   │   ├── auth
│   │   │   └── authOnCreateUser.ts
│   │   ├── http
│   │   │   ├── addUserChatRoomMessage.ts
│   │   │   ├── addStreamUserChatRoomMessage.ts
│   │   │   ├── createUserChatRoom.ts
│   │   │   ├── getUserChatRoomMessages.ts
.
.
```

_addStreamUserChatRoomMessage_ is called from the frontend by default.

_functions/skeet/routings/http/addStreamUserChatRoomMessage.ts_

```typescript
import { onRequest } from 'firebase-functions/v2/https'
import { TypedRequestBody } from '@/index'
import { updateChildCollectionItem } from '@skeet-framework/firestore'
import { sleep } from '@/utils/time'
import {
  getUserAuth,
  generateChatRoomTitle,
  streamChat,
  CreateChatCompletionRequest,
} from '@/lib'
import { publicHttpOption } from '@/routings'
import { AddStreamUserChatRoomMessageParams } from '@/types/http/addStreamUserChatRoomMessageParams'
import { defineSecret } from 'firebase-functions/params'
import {
  User,
  UserChatRoom,
  userChatRoomCollectionName,
  userCollectionName,
  createUserChatRoomMessage,
  getMessages,
  getUserChatRoom,
} from '@/models'

const chatGptOrg = defineSecret('CHAT_GPT_ORG')
const chatGptKey = defineSecret('CHAT_GPT_KEY')

export const addStreamUserChatRoomMessage = onRequest(
  { ...publicHttpOption, secrets: [chatGptOrg, chatGptKey] },
  async (req: TypedRequestBody<AddStreamUserChatRoomMessageParams>, res) => {
    const organization = chatGptOrg.value()
    const apiKey = chatGptKey.value()

    try {
      if (!organization || !apiKey)
        throw new Error(
          `ChatGPT organization or apiKey is empty\nPlease run \`skeet add secret CHAT_GPT_ORG/CHAT_GPT_KEY\``
        )

      // Get Request Body
      const body = {
        userChatRoomId: req.body.userChatRoomId || '',
        content: req.body.content,
      }
      if (body.userChatRoomId === '') throw new Error('userChatRoomId is empty')

      // Get User Info from Firebase Auth
      const user = await getUserAuth(req)

      // Get UserChatRoom
      const userChatRoom = await getUserChatRoom(user.uid, body.userChatRoomId)
      if (userChatRoom.data.stream === false)
        throw new Error('stream must be true')

      // Add UserChatRoomMessage
      await createUserChatRoomMessage(userChatRoom.ref, user.uid, body.content)

      // Get UserChatRoomMessages for OpenAI Request
      const messages = await getMessages(user.uid, body.userChatRoomId)

      console.log('messages.length', messages.length)
      // Update UserChatRoom Title
      if (messages.length === 2) {
        const title = await generateChatRoomTitle(
          body.content,
          organization,
          apiKey
        )
        await updateChildCollectionItem<UserChatRoom, User>(
          userCollectionName,
          userChatRoomCollectionName,
          user.uid,
          body.userChatRoomId,
          { title }
        )
      }

      // Send Request to OpenAI
      const openAiBody: CreateChatCompletionRequest = {
        model: userChatRoom.data.model,
        max_tokens: userChatRoom.data.maxTokens,
        temperature: userChatRoom.data.temperature,
        n: 1,
        top_p: 1,
        stream: userChatRoom.data.stream,
        messages,
      }

      // Get OpenAI Stream
      const stream = await streamChat(
        openAiBody,
        chatGptOrg.value(),
        chatGptKey.value()
      )
      const messageResults: string[] = []
      let streamClosed = false
      res.once('error', () => (streamClosed = true))
      res.once('close', () => (streamClosed = true))
      stream.on('data', async (chunk: Buffer) => {
        const payloads = chunk.toString().split('\n\n')
        for await (const payload of payloads) {
          if (payload.includes('[DONE]')) return
          if (payload.startsWith('data:')) {
            const data = payload.replaceAll(/(\n)?^data:\s*/g, '')
            try {
              const delta = JSON.parse(data.trim())
              const message = delta.choices[0].delta?.content
              if (message == undefined) continue

              console.log(message)
              messageResults.push(message)

              while (!streamClosed && res.writableLength > 0) {
                await sleep(10)
              }

              // Send Message to Client
              res.write(JSON.stringify({ text: message }))
            } catch (error) {
              console.log(`Error with JSON.parse and ${payload}.\n${error}`)
            }
          }
        }
        if (streamClosed) res.end('Stream disconnected')
      })

      // Stream End
      stream.on('end', async () => {
        const message = messageResults.join('')
        const lastMessage = await createUserChatRoomMessage(
          userChatRoom.ref,
          user.uid,
          message,
          'assistant'
        )
        console.log(`Stream end - messageId: ${lastMessage.id}`)
        res.end('Stream done')
      })
      stream.on('error', (e: Error) => console.error(e))
    } catch (error) {
      res.status(500).json({ status: 'error', message: String(error) })
    }
  }
)
```

Let's call this function with the ChatRoomID from earlier.
Here we use the _--raw_ option to display the chunk data.

```bash
$ skeet curl addStreamUserChatRoomMessage --data '{ "userChatRoomId": "l2WRsPH2RXobWD7mOJPP", "content": "Do some freestlye rap." }' --raw
{ "text" : "streaming-data" }
```

You can see that the stream data is displayed.

You can also use the _skeet get https_ command to check the endpoint.

```bash
$ skeet get https
┌──────────┬──────────────────────────────┬─────────────────────────────────────────────────────────────────────────┐
│ Function │ Endpoint                     │ ParamsPath                                                              │
├──────────┼──────────────────────────────┼─────────────────────────────────────────────────────────────────────────┤
│ skeet   │ addStreamUserChatRoomMessage │ ./functions/skeet/src/types/http/addStreamUserChatRoomMessageParams.ts │
├──────────┼──────────────────────────────┼─────────────────────────────────────────────────────────────────────────┤
│ skeet   │ addUserChatRoomMessage       │ ./functions/skeet/src/types/http/addUserChatRoomMessageParams.ts       │
├──────────┼──────────────────────────────┼─────────────────────────────────────────────────────────────────────────┤
│ skeet   │ createUserChatRoom           │ ./functions/skeet/src/types/http/createUserChatRoomParams.ts           │
├──────────┼──────────────────────────────┼─────────────────────────────────────────────────────────────────────────┤
│ skeet   │ getUserChatRoomMessages      │ ./functions/skeet/src/types/http/getUserChatRoomMessagesParams.ts      │
├──────────┼──────────────────────────────┼─────────────────────────────────────────────────────────────────────────┤
│ skeet   │ root                         │ ./functions/skeet/src/types/http/rootParams.ts                         │
└──────────┴──────────────────────────────┴─────────────────────────────────────────────────────────────────────────┘
```

## Isolate tasks using PubSub triggers

Then _addStreamUserChatRoomMessage_ contains

Let's isolate the process of updating the chat room title using a PubSub trigger.

```typescript
// Update chat room title
if (messages.length === 2) {
  const title = await generateChatRoomTitle(body.content, organization, apiKey)
  await updateChildCollectionItem<UserChatRoom, User>(
    userCollectionName,
    userChatRoomCollectionName,
    user.uid,
    body.userChatRoomId,
    { title }
  )
}
```

First, add a PubSub trigger.

Run _skeet add method_ and enter the instance type and function name.

```bash
$ skeet add method generateTitle
? Select Instance Type to add (Use arrow keys)
   = Instance Type =
  http
  firestore
 ❯ pubsub
  scheduler
  auth
? Select Functions to add skeet
✔️ ./functions/skeet/src/types/http/pubsubGenerateTitleParams.ts created 🎉
✔️ ./functions/skeet/src/routings/http/pubsubGenerateTitle.ts created 🎉
```

A type definition file and a function file are created.

_functions/skeet/src/routings/pubsub/pubsubGenerateTitle.ts_

```typescript
import { onMessagePublished } from 'firebase-functions/v2/pubsub'
import { pubsubDefaultOption } from '@/routings/options'
import { PubsubGenerateTitleParams } from '@/types/pubsub/pubsubGenerateTitleParams'

export const pubsubGenerateTitle = onRequest(
  publicHttpOption,
  async (req: TypedRequestBody<PubsubGenerateTitleParams>, res) => {
    try {
      const pubsubObject = parsePubSubMessage<PubsubGenerateTitleParams>(event)
      console.log({
        status: 'success',
        topic: pubsubTopicGenerateTitle,
        event,
        title,
      })
    } catch (error) {
      console.error({ status: 'error', message: String(error) })
    }
  }
)
```

_functions/skeet/src/types/http/pubsubGenerateTitleParams.ts_

```typescript
export type PubsubGenerateTitleParams = {
  name?: string
}
```

Implement the contents of the previous function.

_functions/skeet/src/routings/http/pubsubGenerateTitle.ts_

```typescript
import { onMessagePublished } from 'firebase-functions/v2/pubsub'
import { pubsubDefaultOption } from '@/routings/options'
import { parsePubSubMessage } from '@/lib/pubsub'
import { PubsubGenerateTitleParams } from '@/types/pubsub/pubsubGenerateTitleParams'
import { generateChatRoomTitle } from '@/lib/openai/generateChatRoomTitle'
import { updateChildCollectionItem } from '@skeet-framework/firestore'
import { User, UserChatRoom } from '@/models'

// define environment variables
import { defineSecret } from 'firebase-functions/params'
const chatGptOrg = defineSecret('CHAT_GPT_ORG')
const chatGptKey = defineSecret('CHAT_GPT_KEY')

export const pubsubTopicGenerateTitle = 'pubsubGenerateTitle'

export const pubsubGenerateTitle = onMessagePublished(
  // get API key from environment variable
  {
    ...pubsubDefaultOption(pubsubTopicGenerateTitle),
    secrets: [chatGptOrg, chatGptKey],
  },
  async (event) => {
    try {
      // Parse PubSub message
      const pubsubObject = parsePubSubMessage<PubsubGenerateTitleParams>(event)

      if (!pubsubObject) throw new Error('pubsubObject is undefined')

      // Call OpenAI API to generate title
      const title = await generateChatRoomTitle(
        pubsubObject.content,
        chatGptOrg,
        chatGptKey
      )

      // Update chat room title
      await updateChildCollectionItem<UserChatRoom, User>(
        'User',
        'UserChatRoom',
        pubsubObject.userId,
        pubsubObject.userChatRoomId,
        { title }
      )

      // output log
      console.log({
        status: 'success',
        topic: pubsubTopicGenerateTitle,
        event,
        title,
      })
    } catch (error) {
      console.error({ status: 'error', message: String(error) })
    }
  }
)
```

Define the previous type.

_functions/skeet/src/types/http/pubsubGenerateTitleParams.ts_

```typescript
export type PubsubGenerateTitleParams = {
  content: string
  userId: string
  userChatRoomId: string
}
```

Now add PubSub Publish to _addStreamUserChatRoomMessage_ from earlier.

```typescript
.
.
if (messages.length === 2) {
  // define PubSub message body
  const pubsubMessageBody: PubsubGenerateTitleParams = {
    userId: user.uid,
    userChatRoomId: body.userChatRoomId,
    content: body.content,
  }

  // send message to PubSub topic
  await pubsubPublish(pubsubTopicGenerateTitle, pubsubMessageBody)
}
.
.
```

Now add a new function to _functions/skeet/src/index.ts_.

```typescript
import admin from 'firebase-admin'
import dotenv from 'dotenv'
import { Request } from 'firebase-functions/v2/https'

export interface TypedRequestBody<T> extends Request {
  body: T
}

dotenv.config()
admin.initializeApp()

export {
  root,
  authOnCreateUser,
  createUserChatRoom,
  getUserChatRoomMessages,
  addUserChatRoomMessage,
  addStreamUserChatRoomMessage,
  pubsubGenerateTitle,
} from '@/routings'
```

Now you can use PubSub triggers to isolate tasks.
Now let's test it.

Restart your local server.

**⚠️ Rebooting resets the data in the Firebase emulator. ⚠️**

Please log in and set the access token again.

```bash
$ skeet s
```

Create a UserChatRoom again and get the ID of the UserChatRoom.

```bash
$ skeet curl createUserChatRoom
{
   "status" : "success",
   "userChatRoomMessageRef" : {
      "__type__" : "ref",
      "collection" : {
         "__type__" : "collection",
         "path" : "User/j3JAchzRc3xOiJybFlSlohYmvTQj/UserChatRoom/yJ5yl7L1nEV71xLRRFzY/UserChatRoomMessage"
      },
      "id" : "zb7fecsm7bf34u549UeL"
   },
   "userChatRoomRef" : {
      "__type__" : "ref",
      "collection" : {
         "__type__" : "collection",
         "path" : "User/j3JAchzRc3xOiJybFlSlohYmvTQj/UserChatRoom"
      },
      "id" : "yJ5yl7L1nEV71xLRRFzY"
   }
}
```

Let's create UserChatRoomMessage

```bash
$ skeet curl addStreamUserChatRoomMessage --data '{ "userChatRoomId": "yJ5yl7L1nEV71xLRRFzY", "content": "Do some freestlye rap." }' --raw
```

Creating a UserChatRoomMessage will send the message to the PubSub topic and fire the PubSub trigger.

```bash
>  Stream done
>  {
>    status: 'success',
>    topic: 'pubsubGenerateTitle',
>    event: {
>      specversion: '1.0',
>      id: '5faee10f-ff64-4f8d-85bc-c85c22fca702',
>      time: '1970-01-01T00:00:00.883Z',
>      type: 'google.cloud.pubsub.topic.v1.messagePublished',
>      source: '//pubsub.googleapis.com/projects/skeet-demo/topics/pubsubGenerateTitle',
>      data: {
>        message: [aue],
>        subscription: 'projects/skeet-demo/subscriptions/emulator-sub-pubsubGenerateTitle'
>      }
>    },
>    title: 'Freestyle Rap'
>  }
```

Successfully the task is separated 🎉

## Deploy to Firebase

If you are deploying for the first time, use the _skeet init_ command,
Make the necessary settings for your project.

Deploy without setting the domain here.

Make sure you have created Firestore and FirebaseAuth from the links provided in the console.

```bash
$ skeet init
? What's your GCP Project ID skeet-demo
? Select Regions to deploy
  europe-west1
  europe-west2
  europe-west3
❯ europe-west6
  northamerica-northeast1
  southamerica-east1
  us-central1
⚠️ Please make sure if you create Firestore & FirebaseAuth ⚠️

Click the link to check 👇
Firestore: https://console.firebase.google.com/project/skeet-demo/firestore
FirebaseAuth: https://console.firebase.google.com/project/skeet-demo/authentication

📗 Doc: https://skeet.dev/doc/backend/initial-deploy/

? Are you sure if you already set them up? yes
? Do you want to setup your domain? no
Function URL (skeet:root(europe-west6)): https://root-iolvuu5bzq-oa.a.run.app
i  functions: cleaning up build files...

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/skeet-demo/overvie
```

You have successfully deployed to Firebase Functions.

## Type definition synchronization

Skeet Framework allows you to synchronize type definitions to the front end.

```bash
$ skeet sync types
⏳ Syncing skeet...
📃 Copying functions/skeet/src/types/http/addUserChatRoomMessageParams.ts to src/types/http/skeet/addUserChatRoomMessageParams.ts
✔️ File copied: src/types/http/skeet/addUserChatRoomMessageParams.ts
📃 Copying functions/skeet/src/types/http/createUserChatRoomParams.ts to src/types/http/skeet/createUserChatRoomParams.ts
✔️ File copied: src/types/http/skeet/createUserChatRoomParams.ts
📃 Copying functions/skeet/src/types/http/getUserChatRoomParams.ts to src/types/http/skeet/getUserChatRoomParams.ts
✔️ File copied: src/types/http/skeet/getUserChatRoomParams.ts
```

This command copies the type definitions in _src/types/http_ on the backend to _src/types/http/{FunctionsName}_ on the frontend.

## Sync Models

```bash
$ skeet sync models
  skeet
? Select Original Copy of Model skeet
latestModel: skeet
Syncing skeet...
Copying functions/skeet/src/models/index.ts to src/types/models/index.ts
✔️ File copied: src/types/models/index.ts
Copying functions/skeet/src/models/userModels.ts to src/types/models/userModels.ts
✔️ File copied: src/types/models/userModels.ts
Synced Models Types 🎉
```

This command copies the model from _src/models_ on the backend to _src/types/models_ on the frontend.
Also, if you have multiple functions, select the latest model and copy it to the model of the other functions.

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

**⚠️ [Initial deployment](/en/doc/skeet-firestore/initial-deploy) must be completed. ⚠️**

## Deploy with Skeet CLI

```bash
$ skeet deploy
? Select Services to run functions command (Press <space> to select, <a> to toggle all, <i> to invert
selection, and <enter> to proceed)
  = Services =
❯◯ skeet
 ◯ graphql
```

Select the _functions_ to deploy,
Deploy only selected _functions_.
Press a to select all _functions_.

Skeet Framework is now deployed 🎉
Now all you have to do is implement your idea 🎉
