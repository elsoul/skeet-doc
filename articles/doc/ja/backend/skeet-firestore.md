---
id: skeet-firestore
title: Skeet Firestore
description: Skeet フレームワーク における Firestore の使い方を解説します。
---

## Skeet Firestore - Skeet Framework Plugin

Skeet Framework では Firestore を使うためのプラグインが用意されています。
このプラグインを使うことで、Firestore のデータを簡単に追加・取得・更新・検索・削除することができます。

| メソッド名           | 説明                   |
| -------------------- | ---------------------- |
| addCollectionItem    | Add Collection Item    |
| getCollectionItem    | Get Collection Item    |
| queryCollectionItem  | Query Collection Items |
| updateCollectionItem | Update Collection Item |
| removeCollectionItem | Remove Collection Item |

ネストされたコレクション、ドキュメントに対応しています。

| メソッド名                               | 説明                                           |
| ---------------------------------------- | ---------------------------------------------- |
| addChildCollectionItem                   | Add Child Collection Item                      |
| addGrandChildCollectionItem              | Add Grand Child Collection Item                |
| addGrandGrandChildCollectionItem         | Add Grand Grand Child Collection Item          |
| addGreatGrandGrandChildCollectionItem    | Add Great Grand Grand Child Collection Item    |
| getChildCollectionItem                   | Get Child Collection Item                      |
| getGrandChildCollectionItem              | Get Grand Child Collection Item                |
| getGrandGrandChildCollectionItem         | Get Grand Grand Child Collection Item          |
| getGreatGrandGrandChildCollectionItem    | Get Great Grand Grand Child Collection Item    |
| queryChildCollectionItem                 | Query Child Collection Items                   |
| queryGrandChildCollectionItem            | Query Grand Child Collection Items             |
| queryGrandGrandChildCollectionItem       | Query Grand Grand Child Collection Items       |
| queryGreatGrandGrandChildCollectionItem  | Query Great Grand Grand Child Collection Items |
| updateChildCollectionItem                | Update Child Collection Item                   |
| updateGrandChildCollectionItem           | Update Grand Child Collection Item             |
| updateGrandGrandChildCollectionItem      | Update Grand Grand Child Collection Item       |
| updateGreatGrandGrandChildCollectionItem | Update Great Grand Grand Child Collection Item |
| removeChildCollectionItem                | Remove Child Collection Item                   |
| removeGrandChildCollectionItem           | Remove Grand Child Collection Item             |
| removeGrandGrandChildCollectionItem      | Remove Grand Grand Child Collection Item       |
| removeGreatGrandGrandChildCollectionItem | Remove Great Grand Grand Child Collection Item |

## Firestore プラグインのインストール

Firestore プラグインをインストールするには、次のコマンドを実行します。

```bash
$ yarn add @skeet-firebase/firestore
```

Skeet CLI を使って複数の Functions にプラグインをインストールする場合は、次のコマンドを実行します。

```bash
$ skeet yarn add -p @skeet-firebase/firestore
```

## Initialize

```typescript
import * as admin from 'firebase-admin'

admin.initializeApp()
```

or

```typescript
import * as firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
  // Project configuration
})
```

## Skeet Firestore の基本構造

Skeet Firestore では、次のような構造でネストされたデータを取得・更新・削除します。

```typescript
const parentCollectionName = 'Parent'
const childCollectionName = 'Child'
const grandChildCollectionName = 'GrandChild'
.
.
.

const dataRef = await {MethodName}{Relation}CollectionItem<..., GrandChild, Child, Parent>(
  parentCollectionName,
  childCollectionName,
  grandChildCollectionName,
  ...,
  parentId,
  childId,
  ...,
  {Relation}Params
  )
```

## コレクションにドキュメントを追加する

ID が自動生成される場合

```typescript
import { addCollectionItem } from '@skeet-framework/firestore'
import { User } from '@/models/userModels.ts'

const run = async () => {
  const parentCollectionName = 'User'
  const params: User = {
    username: 'Satoshi',
  }
  const response = await addCollectionItem<User>(parentCollectionName, params)
  console.log('Ref', response)
}

run()
```

ID を指定する場合

この場合は uid を指定しているので、
User コレクションの中に uid という ID のドキュメントが作成されます。

```typescript
import { addCollectionItem } from '@skeet-framework/firestore'
import { User } from '@/models/userModels.ts'

const run = async () => {
  const parentCollectionName = 'User'
  const params: User = {
    username: 'Satoshi',
  }
  const uid = 'uidstring'
  const response = await addCollectionItem<User>(
    parentCollectionName,
    params,
    uid
  )
  console.log('Ref', response)
}

run()
```

## ネストされたコレクションにドキュメントを追加する

```typescript
import { addChildCollectionItem } from '@skeet-framework/firestore'
import { User, UserChatRoom } from '@/models/userModels.ts'

const run = async () => {
  const parentCollectionName = 'User'
  const params: User = {
    username: 'Satoshi',
  }
  const response = await addCollectionItem<User>(parentCollectionName, params)
  console.log('Ref', response)

  const childCollectionName = 'UserChatRoom'
  const childParams: UserChatRoom = {
    userRef: response.ref,
    model: 'gpt4',
    maxTokens: 100,
    temperature: 0.8,
    stream: false,
  }
  const childResponse = await addChildCollectionItem<UserChatRoom>(
    parentCollectionName,
    response.id,
    childCollectionName,
    childParams
  )
  console.log('Ref', childResponse)
}
```
