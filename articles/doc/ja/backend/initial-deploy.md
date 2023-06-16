---
id: initial-deploy
title: 最初のデプロイ
description: Skeet アプリを公開する方法について説明します。GitHub ActionsによるCommit毎のデプロイもワンコマンドで設定できます。
---

この章では _skeet-demo_ というプロジェクト名で進めます。
チュートリアルではここで作成したプロジェクトを使用します。

## GitHub CLI Auth ログイン

```bash
$ gh auth login
```

### Skeet Init コマンドで最初のデプロイ

Skeet init コマンドで以下の設定を行います。

1. プロジェクト ID の選択
1. リージョンの選択
1. GitHub リポジトリ名を指定
1. ネームサーバーのドメイン設定
1. ロードバランサーのサブドメイン設定

```bash
$ skeet init
```

このコマンドにより

- GitHub リポジトリの作成
- GitHub リポジトリへコミット・プッシュ
- GitHub リポジトリの Actions の設定
- GitHub リポジトリの Secrets の設定
- Google Gloud IAM の設定
- Google Cloud DNS の設定
- Google Cloud Load Balancer の設定
- Google Cloud Armor の設定
- Google Cloud VPC Network の設定
- Google Cloud VPC Subnet Network の設定
- Google Cloud VPC Connector の設定

を自動で行います。

設定が完了するとコンソールログにネームサーバーのドメイン設定が表示されます。

```bash
nameServers:
- ns-cloud-dx.googledomains.com.
- ns-cloud-dx.googledomains.com.
- ns-cloud-dx.googledomains.com.
- ns-cloud-dx.googledomains.com.
visibility: public
```

## ネームサーバーの設定

上記で表示された４つのレコードをドメインのネームサーバーに設定します。
設定完了後３０分〜２時間程度でドメインの設定が反映されます。（ネームサーバーの設定によって異なります）

これで最初のデプロイが完了しました。

https://your-domain.com/root にアクセスしてみましょう。

```json
{
  "status": "success",
  "message": "Skeet APP is running!"
}
```

と表示されれば成功です。

## ルーティングの追加・同期

```bash
$ skeet sync routings
```

このコマンドにより、

- ネットワークエンドポイントグループの作成
- バックエンドサービスの作成
- バックエンドサービスの追加
- セキュリティーポリシーの適用
- URL マップの作成

を自動で行っています。

## Cloud Armor の追加・同期

_skeet-cloud.config.json_ に記述されている Cloud Armor の設定を同期します。

_skeet-cloud.config.json_

```json
{
  "app": {
    "name": "skeet-example",
    "projectId": "skeet-example",
    "region": "asia-northeast1",
    "appDomain": "skeeter.app",
    "functionsDomain": "lb.skeeter.app"
  },
  "cloudArmor": [
    {
      "securityPolicyName": "skeet-skeet-example-armor",
      "rules": [
        {
          "priority": "10",
          "description": "Allow Your Home IP addresses",
          "options": {
            "src-ip-ranges": "your IP address",
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

デフォルトの設定では 現在接続しているグローバル IP のみ通信を許可しています。
必要に応じて変更してください。

```bash
$ skeet sync armors
```

新規に Google Cloud Armor を作成または、更新されます。
