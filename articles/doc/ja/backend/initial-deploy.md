---
id: initial-deploy
title: 最初のデプロイ
description: Skeet アプリを公開する方法について説明します。GitHub ActionsによるCommit毎のデプロイもワンコマンドで設定できます。
---

この章では _skeet-demo_ というプロジェクト名で進めます。
チュートリアルではここで作成したプロジェクトを使用します。

## Firebase CLI のインストール

```bash
$ npm install -g firebase-tools
```

## Skeet CLI のインストール

```bash
$ npm install -g @skeet-framework/cli
```

## GitHub CLI Auth ログイン

```bash
$ gh auth login
```

## Google Cloud プロジェクトの作成

これまで Google Cloud を使ったことがない方はこちらのリンクを参考にプロジェクトを作成しましょう。

[プロジェクトの作成方法](https://cloud.google.com/resource-manager/docs/creating-managing-projects)

※プロジェクトに対して請求アカウントの設定も必要です。

## Gcloud CLI Auth ログイン

```bash
$ gcloud auth login
```

## Firebase プロジェクトの作成

これまで Google Firebase を使ったことがない方はこちらのリンクを参考にプロジェクトを作成しましょう。

[プロジェクトの作成方法](https://firebase.google.com/docs/projects/learn-more?hl=ja)

## Skeet Framework プロジェクトの作成

```bash
$ skeet create skeet-chatbot
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

## Firebase エミュレーターの起動

```bash
$ skeet s
```

http://localhost:4000 にアクセスしてみましょう。

Firebase UI が表示されれば成功です。

## Firebase Web APP の追加

Firebase プロジェクトの設定画面から Web APP を追加します。

設定完了後、Firebase Config をコピーしておきます。

コピーしたファイルを

`src/lib/firebaseConfig.ts`

に貼り付けてください。

これで Firebase エミュレーターを起動中に

```bash
$ skeet login
```

コマンドが使えるようになりました。
