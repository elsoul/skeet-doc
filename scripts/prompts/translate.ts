import { SkeetAI, generatePrompt } from '@skeet-framework/ai'
import { appendFileSync, writeFileSync } from 'fs'
import { extractSectionsFromReadme } from 'scripts/readMd'

export const translatePrompt = (langFrom = 'ja', langTo = 'en') => {
  return {
    context: `以下のようなマークダウン形式のドキュメントを翻訳して下さい。
翻訳前の文章の言語： ${langFrom}
翻訳後の文章の言語： ${langTo}
必須条件： # の数がは変更せずに、翻訳して下さい。マークダウン形式では # は見出しを表します。# の数が変わると見出しのレベルが変わってしまいます。
追加条件： 改善できる文章があれば改善して下さい。
出力形式： マークダウン形式のドキュメント`,
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
}

const ai = new SkeetAI({
  ai: 'OpenAI',
  maxTokens: 1000,
})
const translateDocument = async (
  content: string,
  langFrom = 'ja',
  langTo = 'en'
) => {
  const promptTranslate = translatePrompt(langFrom, langTo)
  const prompt = generatePrompt(
    promptTranslate.context,
    promptTranslate.examples,
    content,
    'OpenAI'
  )
  const res = await ai.aiInstance.prompt(prompt)
  console.log(res)
  return res
}

const langFrom = 'ja'
const langTo = 'en'

const translateDocuments = async (
  paths: string[],
  langFrom = 'ja',
  langTo = 'en'
) => {
  let i = 0
  console.log(`From ${langFrom} to ${langTo}`)
  const outputPaths = []
  for (const path of paths) {
    console.log(`Translating document: ${i + 1}/${paths.length} paths`)
    const sections = extractSectionsFromReadme(path)
    let j = 0
    const outputPath = path.replace('.md', `-${langTo}.md`)
    outputPaths.push(outputPath)
    const mdContents = []
    for (const section of sections) {
      console.log(`Translating section: ${j + 1}/${sections.length}`)

      const translatedContent = await translateDocument(
        section,
        langFrom,
        langTo
      )
      mdContents.push(translatedContent)
      appendFileSync('test.md', translatedContent)
      console.log(translatedContent)
      j++
    }
    writeFileSync(outputPath, mdContents.join('\n\n'))
    i++
  }
  console.log('Generated documents: ', outputPaths)
}

const run = async () => {
  const langFrom = 'ja'
  const langTo = 'en'
  const paths = ['articles/doc/ja/skeet-graphql/tutorial.md']
  await translateDocuments(paths, langFrom, langTo)
}

run()
