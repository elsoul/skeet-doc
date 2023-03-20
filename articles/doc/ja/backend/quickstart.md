---
id: backend-quickstart
title: クイックスタート
description: Skeet フレームワーク バックエンド クイックスタート
---

## 依存パッケージのインストール

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
$ skeet create <appName>
```

## ローカルで起動

```bash
$ cd <appName>
$ skeet s
```

GraphQL API が立ち上がります。

[http://localhost:4000/graphql](http://localhost:4000/graphql)

![Skeet Create](https://storage.googleapis.com/skeet-assets/animation/skeet-create-compressed.gif)
