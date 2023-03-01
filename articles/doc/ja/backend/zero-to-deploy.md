---
id: zero-to-deploy
title: ゼロからデプロイまで
description: この章では Skeet TypeScript Serverless Framework をゼロから Google Cloud Platform へデプロイする方法を説明します。
---

## ゼロ to デプロイ

### Google Cloud のプロジェクトを作成する

これまで Google Cloud を使ったことがない方はこちらのリンクを参考にプロジェクトを作成しましょう。

[プロジェクトの作成方法](https://cloud.google.com/resource-manager/docs/creating-managing-projects)

:::div{.success}
はじめての方はもちろん、既に Google Cloud を使用中の方も

以下のリンクから $200 分の無料クレジットを獲得することができます。

[Google Cloud クレジットリンク](https://cloud.google.com/partners/partnercredit?pcn_code=0014M00001h3BjPQAU)
:::

## Gcloud Auth ログイン

```bash
$ gcloud auth application-default login
```

## Github CLI Auth ログイン

```bash
$ gh auth login
```

### Git Init

```bash
$ skeet init
```

![Skeet Init](https://storage.googleapis.com/skeet-assets/animation/skeet-init-compressed.gif)

### Commit and Push すると CI/CD が起動します

```bash
$ git add .
$ git commit -m 'first deploy'
$ git push origin main
```
