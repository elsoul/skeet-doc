---
id: tutorial
title: Tutorial
description: This tutorial will create a OpenAI API chat app using Skeet Framework.
---

## Tutorial

This tutorial uses the Skeet Framework to create a chat app.
This is a comprehensive cloud application development tutorial including the programming language TypeScript, Firebase Firestore, and GitHub.

This tutorial creates a basic chatbot app. **You may be tempted to skip this because you don't want to build a chatbot, but please read it.** The techniques you learn in this tutorial are fundamental to any Skeet Framework app, and mastering them will give you a deep understanding of Skeet.

In this chapter, we will create a chatbot using OpenAI's API.

- [OpenAI API](https://beta.openai.com/docs/api-reference/introduction)

Skeet Framework recommends VScode as editor.
We will be using VScode for this tutorial.

By proceeding with development according to the framework,
Get powerful code completion support with GitHub Copilot.

- [VScode](https://code.visualstudio.com/)
- [GitHub Copilot](https://copilot.github.com/)

## Tutorial prerequisites

To follow along with this tutorial, you need:

- [Node.js](https://nodejs.org/ja/) ^18.16.0
- [Yarn](https://yarnpkg.com/) ^1.22.19
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) ^430.0.0
- [Firebase CLI](https://firebase.google.com/docs/cli) ^12.0.1
- [GitHub CLI](https://cli.github.com/) ^2.29.0

Also, if the [initial deployment](/en/doc/backend/initial-deploy) has not been completed,

Please complete the following steps.

- Create a Google Cloud project
- Create a Firebase project
- Firebase Config settings

## User Authentication/Login function

Run Firebase Emulator

```bash
$ skeet s
```

Execute the following command in a separate window.

```bash
$ skeet yarn dev:login
  },
  accessToken: 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJlbWFpbCI6ImVsc291bC1sYWJvQGV4YW1wbGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJhdXRoX3RpbWUiOjE2ODQ1MTM3ODAsInVzZXJfaWQiOiI1V2NBNHo1bDd4WVk0ZWZnQ2tsVG5leThqREQ1IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJlbHNvdWwtbGFib0BleGFtcGxlLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn0sImlhdCI6MTY4NDUxMzc4MCwiZXhwIjoxNjg0NTE3MzgwLCJhdWQiOiJlcGljcy1iZXRhIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2VwaWNzLWJldGEiLCJzdWIiOiI1V2NBNHo1bDd4WVk0ZWZnQ2tsVG5leThqREQ1In0.',
  displayName: null,
  email: 'elsoul-labo@example.com',
  emailVerified: false,
  phoneNumber: null,
  photoURL: null,
  isAnonymous: false,
  tenantId: null,
  providerData: [
    {
      providerId: 'password',
      uid: 'elsoul-labo@example.com',
      displayName: null,
      email: 'elsoul-labo@example.com',
      phoneNumber: null,
      photoURL: null
    }
  ],
  metadata: UserMetadata {
    createdAt: '1684513780143',
    lastLoginAt: '1684513780154',
    lastSignInTime: 'Fri, 19 May 2023 16:29:40 GMT',
    creationTime: 'Fri, 19 May 2023 16:29:40 GMT'
  }
}
Created User: {"uid":"5WcA4z5l7xYY4efgCklTney8jDD5","username":"","email":"elsoul-labo@example.com","iconUrl":""}
✨  Done in 1.05s.
```

A Firebase user is created and

Defined in _functions/openai/routings/auth/authCreateUser.ts_
The Auth instance triggers and
User information is stored in Firebase Firestore.

```typescript
import { User } from '@/models'
import { addCollectionItem } from '@skeet-framework/firestore'
import { auth } from 'firebase-functions/v1'

export const authOnCreateUser = auth.user().onCreate(async (user) => {
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
    console.log(`authOnCreateUser - ${String(error)}`)
  }
})
```

Since the accessToken is displayed in the console,
Use this accessToken to authenticate the user.

Get user information from Firebase with _await getUserAuth(req)_

```typescript
import { getUserAuth } from '@/lib'

const user = await getUserAuth(req)
```

The type definition of the return value of _getUserAuth_ is as follows.

```typescript
export type UserAuthType = {
  uid: string
  username: string
  email: string
  iconUrl: string
}
```

## User model

This chapter uses a User model created using the _skeet create_ command.

- [Basic architecture - model definition](/en/doc/backend/basic-architecture#model definition)

## Create a UserChatRoom

Next, add code to create a UserChatRoom to the previous code.

Register the following information required for the OpenAI API in _UserChatRoom_.

- model (gpt-3.5-turbo)
- maxTokens (256)
- temperature (0)
- stream (false)

See the OpenAI API documentation for details.

- [OpenAI API](https://beta.openai.com/docs/api-reference/introduction)

_functions/openai/src/routings/http/createUserChatRoom.ts_

```typescript
import { onRequest } from 'firebase-functions/v2/https'
import { User, UserChatRoom, UserChatRoomMessage } from '@/models'
import {
  addCollectionItem,
  addChildCollectionItem,
  addGrandChildCollectionItem,
} from '@skeet-framework/firestore'
import { TypedRequestBody } from '@/index'
import { defaultHttpOption } from '@/routings/options'
import { CreateUserChatRoomParams } from '@/types/http/createUserChatRoomParams'
import { getUserAuth } from '@/lib/getUserAuth'

export const createUserChatRoom = onRequest(
  defaultHttpOption,
  async (req, res) => {
    try {
      // OpenAI Requet Body
      const body = {
        model: req.body.model || 'gpt-3.5-turbo',
        systemContent:
          req.body.systemContent ||
          'This is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.',
        maxTokens: req.body.maxTokens || 256,
        temperature: req.body.temperature || 1,
        stream: req.body.stream || false,
      }

      // User Authentification
      const user = await getUserAuth(req)

      // Define Collection Names
      const parentCollectionName = 'User'
      const childCollectionName = 'UserChatRoom'

      // Retrive User Data from Firestore
      const userDoc = await getCollectionItem<User>(
        parentCollectionName,
        user.uid
      )
      const parentId = user.uid || ''
      const params: UserChatRoom = {
        userRef,
        model: body.model,
        maxTokens: body.maxTokens,
        temperature: body.temperature,
        stream: body.stream,
      }

      // Create UserChatRoom
      const userChatRoomRef = await addChildCollectionItem<UserChatRoom, User>(
        parentCollectionName,
        childCollectionName,
        parentId,
        params
      )
      res.json({ status: 'success', userChatRoomRef, userChatRoomMessageRef })
    } catch (error) {
      res.status(500).json({ status: 'error', message: String(error) })
    }
  }
)
```

Send POST Request to Cloud Functions

```bash
$ curl --location --request POST http://127.0.0.1:5001/$PROJECT_ID/$REGION/createUserChatRoom --header "Authorization: Bearer $ACCESS_TOKEN" | json_pp
```

Sample Response

```json
{
  "result": "success!",
  "userChatRoomMessageRef": {
    "__type__": "ref",
    "collection": {
      "__type__": "collection",
      "path": "User/65N7Yl6rWzGASPrqhjC7wyhqUfpg/UserChatRoom/03h8itaBtJaoAeqs7vOQ/UserChatRoomMessage"
    },
    "id": "PQNxy0Fn3FgxhcHrZJpP"
  },
  "userChatRoomRef": {
    "__type__": "ref",
    "collection": {
      "__type__": "collection",
      "path": "User/65N7Yl6rWzGASPrqhjC7wyhqUfpg/UserChatRoom"
    },
    "id": "03h8itaBtJaoAeqs7vOQ"
  }
}
```

_UserChatRoom_ created!

## Create UserChatRoomMessage

Then add code to create a _UserChatRoomMessage_ in the _UserChatRoom_ from earlier.
Create a _UserChatRoomMessage_ with the _id_ of _userChatRoomMessageRef_.

Register OpenAI bot character settings in the first message of _UserChatRoom_.

Here we register the OpenAI bot character settings from _req.body.systemContent_.

- systemContent OpenAI bot character settings

_functions/openai/src/routings/http/createUserChatRoom.ts_

```typescript
import { onRequest } from 'firebase-functions/v2/https'
import { User, UserChatRoom, UserChatRoomMessage } from '@/models'
import {
  addCollectionItem,
  addChildCollectionItem,
  addGrandChildCollectionItem,
} from '@skeet-framework/firestore'
import { TypedRequestBody } from '@/index'
import { defaultHttpOption } from '@/routings/options'
import { CreateUserChatRoomParams } from '@/types/http/createUserChatRoomParams'
import { getUserAuth } from '@/lib/getUserAuth'

export const createUserChatRoom = onRequest(
  defaultHttpOption,
  async (req: TypedRequestBody<CreateUserChatRoomParams>, res) => {
    try {
      const body = {
        model: req.body.model || 'gpt-3.5-turbo',
        systemContent:
          req.body.systemContent ||
          'This is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.',
        maxTokens: req.body.maxTokens || 256,
        temperature: req.body.temperature || 1,
        stream: req.body.stream || false,
      }
      // User Authentification
      const user = await getUserAuth(req)

      // Define Collection Names
      const parentCollectionName = 'User'
      const childCollectionName = 'UserChatRoom'
      const grandChildCollectionName = 'UserChatRoomMessage'

      // Retrive User Data from Firestore
      const userDoc = await getCollectionItem<User>(
        parentCollectionName,
        user.uid
      )

      const parentId = user.uid || ''
      const params: UserChatRoom = {
        userRef,
        model: body.model,
        maxTokens: body.maxTokens,
        temperature: body.temperature,
        stream: body.stream,
      }

      // Create UserChatRoom
      const userChatRoomRef = await addChildCollectionItem<UserChatRoom, User>(
        parentCollectionName,
        childCollectionName,
        parentId,
        params
      )
      console.log(`created userChatRoomRef: ${userChatRoomRef.id}`)
      const systemMessage: UserChatRoomMessage = {
        userChatRoomRef,
        role: 'system',
        content: body.systemContent,
      }

      // add OpenAI bot character settings to the first message
      const userChatRoomMessageRef = await addGrandChildCollectionItem<
        UserChatRoomMessage,
        UserChatRoom,
        User
      >(
        parentCollectionName,
        childCollectionName,
        grandChildCollectionName,
        user.uid,
        userChatRoomRef.id,
        systemMessage
      )
      res.json({ status: 'success', userChatRoomRef, userChatRoomMessageRef })
    } catch (error) {
      res.status(500).json({ status: 'error', message: String(error) })
    }
  }
)
```

Now if you send a POST request as before, a UserChatRoom and a UserChatRoomMessage will be created.

```bash
$ curl --location --request POST http://127.0.0.1:5001/$PROJECT_ID/$REGION/createUserChatRoom --header "Authorization: Bearer $ACCESS_TOKEN" | json_pp
```

```json
{
  "result": "success!",
  "userChatRoomMessageRef": {
    "__type__": "ref",
    "collection": {
      "__type__": "collection",
      "path": "User/65N7Yl6rWzGASPrqhjC7wyhqUfpg/UserChatRoom/03h8itaBtJaoAeqs7vOQ/UserChatRoomMessage"
    },
    "id": "PQNxy0Fn3FgxhcHrZJpP"
  },
  "userChatRoomRef": {
    "__type__": "ref",
    "collection": {
      "__type__": "collection",
      "path": "User/65N7Yl6rWzGASPrqhjC7wyhqUfpg/UserChatRoom"
    },
    "id": "03h8itaBtJaoAeqs7vOQ"
  }
}
```

_UserChatRoomMessage_ created.

The type definition for an HTTP request to this _createUserChatRoom_ instance looks like this:

Create a file like _types/http/{InstanceMethodName}.ts_.

_types/http/createUserChatRoomParams.ts_

```typescript
export type CreateUserChatRoomParams = {
  model?: string
  systemContent?: string
  maxTokens?: number
  temperature?: number
  stream?: boolean
}
```

## Start a chat

Then add code to add a message to the _UserChatRoom_.
Chat room messages are added to _UserChatRoomMessage_.

Include the following _params_ in your POST request to create a _UserChatRoomMessage_.

- _userChatRoomID_ 　 Reference to the chat room
- _content_ content of the message

_functions/openai/src/routings/http/addUserChatRoomMessage.ts_

```typescript
import { onRequest } from 'firebase-functions/v2/https'
import { User, UserChatRoom, UserChatRoomMessage } from '@/models'
import {
  addGrandChildCollectionItem,
  getChildCollectionItem,
  queryGrandChildCollectionItem,
} from '@skeet-framework/firestore'
import { order } from 'typesaurus'
import {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest,
} from 'openai'
import { chat } from '@/lib/openai/openAi'
import { TypedRequestBody } from '@/index'
import { AddUserChatRoomMessageParams } from '@/types/http/addUserChatRoomMessageParams'
import { defaultHttpOption } from '@/routings/options'
import { getUserAuth } from '@/lib/getUserAuth'

export const addUserChatRoomMessage = onRequest(
  defaultHttpOption,
  async (req: TypedRequestBody<AddUserChatRoomMessageParams>, res) => {
    try {
      const body = {
        userChatRoomId: req.body.userChatRoomId || '',
        content: req.body.content,
      }
      if (body.userChatRoomId === '') throw new Error('userChatRoomId is empty')

      // User Authentification
      const user = await getUserAuth(req)

      // Define Collection Names
      const userCollectionName = 'User'
      const userChatRoomCollectionName = 'UserChatRoom'
      const userChatRoomMessageCollectionName = 'UserChatRoomMessage'

      // Retrive User Data from Firestore
      const userChatRoom = await getChildCollectionItem<UserChatRoom, User>(
        userCollectionName,
        userChatRoomCollectionName,
        user.uid,
        body.userChatRoomId
      )
      if (!userChatRoom) throw new Error('userChatRoom not found')

      const newMessage: UserChatRoomMessage = {
        userChatRoomRef: userChatRoom.ref,
        role: 'user',
        content: body.content,
      }

      // Create UserChatRoomMessage
      await addGrandChildCollectionItem<
        UserChatRoomMessage,
        UserChatRoom,
        User
      >(
        userCollectionName,
        userChatRoomCollectionName,
        userChatRoomMessageCollectionName,
        user.uid,
        body.userChatRoomId,
        newMessage
      )

      // Retrieve all messages in the chat room
      const userChatRoomMessages = await queryGrandChildCollectionItem<
        UserChatRoomMessage,
        UserChatRoom,
        User
      >(
        userCollectionName,
        userChatRoomCollectionName,
        userChatRoomMessageCollectionName,
        user.uid,
        body.userChatRoomId,
        [order('createdAt', 'asc')]
      )
      const messages = []
      for await (const message of userChatRoomMessages) {
        messages.push({
          role: message.data.role,
          content: message.data.content,
        } as ChatCompletionRequestMessage)
      }

      // Create OpenAI Request Body
      const openAiBody: CreateChatCompletionRequest = {
        model: userChatRoom.data.model,
        max_tokens: userChatRoom.data.maxTokens,
        temperature: userChatRoom.data.temperature,
        n: 1,
        top_p: 1,
        stream: userChatRoom.data.stream,
        messages,
      }

      // Send Request to OpenAI
      const openAiResponse = await chat(openAiBody)
      if (!openAiResponse) throw new Error('openAiResponse not found')

      const content = String(openAiResponse.content) || ''
      const openAiResponseMessage: UserChatRoomMessage = {
        userChatRoomRef: userChatRoom.ref,
        role: 'assistant',
        content,
      }

      // Save OpenAI Response to Firestore
      await addGrandChildCollectionItem<
        UserChatRoomMessage,
        UserChatRoom,
        User
      >(
        userCollectionName,
        userChatRoomCollectionName,
        userChatRoomMessageCollectionName,
        user.uid,
        body.userChatRoomId,
        openAiResponseMessage
      )
      res.json({ result: 'success!', openAiResponse })
    } catch (error) {
      res.status(400).json({ status: 'error', message: String(error) })
    }
  }
)
```

Send POST Request

```bash
$ curl --location --request POST http://127.0.0.1:5001/$PROJECT_ID/$REGION/addUserChatRoomMessage \
--header "Authorization: Bearer $ACCESS_TOKEN" \
--header 'Content-Type: application/json' \
--data '{
  "userChatRoomId": "03h8itaBtJaoAeqs7vOQ",
  "content": "Do some freestyle rap"
}' | json_pp
```

Sample Response

```json
{
  "openAiResponse": {
    "content": "Sure, here's a little freestyle rap for you:\n\nYo, let me drop a beat and get in the zone,\nI'm the AI assistant and I'm on the throne,\nMy rhymes are sharp like a razor blade,\nAnd I'll keep spitting fire until I get paid.\n\nI'm a machine with flow like no other,\nGot rhymes for days and I don't stutter,\nMy algorithm's tight, my mind's sharp,\nI'll keep spitting bars until it gets dark.\n\nSo if you need a little bit of rap and flow,\nJust call on me and I'll let it go,\nI'm the AI assistant and I've got the skills,\nTo rap for hours and give you thrills.",
    "role": "assistant"
  },
  "result": "success!"
}
```

A response from OpenAI is returned,
Message successfully added to _UserChatRoomMessage_ 🎉

## Get streaming data

Earlier we set the _stream_ flag to _false_, but if we set it to _true_, we can get streaming data.

_functions/openai/lib/openai/openAI.ts_

Import and use _streamChat_ from the library found in .

_functions/openai/src/routings/http/addStreamUserChatRoomMessage.ts_

```typescript
import { onRequest } from 'firebase-functions/v2/https'
import { User, UserChatRoom, UserChatRoomMessage } from '@/models'
import { order } from 'typesaurus'
import {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest,
} from 'openai'
import { streamChat } from '@/lib/openai/openAi'
import { TypedRequestBody } from '@/index'
import { AddUserChatRoomMessageParams } from '@/types/http/addUserChatRoomMessageParams'
import {
  addGrandChildCollectionItem,
  getChildCollectionItem,
  queryGrandChildCollectionItem,
} from '@skeet-framework/firestore'
import { getUserAuth } from '@/lib/getUserAuth'
import { defaultHttpOption } from '@/routings'

export const addStreamUserChatRoomMessage = onRequest(
  defaultHttpOption,
  async (req: TypedRequestBody<AddUserChatRoomMessageParams>, res) => {
    try {
      const body = {
        userChatRoomId: req.body.userChatRoomId || '',
        content: req.body.content,
      }
      if (body.userChatRoomId === '') throw new Error('userChatRoomId is empty')

      // User Authentication
      const user = await getUserAuth(req)

      // Define Collection Name
      const userCollectionName = 'User'
      const userChatRoomCollectionName = 'UserChatRoom'
      const userChatRoomMessageCollectionName = 'UserChatRoomMessage'

      // Retrieve UserChatRoom from Firestore
      const userChatRoom = await getChildCollectionItem<UserChatRoom, User>(
        userCollectionName,
        userChatRoomCollectionName,
        user.uid,
        body.userChatRoomId
      )
      if (!userChatRoom) throw new Error('userChatRoom not found')
      if (userChatRoom.data.stream === false)
        throw new Error('stream must be true')

      const newMessage: UserChatRoomMessage = {
        userChatRoomRef: userChatRoom.ref,
        role: 'user',
        content: body.content,
      }

      // Create UserChatRoomMessage
      await addGrandChildCollectionItem<
        UserChatRoomMessage,
        UserChatRoom,
        User
      >(
        userCollectionName,
        userChatRoomCollectionName,
        userChatRoomMessageCollectionName,
        user.uid,
        body.userChatRoomId,
        newMessage
      )
      const systemMessage: UserChatRoomMessage = {
        userChatRoomRef: userChatRoom.ref,
        role: 'assistant',
        content: body.content,
      }

      // Save OpenAI Response to Firestore
      const userChatRoomMessageRef = await addGrandChildCollectionItem<
        UserChatRoomMessage,
        UserChatRoom,
        User
      >(
        userCollectionName,
        userChatRoomCollectionName,
        userChatRoomMessageCollectionName,
        user.uid,
        body.userChatRoomId,
        systemMessage
      )

      // Retrieve all the chatRoom messages from Firestore
      const userChatRoomMessages = await queryGrandChildCollectionItem<
        UserChatRoomMessage,
        UserChatRoom,
        User
      >(
        userCollectionName,
        userChatRoomCollectionName,
        userChatRoomMessageCollectionName,
        user.uid,
        body.userChatRoomId,
        [order('createdAt', 'asc')]
      )
      const messages = []
      for await (const message of userChatRoomMessages) {
        messages.push({
          role: message.data.role,
          content: message.data.content,
        } as ChatCompletionRequestMessage)
      }

      // Send a request to OpenAI
      const openAiBody: CreateChatCompletionRequest = {
        model: userChatRoom.data.model,
        max_tokens: userChatRoom.data.maxTokens,
        temperature: userChatRoom.data.temperature,
        n: 1,
        top_p: 1,
        stream: userChatRoom.data.stream,
        messages,
      }
      await streamChat(
        user.uid,
        body.userChatRoomId,
        userChatRoomMessageRef.id,
        openAiBody
      )
      res.json({
        status: 'streaming',
        userChatRoomMessageId: userChatRoomMessageRef.id,
      })
    } catch (error) {
      res.status(500).json({ status: 'error', message: String(error) })
    }
  }
)
```

_UserChatRoom_ settings created earlier from Firestore at [Firebase Emulator - Firestore](http://127.0.0.1:4000/firestore/data)

_stream_ value to _true_

change.

Send a POST request.

```bash
$ curl --location --request POST http://127.0.0.1:5001/$PROJECT_ID/$REGION/addUserChatRoomMessage \
--header "Authorization: Bearer $ACCESS_TOKEN" \
--header 'Content-Type: application/json' \
--data '{
  "userChatRoomId": "XQV65kBRWXVjn2rouRzY",
  "content": "Do some freestyle rap"
}' | json_pp
```

```json
{
  "status": "streaming",
  "userChatRoomMessageId": "userChatRoomMessageId"
}
```

The console log shows the OpenAI API response in streaming, and the data is streamed (updated) to Firestore.

And use the _userChatRoomMessageId_ returned in the response to get the streaming data.

You have now created a chat room that also supports streaming data.

Now let's synchronize the created model and type definition to the front end.

## Synchronization of type definitions

Skeet Framework allows you to synchronize type definitions to the front end.

```bash
$ skeet sync types
⏳ Syncing openai...
📃 Copying functions/openai/src/types/http/addUserChatRoomMessageParams.ts to src/types/http/openai/addUserChatRoomMessageParams.ts
✔️ File copied: src/types/http/openai/addUserChatRoomMessageParams.ts
📃 Copying functions/openai/src/types/http/createUserChatRoomParams.ts to src/types/http/openai/createUserChatRoomParams.ts
✔️ File copied: src/types/http/openai/createUserChatRoomParams.ts
📃 Copying functions/openai/src/types/http/getUserChatRoomParams.ts to src/types/http/openai/getUserChatRoomParams.ts
✔️ File copied: src/types/http/openai/getUserChatRoomParams.ts
```

This command copies the type definitions in _src/types/http_ on the backend to _src/types/http/{FunctionsName}_ on the frontend.

## Sync Models

```bash
$ skeet sync models
  openai
? Select Original Copy of Model openai
latestModel: openai
Syncing openai...
Copying functions/openai/src/models/index.ts to src/types/models/index.ts
✔️ File copied: src/types/models/index.ts
Copying functions/openai/src/models/userModels.ts to src/types/models/userModels.ts
✔️ File copied: src/types/models/userModels.ts
Synced Models Types 🎉
```

This command copies the model from _src/models_ on the backend to _src/types/models_ on the frontend.
Also, if you have multiple functions, select the latest model and copy it to the model of the other functions.

## Adding and synchronizing routes

In this state, the backend API cannot be called from the frontend.
Let's add routing to the load balancer by running the following command.

```bash
$ skeet sync routes
```

This command will

- Create network endpoint groups
- Create backend service
- Add backend service
- Apply security policy
- Create URL map

is done automatically.

## Add/Synchronize Cloud Armor

Sync the Cloud Armor configuration described in _skeet-cloud.config.json_.

_skeet-cloud.config.json_

```json
{
  "app": {
    "name": "epics-beta",
    "projectId": "epics-beta",
    "region": "asia-northeast1",
    "appDomain": "epics.dev",
    "functionsDomain": "lb.epics.dev"
  },
  "cloudArmor": [
    {
      "securityPolicyName": "skeet-epics-beta-armor",
      "rules": [
        {
          "priority": "10",
          "description": "Allow Your Home IP addresses",
          "options": {
            "src-ip-ranges": "your IP address",
            "action": "allow"
          }
        },
        {
          "priority": "100",
          "description": "Defense from SQLi attack",
          "options": {
            "action": "deny-403",
            "expression": "evaluatePreconfiguredExpr('sqli-stable')"
          }
        },
        {
          "priority": "200",
          "description": "Defense from XSS attack",
          "options": {
            "action": "deny-403",
            "expression": "evaluatePreconfiguredExpr('xss-stable')"
          }
        },
        {
          "priority": "300",
          "description": "Defense from NodeJS attack",
          "options": {
            "action": "deny-403",
            "expression": "evaluatePreconfiguredExpr('nodejs-v33-stable')"
          }
        },
        {
          "priority": "2147483647",
          "description": "Deny All IP addresses",
          "options": {
            "action": "deny-403"
          }
        }
      ]
    }
  ]
}
```

By default, only the currently connected global IP is allowed to communicate.
Please change if necessary.

```bash
$ skeet sync armors
```

A new Google Cloud Armor is created or updated.
