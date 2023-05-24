---
id: initial-deploy
title: 最初のデプロイ
description: 最初のデプロイを完了させると その後のコミットから CI/CD による自動デプロイが発動します。
---

この章では _skeet-chatbot_ というプロジェクト名で進めます。
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

## Gcloud CLI Auth ログイン

```bash
$ gcloud auth application-default login
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

1. リージョンの選択
2. GitHub リポジトリを指定
3. ネームサーバーのドメイン設定
4. ロードバランサーのサブドメイン設定

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

## Firebase Config の設定

設定完了後、Firebase Config をコピーしておきます。

コピーしたファイルを

`src/lib/firebaseConfig.ts`

に貼り付けます。

```javascript
const firebaseConfig = {
  apiKey: 'AIzaSyAwyELQ5bUI4O1QlIbn9vTR72-fDd4dUFw',
  authDomain: 'skeet-chatbot.firebaseapp.com',
  projectId: 'skeet-chatbot',
  storageBucket: 'skeet-chatbot.appspot.com',
  messagingSenderId: '316270971170',
  appId: '1:316270971170:web:e1bc11b3e70fb840b97d7b',
  measurementId: 'G-XP8HM3X7LS',
}
```

これで Firebase エミュレーターを起動中に

```bash
$ skeet login
```

コマンドが使えるようになりました。
