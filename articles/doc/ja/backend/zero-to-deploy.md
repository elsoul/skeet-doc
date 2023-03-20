---
id: zero-to-deploy
title: ゼロからデプロイまで
description: この章では Skeet TypeScript Serverless Framework をゼロから Google Cloud Platform へデプロイする方法を説明します。
---

## ゼロ to デプロイ

## Google Cloud のプロジェクトを作成する

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

## 最初のデプロイ - skeet init

```bash
$ skeet init
```

対話式プロンプトで以下の設定を行ます。

- GitHub リポジトリ名
- Google Cloud SQL パスワード
- Google Cloud ロードバランサー

ロードバランサーが true の場合

- Domain Address
- Domain's Google Cloud Project ID

初めて Google Cloud DNS で設定を行う場合はコンソールに出力される
ネームサーバーのアドレスをコピーして、
管理元の DNS 設定を更新してください。

すでに Google Cloud DNS でドメインを管理している場合は 設定されている Google Cloud DNS の Project ID を指定するだけで何もする必要はありません。

![Skeet Init](https://storage.googleapis.com/skeet-assets/animation/skeet-init-compressed.gif)

## Cloud の設定ファイル

デプロイされたクラウドの設定は

`./skeet-cloud.config.json`　に出力されます。

変更することで、

- メモリ
- CPU
- maxConcurrency
- maxInstances
- minInstances

など、クラウドの設定を更新することができます。

```json
{
  "api": {
    "appName": "skeet-example",
    "projectId": "skeet-example",
    "region": "europe-west4",
    "hasLoadBalancer": true,
    "cloudRun": {
      "name": "skeet-skeet-example-api",
      "url": "https://api-example.skeet.dev",
      "cpu": 1,
      "maxConcurrency": 80,
      "maxInstances": 100,
      "minInstances": 0,
      "memory": "4Gi"
    },
    "db": {
      "databaseVersion": "POSTGRES_14",
      "cpu": 1,
      "memory": "3840MiB",
      "storageSize": 10,
      "whiteList": "x.x.x.x"
    }
  },
  "workers": [
    {
      "workerName": "solana-transfer",
      "cloudRun": {
        "name": "skeet-skeet-example-worker-solana-transfer",
        "url": "https://skeet-skeet-example-worker.run.app",
        "cpu": 1,
        "maxConcurrency": 80,
        "maxInstances": 100,
        "minInstances": 0,
        "memory": "4Gi"
      }
    }
  ],
  "taskQueues": [],
  "cloudArmor": [
    {
      "securityPolicyName": "skeet-skeet-example-armor",
      "rules": [
        {
          "priority": "10",
          "description": "Allow Your Home IP addresses",
          "options": {
            "src-ip-ranges": "x.x.x.x",
            "action": "allow"
          }
        },
        {
          "priority": "100",
          "description": "Defense from SQLi attack",
          "options": {
            "action": "deny-403",
            "expression": "evaluatePreconfiguredExpr('sqli-stable')"
          }
        },
        {
          "priority": "200",
          "description": "Defense from XSS attack",
          "options": {
            "action": "deny-403",
            "expression": "evaluatePreconfiguredExpr('xss-stable')"
          }
        },
        {
          "priority": "300",
          "description": "Defense from NodeJS attack",
          "options": {
            "action": "deny-403",
            "expression": "evaluatePreconfiguredExpr('nodejs-v33-stable')"
          }
        },
        {
          "priority": "2147483647",
          "description": "Deny All IP addresses",
          "options": {
            "action": "deny-403"
          }
        }
      ]
    }
  ]
}
```

## デプロイ 更新

Skeet では デプロイに２つの方法があります。

### 1. GitHub Actions を使用した CI/CD

通常のデプロイはこちらを使うことを推奨します。

Commit and Push すると CI/CD が起動します。

```bash
$ git add .
$ git commit -m 'first deploy'
$ git push origin main
```

### 2. Skeet Deploy コマンド

本番環境に即時に反映させたい場合や、
Skeet Worker クラウドのスペックを更新する場合に使用します。

```bash
$ skeet deploy
? Select Services to deploy (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  = Services =
❯◯ api
 ◯ solana-transfer
```

更新するサービスをスペースボタンで選択し、
Enter を入力します。

![Skeet Deploy](https://storage.googleapis.com/skeet-assets/animation/skeet-deploy-compressed.gif)
