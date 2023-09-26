---
  id: skeet-ai-function
  title: Skeet AI Function モード
  description: skeet ai function モード
---

Function モードでは、Firebase Functions を自動生成することができます。

## Skeet AI YouTube - 7/7. Function モードの使い方（動画）

YouTube 動画リンク: https://www.youtube.com/watch?v=pmpR4imC3go

[![Functionモードの使い方](https://storage.googleapis.com/skeet-assets/imgs/youtube/skeet-ai-function-ja-7.png)](https://www.youtube.com/watch?v=pmpR4imC3go)

## Function モードの起動

```bash
You: $ function
Skeet:
🔥 Firebase Function 生成モード 🔥
? Firebase Function インスタンスタイプを選択 (Use arrow keys)
❯ http - HTTPリクエストによってトリガーされます
  auth - ユーザー認証イベントによってトリガーされます
  firestore - Firestoreイベントによってトリガーされます
  pubsub - PubSubイベントによってトリガーされます
  schedule - スケジュールイベントによってトリガーされます
```

選択したテンプレートが自動生成されます。
