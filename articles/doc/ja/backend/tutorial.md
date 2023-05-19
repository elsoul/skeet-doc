---
id: tutorial
title: チュートリアル
description: Skeet Framework を使ってチャットアプリを作成するチュートリアルです。
---

## チュートリアル

このチュートリアルでは Skeet Framework を使ってチャットアプリを作成します。
プログラミング言語 TypeScript と Firebase Firestore, GitHub を含めた総合的なクラウドアプリの開発チュートリアルです。

このチュートリアルでは 基本的なチャットボットアプリ を作成します。 **自分はチャットボットを作りたいのではないから、と飛ばしたくなるかもしれませんが、是非目を通してみてください。** このチュートリアルで学ぶ技法はどのような Skeet Framework のアプリにおいても基本的なものであり、マスターすることで Skeet への深い理解が得られます。

このチュートリアルは 次のセクションに分割されています。

- ユーザー認証・ログイン機能の実装
- チャット機能の実装 - Skeet プラグイン
- Firebase Functions の追加
- モデルの追加・同期
- 型定義の追加・同期
- ルーティングの追加・同期

Skeet Framework では エディタに VScode を推奨しています。
このチュートリアルでは VScode を使って進めていきます。

フレームワークに沿って開発を進めることで、
GitHub Copilot を使った強力なコード補完サポートを受けることができます。

- [VScode](https://code.visualstudio.com/)
- [GitHub Copilot](https://copilot.github.com/)

## チュートリアルの前提条件

このチュートリアルを進めるには次のものが必要です。

- [Node.js](https://nodejs.org/ja/) 18.16.0 以上
- [Yarn](https://yarnpkg.com/) 1.22.19 以上
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) 430.0.0 以上
- [Firebase CLI](https://firebase.google.com/docs/cli) 12.0.1 以上
- [GitHub CLI](https://cli.github.com/) 2.29.0 以上

また、[最初のデプロイ](/backend/initial-deploy) が完了していない場合は、

- Google Cloud プロジェクトの作成
- Firebase プロジェクトの作成

を完了してください。

## ユーザー認証・ログイン機能の実装

Firebase エミュレーターを起動します。

```bash
$ skeet s
```

別ウィンドウで次のコマンドを実行します。

```bash
$ skeet yarn dev:login
  },
  accessToken: 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJlbWFpbCI6ImVsc291bC1sYWJvQGV4YW1wbGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJhdXRoX3RpbWUiOjE2ODQ1MTM3ODAsInVzZXJfaWQiOiI1V2NBNHo1bDd4WVk0ZWZnQ2tsVG5leThqREQ1IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJlbHNvdWwtbGFib0BleGFtcGxlLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn0sImlhdCI6MTY4NDUxMzc4MCwiZXhwIjoxNjg0NTE3MzgwLCJhdWQiOiJlcGljcy1iZXRhIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2VwaWNzLWJldGEiLCJzdWIiOiI1V2NBNHo1bDd4WVk0ZWZnQ2tsVG5leThqREQ1In0.',
  displayName: null,
  email: 'elsoul-labo@example.com',
  emailVerified: false,
  phoneNumber: null,
  photoURL: null,
  isAnonymous: false,
  tenantId: null,
  providerData: [
    {
      providerId: 'password',
      uid: 'elsoul-labo@example.com',
      displayName: null,
      email: 'elsoul-labo@example.com',
      phoneNumber: null,
      photoURL: null
    }
  ],
  metadata: UserMetadata {
    createdAt: '1684513780143',
    lastLoginAt: '1684513780154',
    lastSignInTime: 'Fri, 19 May 2023 16:29:40 GMT',
    creationTime: 'Fri, 19 May 2023 16:29:40 GMT'
  }
}
Created User: {"uid":"5WcA4z5l7xYY4efgCklTney8jDD5","username":"","email":"elsoul-labo@example.com","iconUrl":""}
✨  Done in 1.05s.
```

コンソールに accessToken が表示されます。
この accessToken を使ってユーザー認証を行います。

```typescript
import { getUserAuth } from '@/lib'

const user = await getUserAuth(accessToken)
```

## チャット機能の実装 - Skeet プラグイン

## Firebase Functions の追加

## モデルの追加・同期

## 型定義の追加・同期

## ルーティングの追加・同期
