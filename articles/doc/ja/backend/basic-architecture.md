---
id: basic-architecture
title: 基本アーキテクチャ
description: ここでは Skeet TypeScript サーバーレスフレームワークの基本的なアーキテクチャについて説明します。
---

## はじめに

Skeet フレームワークは [Monorepo](https://en.wikipedia.org/wiki/Monorepo) によってアプリケーションを管理しています。

ウェブアプリケーションには、ユーザーアプリ、管理者アプリ、バックエンド API、Worker によるタスク処理など、

様々な役割がありますが、

1 つの git リポジトリ で管理することができます。

これにより、チーム間による開発効率が抜群に改善されます。

## 全体ディレクトリ構造

Skeet には一つのリポジトリの中に複数のサービスがあります。

サービスは apps 以下のディレクトリに配置されます。

バックエンドのサービスには

api と worker の 2 種類があり、

worker は複数個作成することができます。

フロントエンドのサービスは app ディレクトリに配置され、
Web, iOS, Android に対応しています。

ツリー構造

```
skeet-example
├── apps
│   ├── api
│   ├── workers
│   ├── app

  .
  .
```

## Skeet GraphQL API の構造

```
skeet-example
├── apps
│   ├── api
│        ├── prisma
│        │      ├── migrations
│        │      ├── schema.prisma
│        ├── src
│        │    ├── graphql
│        │    │      ├── authManager
│        │    │      ├── modelManager
│        │    │      ├── responseManager
│        │    │      ├── taskManager
│        │    │      ├── enums.ts
│        │    │      ├── index.ts
│        │    ├── lib
│        │    ├── utils
│        │    ├── index.ts
│        │    ├── nexus-typegen.ts
│        │    ├── permission.ts
│        │    ├── schema.graphql
│        │    ├── schema.ts
│        ├── tests
  .
  .
```

`schema.prisma` にモデルを定義するところからつくり始めましょう。

- `authManager` ユーザーログインなどに関する GraphQL クエリを管理します。

- `modelManager` Prisma Schema に定義した CRUD GraphQL クエリを管理します。このディレクトリ内のファイルは自動で生成されます。

- `responseManager` Skeet Worker からの返り値に関する GraphQL クエリを管理します。

- `taskManager` Skeet Worker へ キューを送る GraphQL クエリを管理します。

## スキーマ駆動開発

Skeet API は Nexus と組み合わせて、Prisma スキーマから GraphQL エンドポイント(リゾルバ)までを自動生成しています。

使用モジュール

- [Nexus Prisma](https://graphql-nexus.github.io/nexus-prisma)

- [Apollo GraphQL](https://www.apollographql.com/)

- [GraphQL Shield](https://the-guild.dev/graphql/shield/docs)

Prisma スキーマ駆動 Scaffold (自動生成) による開発効率の最大化。より少ない管理コストでグローバル規模のスケールを実現しています。

## GitHub Actions による自動デプロイ

Skeet フレームワークでは `Github Actions` を使用して、

CI/CD 環境を構築しています。

`API`, 各 `Worker` ディレクトリの変更を検知し、

変更があった場合には `main` ブランチに `push` するだけでデプロイが完了します。

デプロイの前にテストを実行するので、

万が一テストに失敗した場合にはデプロイがロールバックされるため、

本番環境にはデプロイされません。

これにより、安全で迅速な開発環境のもとプロジェクトを進めることができます。

## CI/CD とは

CI/CD (継続的インテグレーション/継続的デリバリー) とは、アプリケーション開発のステージに自動化を取り入れて、顧客にアプリケーションを提供する頻度を高める手法です。CI/CD から発生した主なコンセプトは、継続的インテグレーション、継続的デリバリー、継続的デプロイメントです。CI/CD は、新規コードの統合によって開発チームや運用チームに生じる問題 (すなわち「インテグレーション地獄」) に対する解決策です。

## Skeet CLI

Skeet には 開発に便利なコマンドがツールが Skeet CLI より呼び出すことができます。
以下、現在のコマンド一覧です。

```bash
$ skeet --help
Usage: skeet [options] [command]

CLI to Skeet TypeScript Serverless Framework

Options:
  -V, --version             output the version number
  -h, --help                display help for command

Commands:
  test
  create <initAppName>      Create Skeet App
  init                      Setup Google Cloud Platform
  server|s                  Run Skeet Server
  deploy                    Deploy to Google Cloud Run
  yarn [options] <yarnCmd>
  add                       Add Comannd
  g|generate                Generate Comannd
  d|delete                  Delete Comannd
  db                        DB Command
  sql                       CloudSQL Comannd
  setup                     Setup Command
  sync                      Sync Command
  docker                    Docker Command
  help [command]            display help for command
```

これらのコマンドは Skeet CLI ツールからアクセスできます。各コマンドの詳細については、コマンド名の後に --help オプションを使用してください。

例えば：

```bash
$ skeet create --help
Usage: skeet create [options] <initAppName>

Create Skeet App

Options:
  -t, --template <template>  Skeet app template to use (default: "typescript")
  -h, --help                 display help for command
```

## Skeet Yarn コマンド

Skeet Yarn コマンドを使用して、API, Worker の package.json にモジュールを追加します。

```bash
$ skeet yarn --help
Usage: skeet yarn [options] <yarnCmd>

Arguments:
  yarnCmd                  dev,install,build,start,add

Options:
  --service <serviceName>  Skeet Service Name (default: "")
  -p, --p <packageName>    npm package name (default: "")
  -D                       Dependency environment (default: false)
  -h, --help               display help for command
```

npm モジュール、`bs58` を追加する場合

```bash
$ skeet yarn install -p bs58
? Select Services to run yarn command (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  = Services =
❯◯ api
```

スペースボタンで選択し、エンターキーで実行します。
Worker がある場合、複数のアプリに同時に選択することができます。

## Skeet Sync コマンド

Skeet Sync コマンドを使って、Google Cloud の設定と

skeet-cloud.config.json の設定を同期します。

```bash
$ skeet help sync
Usage: skeet sync [options] [command]

Sync Command

Options:
  -h, --help      display help for command

Commands:
  type
  gcloud
  actions
  env
  armor
  sql
  taskQueue
  runUrl
  help [command]  display help for command
```
