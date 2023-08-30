import { SkeetAI, generatePrompt } from '@skeet-framework/ai'

export const translatePrompt = {
  context: `以下のような日本語のマークダウン形式のドキュメントを英語に翻訳して下さい。さらに改善できる文章があれば改善して下さい。
出力はマークダウン形式で出力してください。`,
  examples: [
    {
      input: `## Skeet CLI のインストール

Skeet CLI は Skeet フレームワークを効率的に利用するためのコマンドラインツールです。以下のコマンドでインストールできます。

\`\`\`bash
$ npm i -g @skeet-framework/cli
\`\`\``,
      output: `# Installing Skeet CLI

Skeet CLI is a command line tool for efficiently using the Skeet framework. You can install it with the following command.
\`\`\`bash
$ npm i -g @skeet-framework/cli
\`\`\``,
    },
    {
      input: `# 特徴

すべての CRUD 操作は Firestore コンバーターをサポートします。
createdAt および updatedAt は Firebase ServerTimestamp で自動的にドキュメントに追加されます。

- [x] コレクションアイテムの追加
- [x] 複数のコレクションアイテムの追加
- [x] コレクションアイテムの取得
- [x] コレクションアイテムのクエリ
- [x] コレクションアイテムの更新
- [x] コレクションアイテムの削除`,
      output: `## Features
All CRUD operations are supported with Firestore converters. The createdAt and updatedAt fields are automatically added to documents using Firebase ServerTimestamp.

- [x] Adding collection items
- [x] Adding multiple collection items
- [x] Retrieving collection items
- [x] Querying collection items
- [x] Updating collection items
- [x] Deleting collection items`,
    },
  ],
}

const ai = new SkeetAI({
  ai: 'OpenAI',
  maxTokens: 1000,
})
const run = async () => {
  const prompt = generatePrompt(
    translatePrompt.context,
    translatePrompt.examples,
    `## Skeet GraphQL の基本構造

Skeet GraphQL は 以下のパッケージを使用しています。

- [GraphQL](https://graphql.org/)
- [Apollo Server](https://www.apollographql.com/)
- [Prisma](https://www.prisma.io/)
- [Nexus](https://nexusjs.org/)
- [GraphQL Shield](https://the-guild.dev/graphql/shield)

_graphql_ ディレクトリ以下に Cloud Functions for Firebase のプロジェクトが配置されます。`,
    'OpenAI'
  )
  const res = await ai.aiInstance.prompt(prompt)
  console.log(res)
}
run()
