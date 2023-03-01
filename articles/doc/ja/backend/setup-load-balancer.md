---
id: setup-load-balancer
title: ロードバランサーの設定 - Google Cloud Load Balancer
description: ここではロードバランサーの使用方法について説明します。
---

## ロードバランサーの設定

予めドメインを取得し、ネームサーバーの設定の準備をしてください。
ドメイン名は example.com または api.example.com のようなサブドメインを使用することができます。

```bash
$ skeet setup lb <YOUR_DOMAIN>
```

※ すでに`skeet init` でロードバランサーの設定をしている場合は必要ありません。
