---
id: basic-architecture
title: 基本構造
description: Skeet Framework バックエンドの基本的ツリー構造や使い方について説明します。
---

## Skeet Framework の基本構造

Skeet Framework のバックエンドはサーバーレスなため、
すぐにファンクションから書き始めることができます。

_src_ にフロントエンドのソースコードが配置されます。
_functions_ ディレクトリ以下に firebase functions のプロジェクトが配置されます。
functions には複数の functions を追加することができます。

```bash
├── src
│   ├── public
│   └── types
├── functions
│   ├── openai
│   └── solana
├── package.json
├── skeet-cloud.config.json
```

| ディレクトリ            | 説明                              |
| ----------------------- | --------------------------------- |
| src                     | フロントエンドのソースコード      |
| src/public              | フロントエンドのソースコード      |
| src/types               | フロントエンドの型定義            |
| functions               | Firebase Functions のソースコード |
| functions/openai        | OpenAI API に関する functions     |
| functions/solana        | Solana Web3js に関する functions  |
| package.json            | バックエンドのパッケージ管理      |
| skeet-cloud.config.json | Skeet Framework の設定ファイル    |

## Skeet Functions の基本構造

Skeet Functions は Firebase Functions をベースにしています。
_functions_ ディレクトリ以下に firebase functions のプロジェクトが配置されます。
functions には複数の functions を追加することができます。

_functions/openai_

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

## Skeet Rountings の基本構造

インスタンスのタイプによって、ルーティングの設定が異なります。
また、Firebase Functions のオプション設定は routings/options 以下に配置されています。

```bash
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
