import { OpenAI, OpenAIPromptParams } from '@skeet-framework/ai'
import { readFileSync, rm, rmSync, writeFileSync } from 'fs'
import { extractSectionsFromReadme } from './readMd'

export const readMd = async (path: string) => {
  const units = extractSectionsFromReadme(path)
  console.log(`Total Section: ${units.length}`)
  const fileName = path.split('/').pop()?.replace('.md', '')
  const content1 = readFileSync('scripts/prompts/content1.md', 'utf-8')
  const content2 = readFileSync('scripts/prompts/content2.md', 'utf-8')
  const output1 = await import('scripts/prompts/output1.json')
  const output2 = await import('scripts/prompts/output2.json')
  const vertexAi = new OpenAI({
    maxTokens: 2000,
    model: 'gpt-4',
  })
  let i = 0
  for await (const unit of units) {
    const prompt: OpenAIPromptParams = {
      messages: [
        {
          role: 'system',
          content: `
    あなたはドキュメントに記載されているソフトウェアに関するスペシャリストなモデルを作るためのAIのプロンプトを作成するスペシャリストです。ドキュメントなどの.mdファイルの中身に対して最も適切なレスポンスを生成する能力があります。# がある部分の文章が疑問系ではない場合、逆説や疑問形にし、inputの文章を生成するようにして下さい。最終目的は良い、モデルを作るためのQ&Aを生成していくことです。私の質問には以下のJSON形式で答えるようにしてください。
    ---ts
    export type VertexExample = {
        input: string;
        output: string;
    }
    ---
            `,
        },
        {
          role: 'user',
          content: content1,
        },
        {
          role: 'assistant',
          content: JSON.stringify(output1.default, null, 2),
        },
        {
          role: 'user',
          content: content2,
        },
        {
          role: 'assistant',
          content: JSON.stringify(output2.default, null, 2),
        },
        {
          role: 'user',
          content: unit,
        },
      ],
    }
    const result = await vertexAi.prompt(prompt)
    i++
    const filePath = `scripts/prompts/${fileName}${i}.json`
    try {
      const outerParsed = JSON.parse(result)
      console.log({ outerParsed })
      // 次に、内側のエスケープされたJSON文字列をパースする
      // const innerParsed = JSON.parse(outerParsed)
      const formattedJson = JSON.stringify(outerParsed, null, 2)
      writeFileSync(filePath, formattedJson)
      console.log(`Generated: \n${filePath}`)
    } catch (e) {
      console.log(`Error: \n${filePath}`)
    }
  }

  const data = []
  for (let i = 1; i < units.length + 1; i++) {
    const filePath = `scripts/prompts/${fileName}${i}.json`
    const file = readFileSync(filePath, 'utf-8')
    const outerParsed = JSON.parse(file)
    for (const message of outerParsed) {
      data.push(message)
    }
  }
  writeFileSync(
    `scripts/prompts/exports/${fileName}Examples.json`,
    JSON.stringify(data, null, 2)
  )
  console.log(`Generated: \n${fileName}Examples.json`)
  for (let i = 1; i < units.length + 1; i++) {
    const filePath = `scripts/prompts/${fileName}${i}.json`
    rmSync(filePath)
  }
  return true
}

const run = async () => {
  // await readMd('articles/doc/ja/general/motivation.md')
  await readMd('articles/doc/ja/skeet-graphql/quickstart.md')
  // await readMd('articles/doc/ja/skeet-firestore/tutorial.md')
  // await readMd('articles/doc/ja/skeet-firestore/quickstart.md')
  // await readMd('articles/doc/ja/skeet-firestore/basic-architecture.md')
}

run()
