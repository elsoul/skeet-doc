---
id: backend-quickstart
title: クイックスタート
description: Skeet フレームワーク バックエンド クイックスタート
---

## 依存パッケージ

- [TypeScript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Google SDK](https://cloud.google.com/sdk/docs)
- [Docker](https://www.docker.com/)
- [GitHub CLI](https://cli.github.com/)
- [Git Crypt](https://github.com/AGWA/git-crypt)

## Skeet をインストール

```bash
$ npm i -g skeet
```

## Skeet API の作成

```bash
$ skeet create ${appName}
```

![Skeet Create](https://storage.googleapis.com/skeet-assets/animation/skeet-create-compressed.gif)

## ローカルで起動

```bash
$ skeet s
```

GraphQL API が立ち上がります。

`http://localhost:4000/graphql`

## ゼロ to デプロイ

### Git Init

```bash
$ skeet git init
```

### first commit する

```bash
$ git add .
$ git commit -m "first commit"
```

### Create/Push GitHub Repo

```bash
$ skeet git create elsoul/skeet
```

オープンソースで公開する場合は下記

```bash
$ skeet git create elsoul/skeet --public
```

### Google Cloud IAM のセットアップ

```bash
$ skeet setup gcp
```

### Google CloudSQL の作成

```bash
$ skeet sql create
```

### Secret ENV を GitHub Secrets に同期する

```bash
$ skeet sync env
```

### Commit and Push すると CI/CD が起動します

```bash
$ git add .
$ git commit -m 'first deploy'
$ git push origin main
```

## コマンドによるデプロイ

### グローバル IP を DB ホワイトリストに登録する

あなたのグローバル IP を DB ホワイトリストに登録し、 `./skeet-cloud.config.json`にも保存します。

```bash
$ skeet add ip
```

### DB マイグレーション

```bash
$ skeet db deploy --production
```

### Google Cloud Run にデプロイ

```bash
$ skeet deploy
```

![Skeet Deploy](https://storage.googleapis.com/skeet-assets/animation/skeet-deploy-compressed.gif)
