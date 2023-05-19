---
id: backend-quickstart
title: クイックスタート
description: Skeet フレームワーク バックエンド クイックスタート
---

## What's Skeet?

フルスタック TypeScript サーバーレスアプリケーションフレームワーク 'Skeet'。

Skeet はソフトウェア開発・運用のコストを下げるために生まれました。

サーバーレスアプリをすぐに開発スタート、そしてデプロイ。

スケーラブルな Cloud Firestore、Cloud Functions を今すぐ安全に使い始める準備ができています。

![https://storage.googleapis.com/skeet-assets/animation/skeet-cli-create.gif](https://storage.googleapis.com/skeet-assets/animation/skeet-cli-create.gif)

## Dependency

- [TypeScript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Google SDK](https://cloud.google.com/sdk/docs)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [GitHub CLI](https://cli.github.com/)

## クラウドネットワーク構成

Google Cloud の VPC 設定やセキュリティ目的の Cloud Armor 等セキュリティに最低限必要な設定は自動で完了します。

- Firewall
- VPC Network
- Subnet Network
- VPC Connector
- Load Balancer
- Cloud Armor
- Cloud DNS

## 使い方

### Skeet CLI のインストール

```bash
$ npm i -g @skeet-framework/cli
```

### Skeet アプリの作成

```bash
$ skeet create ${appName}
```

### ローカルで起動

```bash
$ cd ${appName}
$ skeet s
```

Firebase エミュレーターが起動します。

[http://localhost:4000/](http://localhost:4000/)

## Skeet CLI

Skeet CLI を使って新たに Firebase functions を追加したり、
Loadbalancer の Routing などを自動に行うことができます。

コマンド一覧

```bash
$ skeet --help
Usage: skeet [options] [command]

CLI for Skeet - Full-stack TypeScript Serverless framework

Options:
  -V, --version             output the version number
  -h, --help                display help for command

Commands:
  create <appName>          Create Skeet App
  server|s                  Run Skeet Server
  deploy                    Deploy Skeet APP to Google Cloud Platform
  init [options]            Generate Skeet Cloud Config
  iam                       Skeet IAM Comannd
  vpc                       Setup VPC for Google Cloud Platform
  yarn [options] <yarnCmd>
  add                       Add Comannd
  sync                      Skeet Sync Comannd
  delete|d                  Skeet Delete Command
  list                      Show Skeet App List
  help [command]            display help for command
```

## Skeet コマンドのサンプル

Skeet CLI を使って新たに Firebase functions を追加したり、
yarn コマンドを 各ファンクションごとに実行することができます。

### Skeet Yarn Install/Build

```bash
$ skeet yarn install/build
? Select Services to run yarn command (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  = Services =
❯◯ openai
 ◯ solana
```

### Add Yarn Package

指定したパッケージを選択したファンクションにインストールします。

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

### Skeet デプロイコマンド

```bash
$ skeet deploy
? Select Services to run yarn command (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  = Services =
❯◯ openai
 ◯ solana
```

![Skeet Deploy](https://storage.googleapis.com/skeet-assets/animation/skeet-deploy-compressed.gif)

### Cloud Functions の追加

```bash
$ skeet add functions <functionName>
```
