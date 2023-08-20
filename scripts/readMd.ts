import { VertexAI, VertexPromptParams } from '@skeet-framework/ai'
import { readFileSync } from 'fs'

export const readMd = async (path: string) => {
  const content = readFileSync(path, 'utf-8')
  const units = extractSectionsFromReadme(path)
  const content1 = readFileSync('scripts/prompts/content1.md', 'utf-8')
  const content2 = readFileSync('scripts/prompts/content2.md', 'utf-8')
  const output1 = await import('scripts/prompts/output1.json')
  const output2 = await import('scripts/prompts/output2.json')
  const vertexAi = new VertexAI({
    maxOutputTokens: 1000,
  })
  const prompt: VertexPromptParams = {
    context: `
あなたはドキュメントに記載されているソフトウェアに関するスペシャリストなモデルを作るためのAIのプロンプトを作成するスペシャリストです。ドキュメントなどの.mdファイルの中身に対して最も適切なレスポンスを生成する能力があります。# がある部分の文章が疑問系ではない場合、逆説や疑問形にし、inputの文章を生成するようにして下さい。最終目的は良い、モデルを作るためのQ&Aを生成していくことです。私の質問には以下のJSON形式で答えるようにしてください。
---ts    
export type VertexExample = {
    input: string;
    output: string;
}
---
`,
    examples: [
      {
        input: {
          content: content1,
        },
        output: {
          content: JSON.stringify(output1.default, null, 2),
        },
      },
      {
        input: {
          content: content2,
        },
        output: {
          content: JSON.stringify(output2.default, null, 2),
        },
      },
    ],
    messages: [
      {
        author: 'user',
        content,
      },
    ],
  }
  const result = await vertexAi.prompt(prompt)
  console.log(result)
  return result
}
export const extractSectionsFromReadme = (path: string) => {
  const content = readFileSync(path, 'utf-8')
  const lines = content.split('\n')

  let sections = []
  let currentSection = []
  let isInsideCodeBlock = false
  let isFirstSection = true

  for (const line of lines) {
    // コードブロックの開始または終了をチェック
    if (line.trim().includes('```')) {
      isInsideCodeBlock = !isInsideCodeBlock
    }

    // 新しいセクションが始まる場合
    if (line.startsWith('#') && !isInsideCodeBlock) {
      if (currentSection.length > 0) {
        // 最初のセクションを除外
        if (!isFirstSection) {
          sections.push(currentSection.join('\n').trim())
        } else {
          isFirstSection = false
        }
        currentSection = []
      }
    }
    currentSection.push(line)
  }

  // 最後のセクションを配列に追加
  if (currentSection.length > 0) {
    sections.push(currentSection.join('\n').trim())
  }
  return sections
}

//readMd('articles/doc/ja/backend/quickstart.md')
//console.log(extractSectionsFromReadme('articles/doc/ja/backend/quickstart.md'))
