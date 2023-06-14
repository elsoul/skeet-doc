---
id: tutorial
title: チュートリアル
description: Skeet フレームワーク を使ってAIチャットアプリを作成するチュートリアルです。
---

## チュートリアル

このチュートリアルでは Skeet Framework を使ってチャットアプリを作成します。
プログラミング言語 TypeScript と Firebase Firestore, GitHub を含めた総合的なクラウドアプリの開発チュートリアルです。

![https://storage.googleapis.com/skeet-assets/animation/skeet-chat-latest.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-chat-latest.gif)

このチュートリアルでは 基本的なチャットボットアプリ を作成します。
クイックスタートでは Skeet Framework の基本的な使い方を学びましたが、
このチュートリアルでは Skeet Framework の機能を使ってこれまでには簡単にできなかったことが、
どのように簡単にできるようになるかを学びます。
オープンソースとしてライブラリーを公開して下さっている開発者の方々には多大なる感謝を申し上げます。

Skeet Framework は、コンピューターリソースを効率的に使うことで、
開発者がより少ないコードでより多くのことを実現できるように設計されています。
さらに、昨今の地球では環境問題が深刻化しており、エネルギーを効率的に使うことは、
開発者の責務であると考えています。

**自分はチャットボットを作りたいのではないから、と飛ばしたくなるかもしれませんが、是非目を通してみてください。**

このチュートリアルで学ぶ技法はどのような Skeet Framework のアプリにおいても基本的なものであり、マスターすることで Skeet への深い理解が得られます。

この章では クイックスタートで作成した 機械学習（OpenAI） の API を使ったチャットボットアプリに新しい機能を追加していきます。

## チュートリアルの目標

このチュートリアルでは、以下のことを学びます。

- 開発用ログイン認証キーを取得する
- Skeet Curl で API リクエストをテストする
- チャットストリームのコードを確認する
- PubSub トリガー を使ってタスクを切り分ける
- Firebase へデプロイする

## 開発環境

Skeet Framework では エディタに VScode を推奨しています。
フレームワークに沿って開発を進めることで、
GitHub Copilot を使った強力なコード補完サポートを受けることができます。

- [VScode](https://code.visualstudio.com/)
- [GitHub Copilot](https://copilot.github.com/)

## チュートリアルの前提条件

[クイックスタート](/ja/doc/backend/quickstart) が完了していない場合は先に完了させてください。

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


💃Let's try `$ skeet curl <MethodName>` to test request🕺

$ skeet curl createUserChatRoom
     or
$ skeet curl createUserChatRoom --data '{ "model": "gpt4", "maxTokens": 4200 }'
```

コンソールログに表示された accessToken を環境変数に設定することで、

_skeet curl_ コマンドを使って API リクエストを送信することができます。

開発の際にログイン認証キーの取得や、POST リクエストの送信にはコストがかかります。
Skeet Framework では以下の二つのコマンドを使って、
開発者がより効率的に開発を進めることができるように設計されています。

- skeet login
- skeet curl

ログインコマンドが成功すると、

デフォルトで　*authOnCreateUser.ts* に定義されている

Auth インスタンスのトリガーが作動して

Firebase Firestore にユーザー情報が保存されます。

_functions/openai/routings/auth/authOnCreateUser.ts_

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

ユーザー情報は、

_await getUserAuth(req)_

を使って Firebase から取得します。

```typescript
import { getUserAuth } from '@/lib'

const user: UserAuthType = await getUserAuth(req)
```

_getUserAuth_ の戻り値の型定義はデフォルトで次のようになっています。

```typescript
export type UserAuthType = {
  uid: string
  username: string
  email: string
  iconUrl: string
}
```

## Skeet Curl で API リクエストをテストする

_skeet curl_ コマンドを使って API リクエストを送信してみましょう。

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

UserChatRoom と UserChatRoomMessage が作成されました。

## チャットストリームのコードを確認する

Skeet Functions のコードは、
functions ディレクトリに配置されています。

Http トリガーの場合は、_routings/http_ ディレクトリに配置されています。

```bash
$ tree functions
functions
├── openai
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

デフォルトではフロントエンドから _addStreamUserChatRoomMessage_ が呼び出されます。

_functions/openai/routings/http/addStreamUserChatRoomMessage.ts_

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
import {
  addGrandChildCollectionItem,
  getChildCollectionItem,
  queryGrandChildCollectionItem,
  updateChildCollectionItem,
} from '@skeet-framework/firestore'
import { getUserAuth } from '@/lib/getUserAuth'
import { privateHttpOption } from '@/routings'
import { AddStreamUserChatRoomMessageParams } from '@/types/http/addStreamUserChatRoomMessageParams'
import { generateChatRoomTitle } from '@/lib/openai/generateChatRoomTitle'

export const addStreamUserChatRoomMessage = onRequest(
  privateHttpOption,
  async (req: TypedRequestBody<AddStreamUserChatRoomMessageParams>, res) => {
    try {
      const body = {
        userChatRoomId: req.body.userChatRoomId || '',
        content: req.body.content,
      }
      if (body.userChatRoomId === '') throw new Error('userChatRoomId is empty')

      // アクセストークンからユーザー情報を取得
      const user = await getUserAuth(req)

      // 使用するコレクション名を定義
      const userCollectionName = 'User'
      const userChatRoomCollectionName = 'UserChatRoom'
      const userChatRoomMessageCollectionName = 'UserChatRoomMessage'

      // ユーザーのチャットルームを取得
      const userChatRoom = await getChildCollectionItem<UserChatRoom, User>(
        userCollectionName,
        userChatRoomCollectionName,
        user.uid,
        body.userChatRoomId
      )
      if (!userChatRoom) throw new Error('userChatRoom not found')
      if (userChatRoom.data.stream === false)
        throw new Error('stream must be true')

      // 新規メッセージの追加
      const newMessage: UserChatRoomMessage = {
        userChatRoomRef: userChatRoom.ref,
        role: 'user',
        content: body.content,
      }
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

      // OpenAI に送信するメッセージを取得
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

      // ストリーム用の空メッセージを追加
      const systemMessage: UserChatRoomMessage = {
        userChatRoomRef: userChatRoom.ref,
        role: 'assistant',
        content: '',
      }
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

      // チャットルームのタイトルを更新
      if (messages.length === 2) {
        const title = await generateChatRoomTitle(body.content)
        await updateChildCollectionItem<UserChatRoom, User>(
          userCollectionName,
          userChatRoomCollectionName,
          user.uid,
          body.userChatRoomId,
          { title }
        )
      }

      // レスポンスを返す
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

この関数を先程の ChatRoomID を使って呼び出してみましょう。

```bash
$ skeet curl addStreamUserChatRoomMessage --data '{ "userChatRoomId": "l2WRsPH2RXobWD7mOJPP", "content": "こんにちは" }'
{
   "status" : "streaming",
   "userChatRoomMessageId" : "80dyMl01IDgnwpR0Sez1"
}
```

もう一方のコンソールではストームレスポンスが表示されていることが確認できます。

## PubSub トリガー を使ってタスクを切り分ける

それでは _addStreamUserChatRoomMessage_ に含まれる

チャットルームのタイトルを更新する処理を PubSub トリガーを使って切り分けてみましょう。

```typescript
// チャットルームのタイトルを更新
if (messages.length === 2) {
  const title = await generateChatRoomTitle(body.content)
  await updateChildCollectionItem<UserChatRoom, User>(
    userCollectionName,
    userChatRoomCollectionName,
    user.uid,
    body.userChatRoomId,
    { title }
  )
}
```

まずは PubSub トリガーを追加します。

_skeet add method_ を実行し、インスタンスのタイプと関数名を入力します。

```bash
$ skeet add method generateTitle
? Select Instance Type to add (Use arrow keys)
   = Instance Type =
  http
  firestore
 ❯ pubsub
  scheduler
  auth
? Select Functions to add openai
✔️ ./functions/openai/src/types/http/pubsubGenerateTitleParams.ts created 🎉
✔️ ./functions/openai/src/routings/http/pubsubGenerateTitle.ts created 🎉
```

型定義ファイルと関数ファイルが作成されます。

_functions/openai/src/routings/pubsub/pubsubGenerateTitle.ts_

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

_functions/openai/src/types/http/pubsubGenerateTitleParams.ts_

```typescript
export type PubsubGenerateTitleParams = {
  name?: string
}
```

先程の関数の中身を実装します。

_functions/openai/src/routings/http/pubsubGenerateTitle.ts_

```typescript
import { onMessagePublished } from 'firebase-functions/v2/pubsub'
import { pubsubDefaultOption } from '@/routings/options'
import { parsePubSubMessage } from '@/lib/pubsub'
import { PubsubGenerateTitleParams } from '@/types/pubsub/pubsubGenerateTitleParams'
import { generateChatRoomTitle } from '@/lib/openai/generateChatRoomTitle'
import { updateChildCollectionItem } from '@skeet-framework/firestore'
import { User, UserChatRoom } from '@/models'

export const pubsubTopicGenerateTitle = 'pubsubGenerateTitle'

export const pubsubGenerateTitle = onMessagePublished(
  pubsubDefaultOption(pubsubTopicGenerateTitle),
  async (event) => {
    try {
      // PubSub メッセージをパース
      const pubsubObject = parsePubSubMessage<PubsubGenerateTitleParams>(event)

      if (!pubsubObject) throw new Error('pubsubObject is undefined')

      // OpenAI API を呼び出してタイトルを生成
      const title = await generateChatRoomTitle(pubsubObject.content)

      // チャットルームのタイトルを更新
      await updateChildCollectionItem<UserChatRoom, User>(
        'User',
        'UserChatRoom',
        pubsubObject.userId,
        pubsubObject.userChatRoomId,
        { title }
      )

      // ログを出力
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

先程の型を定義します。

_functions/openai/src/types/http/pubsubGenerateTitleParams.ts_

```typescript
export type PubsubGenerateTitleParams = {
  content: string
  userId: string
  userChatRoomId: string
}
```

今度は先程の _addStreamUserChatRoomMessage_ に PubSub Publish を追加します。

```typescript
.
.
if (messages.length === 2) {
  // PubSub メッセージボディを定義
  const pubsubMessageBody: PubsubGenerateTitleParams = {
    userId: user.uid,
    userChatRoomId: body.userChatRoomId,
    content: body.content,
  }

  // PubSub トピックにメッセージを送信
  await pubsubPublish(pubsubTopicGenerateTitle, pubsubMessageBody)
}
.
.
```

これで PubSub トリガーを使ってタスクを切り分けることができました。
それではテストをしてみます。

ローカルサーバーを再起動します。

**⚠️ 再起動されると、Firebase エミュレーターに入っているデータがリセットされます。 ⚠️**

再度、ログイン、アクセストークンの設定を行なってください。

```bash
$ skeet s
```

もう一度 UserChatRoom を作成し、UserChatRoom の ID を取得します。

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

UserChatRoomMessage を作成します。

```bash
$ skeet curl addStreamUserChatRoomMessage --data '{ "userChatRoomId": "yJ5yl7L1nEV71xLRRFzY", "content": "こんにちは" }'
```

UserChatRoomMessage を作成すると、PubSub トピックにメッセージが送信され、PubSub トリガーが発火します。

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
>    title: '挨拶'
>  }
```

無事にタスクを切り分けることができました 🎉

## Firebase へデプロイする

はじめてデプロイする場合は _skeet init_ コマンドを使用し、
プロジェクトに必要な設定を行います。

ここではドメインを設定しないでデプロイします。

コンソールに表示されたリンクから Firestore と FirebaseAuth を作成していることを確認してください。

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
Function URL (openai:root(europe-west6)): https://root-iolvuu5bzq-oa.a.run.app
i  functions: cleaning up build files...

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/skeet-demo/overvie
```

無事に Firebase Functions にデプロイされました。

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
❯◯ openai
 ◯ solana
```

デプロイする _functions_ を選択し,
選択された _functions_ のみをデプロイします。
a を押すと全ての _functions_ を選択します。

これで、Skeet Framework のデプロイは完了です 🎉
あとはあなたのアイディアを実装するだけです 🎉
