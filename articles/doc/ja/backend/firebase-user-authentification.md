---
id: firebase-user-authentification
title: Firebase ユーザー登録・認証
description: ここでは Google Cloud Firebase ID トークンによるユーザー登録・ログイン認証方法について説明します。
---

## Firebase ID Token Authentification

Skeet フレームワークではログイン認証に Firebase ID トークン認証を使用しています。

Firebase ID トークンについては以下のリンクを参考にしてください。

[Firebase ID トークンを検証する](https://firebase.google.com/docs/auth/admin/verify-id-tokens)

## ユーザーログイン Mutation

Firebase Authentification を使って、

ユーザーが存在しなければ登録、ユーザーが存在すればログイン、

という処理を定義します。
