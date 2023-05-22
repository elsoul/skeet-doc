---
id: tutorial
title: チュートリアル
description: Skeet Framework を使ってチャットアプリを作成するチュートリアルです。
---

## チュートリアル

このチュートリアルでは Skeet Framework を使ってチャットアプリを作成します。
プログラミング言語 TypeScript と Firebase Firestore, GitHub を含めた総合的なクラウドアプリの開発チュートリアルです。

このチュートリアルでは 基本的なチャットボットアプリ を作成します。 **自分はチャットボットを作りたいのではないから、と飛ばしたくなるかもしれませんが、是非目を通してみてください。** このチュートリアルで学ぶ技法はどのような Skeet Framework のアプリにおいても基本的なものであり、マスターすることで Skeet への深い理解が得られます。

この章では OpenAI の API を使ってチャットボットを作成します。

- [OpenAI API](https://beta.openai.com/docs/api-reference/introduction)

Skeet Framework では エディタに VScode を推奨しています。
このチュートリアルでは VScode を使って進めていきます。

フレームワークに沿って開発を進めることで、
GitHub Copilot を使った強力なコード補完サポートを受けることができます。

- [VScode](https://code.visualstudio.com/)
- [GitHub Copilot](https://copilot.github.com/)

## チュートリアルの前提条件

このチュートリアルを進めるには次のものが必要です。

- [Node.js](https://nodejs.org/ja/) 18.16.0 以上
- [Yarn](https://yarnpkg.com/) 1.22.19 以上
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) 430.0.0 以上
- [Firebase CLI](https://firebase.google.com/docs/cli) 12.0.1 以上
- [GitHub CLI](https://cli.github.com/) 2.29.0 以上

また、[最初のデプロイ](/ja/doc/backend/initial-deploy) が完了していない場合は、

- Google Cloud プロジェクトの作成
- Firebase プロジェクトの作成
- Firebase Config の設定

を完了してください。

## ユーザー認証・ログイン機能の実装

Firebase エミュレーターを起動します。

```bash
$ skeet s
```

別ウィンドウで次のコマンドを実行し、
_accessToken_ を取得します。

```bash
$ skeet yarn dev:login
  .
  .
  accessToken: 'accessToken'',
  .
  .
```

Firebase ユーザーが作成され、

_functions/openai/routings/auth/authOnCreateUser.ts_ に定義されている
Auth インスタンスのトリガーが作動して、
Firebase Firestore にユーザー情報が保存されます。

```typescript
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

コンソールに accessToken が表示されるので、
この accessToken を使ってユーザー認証を行います。

_await getUserAuth(req)_ を使ってユーザー情報を Firebase から取得します。

```typescript
import { getUserAuth } from '@/lib'

const user = await getUserAuth(req)
```

*getUserAuth*の戻り値の型定義は次のようになっています。

```typescript
export type UserAuthType = {
  uid: string
  username: string
  email: string
  iconUrl: string
}
```

## User モデル

この章では _skeet create_ コマンドを使って作成された User モデルを使用します。

- [基本アーキテクチャ - モデルの定義](/ja/doc/backend/basic-architecture#モデルの定義)

## UserChatRoom を作成する

続いて、先ほどのコードに UserChatRoom を作成するコードを追加します。

_UserChatRoom_ には OpenAI API に必要な以下の情報を登録します。

- model (gpt-3.5-turbo)
- maxTokens (256)
- temperature (0)
- stream (false)

詳しくは OpenAI の API のドキュメントを参照してください。

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
      // UserChatRoom に OpenAI の基本設定を req.body から登録する
      const body = {
        model: req.body.model || 'gpt-3.5-turbo',
        systemContent:
          req.body.systemContent ||
          '優秀なアシスタント。物事を段階的に考えるのが得意です。優しい口調。できないことは言わない。',
        maxTokens: req.body.maxTokens || 256,
        temperature: req.body.temperature || 1,
        stream: req.body.stream || false,
      }

      // ユーザー認証
      const user = await getUserAuth(req)

      // 使用するコレクション名を定義
      const parentCollectionName = 'User'
      const childCollectionName = 'UserChatRoom'

      // User をFirtoreから取得
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

      // UserChatRoom を作成
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

POST リクエストを送信します。

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

_UserChatRoom_ が作成されました。

## UserChatRoomMessage を作成する

続いて、先ほどの _UserChatRoom_ に _UserChatRoomMessage_ を作成するコードを追加します。
_userChatRoomMessageRef_ の _id_ を使って、_UserChatRoomMessage_ を作成します。

_UserChatRoom_ の１通目のメッセージに OpenAI ボットのキャラクター設定を登録します。

ここでは OpenAI ボットのキャラクター設定を _req.body.systemContent_ から登録します。

- systemContent 　 OpenAI ボットのキャラクター設定

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
      // ユーザー認証
      const user = await getUserAuth(req)

      // 使用するコレクション名を定義
      const parentCollectionName = 'User'
      const childCollectionName = 'UserChatRoom'
      const grandChildCollectionName = 'UserChatRoomMessage'

      // User をFirtoreから取得
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

      // UserChatRoom を作成
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

      // UserChatRoomMessage に OpenAI ボットのキャラクター設定を登録
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

これで先ほどと同様に POST リクエストを送信すると、UserChatRoom と UserChatRoomMessage が作成されます。

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

_UserChatRoomMessage_ が作成されました。

この _createUserChatRoom_ インスタンスへの HTTP リクエストの型定義は以下のようになります。

_types/http/{InstanceMethodName}.ts_ のようにファイルを作成します。

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

## チャットを開始する

続いて、_UserChatRoom_ にメッセージを追加するコードを追加します。
チャットルームのメッセージは _UserChatRoomMessage_ に追加されます。

以下の _params_ を POST リクエストに含めて、_UserChatRoomMessage_ を作成します。

- userChatRoomID 　チャットルームの参照
- content 　メッセージの内容

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

      // ユーザー認証
      const user = await getUserAuth(req)

      // 使用するコレクション名を定義
      const userCollectionName = 'User'
      const userChatRoomCollectionName = 'UserChatRoom'
      const userChatRoomMessageCollectionName = 'UserChatRoomMessage'

      // UserChatRoom を取得
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

      // UserChatRoomMessage に新しいメッセージを追加
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

      // UserChatRoomMessage を取得
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

      // OpenAI API に必要なリクエストを作成
      const openAiBody: CreateChatCompletionRequest = {
        model: userChatRoom.data.model,
        max_tokens: userChatRoom.data.maxTokens,
        temperature: userChatRoom.data.temperature,
        n: 1,
        top_p: 1,
        stream: userChatRoom.data.stream,
        messages,
      }

      // OpenAI API にリクエストを送信
      const openAiResponse = await chat(openAiBody)
      if (!openAiResponse) throw new Error('openAiResponse not found')

      const content = String(openAiResponse.content) || ''
      const openAiResponseMessage: UserChatRoomMessage = {
        userChatRoomRef: userChatRoom.ref,
        role: 'assistant',
        content,
      }

      // OpenAI の返答を UserChatRoomMessage に追加
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

POST リクエストを送信してみます。

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

OpenAI からのレスポンスが返却され、
無事に、_UserChatRoomMessage_ にメッセージが追加されました 🎉

## ストリーミングデータを取得する

先ほどは _stream_ フラグを _false_ にしていましたが、_true_ にすると、ストリーミングデータを取得することができます。

_functions/openai/lib/openai/openAI.ts_

にあるライブラリーから _streamChat_ をインポートして使います。

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

      // ユーザー認証
      const user = await getUserAuth(req)

      // 使用するコレクション名を定義
      const userCollectionName = 'User'
      const userChatRoomCollectionName = 'UserChatRoom'
      const userChatRoomMessageCollectionName = 'UserChatRoomMessage'

      // UserChatRoom を取得
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

      // UserChatRoomMessage に新しいメッセージを追加
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

      // OpenAI の返答を UserChatRoomMessage に追加
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

      // UserChatRoomMessage を取得
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

      // OpenAI にリクエストを送信
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

先ほど作成した _UserChatRoom_ の設定を [Firebase エミュレーター - Firestore](http://127.0.0.1:4000/firestore/data) の Firestore から

_stream_ の値を _true_ に

変更します。

POST リクエストを送信します。

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

コンソールログには OpenAI API のレスポンスがストリーミングで表示され、データは Firestore にストリーミング保存（更新）されます。

そして レスポンスで返ってきた _userChatRoomMessageId_ を使って、ストリーミングデータを取得します。

これで、ストリーミングデータにも対応したチャットルームを作成することができました。

それでは作成した、モデル、型定義をフロントエンドに同期させましょう。

## 型定義の同期

Skeet Framework では、型定義をフロントエンドに同期させることができます。

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

このコマンドにより、バックエンドの _src/types/http_ にある型定義をフロントエンドの _src/types/http/{FunctionsName}_ にコピーします。

## モデルの同期

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

このコマンドにより、バックエンドの _src/models_ にあるモデルをフロントエンドの _src/types/models_ にコピーします。
また、複数のファンクションがある場合は、最新のモデルを選択し、その他のファンクションのモデルにコピーします。

## ルーティングの追加・同期

このままでは、フロントエンドからバックエンドの API を呼び出すことができません。
以下のコマンドを実行し、ロードバランサーにルーティングを追加しましょう。

```bash
$ skeet sync routes
```

このコマンドにより、

- ネットワークエンドポイントグループの作成
- バックエンドサービスの作成
- バックエンドサービスの追加
- セキュリティーポリシーの適用
- URL マップの作成

を自動で行っています。

## Cloud Armor の追加・同期

_skeet-cloud.config.json_ に記述されている Cloud Armor の設定を同期します。

_skeet-cloud.config.json_

```json
{
  "app": {
    "name": "skeet-example",
    "projectId": "skeet-example",
    "region": "asia-northeast1",
    "appDomain": "skeeter.app",
    "functionsDomain": "lb.skeeter.app"
  },
  "cloudArmor": [
    {
      "securityPolicyName": "skeet-skeet-example-armor",
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

デフォルトの設定では 現在接続しているグローバル IP のみ通信を許可しています。
必要に応じて変更してください。

```bash
$ skeet sync armors
```

新規に Google Cloud Armor を作成または、更新されます。

## Skeet Framework のデプロイ

Skeet Framework に 2 種類のデプロイ方法があります。

- GitHub Actions による CD/CI
- Skeet CLI によるデプロイ

## GitHub Actions による CD/CI

```bash
$ git add .
$ git commit -m "first deploy"
$ git push origin main
```

GitHub に push すると、GitHub Actions により、自動でデプロイが行われます。

## Skeet CLI によるデプロイ

```bash
$ skeet deploy
? Select Services to run functions command (Press <space> to select, <a> to toggle all, <i> to invert
selection, and <enter> to proceed)
  = Services =
❯◯ openai
 ◯ solana
```

デプロイする _functions_ を選択し,
選択された _functions_ のみをデプロイします。
a を押すと全ての _functions_ を選択します。
