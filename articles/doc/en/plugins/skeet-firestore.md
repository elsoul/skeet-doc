---
id: skeet-firestore
title: Skeet Firestore
description: How to use type-safe Firestore in Skeet Framework.
---

## Skeet Firestore TypeDocs

- [Skeet Firestore TypeDoc](https://elsoul.github.io/skeet-firestore/)

This plugin is for Backend (Node.js) for now.
After launching TypeSaurus X (Now we're using version 7), we'll migrate and it will allow to use on Frontend (React Native) as well.

TypeSaurus: https://github.com/kossnocorp/typesaurus

## Skeet Firestore - Skeet Framework Plugin

Skeet Framework provides a plugin for using Firestore.
This plugin allows you to easily add/get/update/query/remove Firestore data.

| Method Name          | Description            |
| -------------------- | ---------------------- |
| addCollectionItem    | Add Collection Item    |
| getCollectionItem    | Get Collection Item    |
| queryCollectionItem  | Query Collection Items |
| updateCollectionItem | Update Collection Item |
| removeCollectionItem | Remove Collection Item |

It supports nested collections and documents.

| Method Name                              | Description                                    |
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

## Installing the Firestore plugin

To install the Firestore plugin, run the following command:

```bash
$ yarn add @skeet-firebase/firestore
```

To install the plugin on multiple Functions using the Skeet CLI, run the following command:

```bash
$ skeet yarn add -p @skeet-firebase/firestore
```

## Initialize

```typescript
import * as admin from 'firebase-admin'

admin.initializeApp()
```

## Basic Structure of Skeet Firestore

Skeet Firestore retrieves, updates, and removes data nested in the following structure:

```typescript
const parentCollectionName = 'Parent'
const childCollectionName = 'Child'
const grandChildCollectionName = 'GrandChild'
.
.
.

const doc = await {MethodName}{Relation}CollectionItem<..., GrandChild, Child, Parent>(
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

## Add Collection Item

ID Auto Generate

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

Define Custom ID

In this case uid is specified, so
A document with ID uid is created in the User collection

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

## Add Child Collection Item

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
