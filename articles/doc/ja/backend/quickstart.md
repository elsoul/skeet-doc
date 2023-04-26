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
- [Docker](https://www.docker.com/)
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
$ skeet s
```

Now you can access;

`http://localhost:4000/`

## ゼロからデプロイ

### プロジェクト Init

```bash
$ skeet init
```

### アプリ全体をデプロイ

```bash
$ skeet deploy
```

![Skeet Deploy](https://storage.googleapis.com/skeet-assets/animation/skeet-deploy-compressed.gif)

### Cloud Functions の追加

```bash
$ skeet add functions <functionName>
```

## Skeet CLI

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
  deploy                    Deploy Skeet App
  init [options]
  iam                       Skeet IAM Comannd
  vpc                       Setup VPC for Google Cloud Platform
  yarn [options] <yarnCmd>
  add                       Add Comannd
  list                      Show Skeet App List
  help [command]            display help for command
```
