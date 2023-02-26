import Container from '@/components/common/atoms/Container'
import ScrollSyncToc from '@/components/articles/ScrollSyncToc'
import Image from 'next/image'
import type { BlogContent } from '@/types/article'

type Props = {
  article: BlogContent
  articleHtml: string
}

export default function BlogContents({ article, articleHtml }: Props) {
  return (
    <>
      <Container>
        <div className="flex justify-center py-12 lg:gap-12">
          <div>
            <h1 className="text-4xl font-bold">{article.title}</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-200">
              {article.date}
            </p>
            <div className="py-8">
              <Image
                src={article.thumbnail}
                alt={article.title}
                width="16"
                height="9"
                className="aspect-[16/9] w-full bg-gray-100 object-cover group-hover:opacity-80 sm:aspect-[2/1] lg:aspect-[3/2]"
                unoptimized
              />
            </div>
            <div className="py-8 lg:hidden">
              <ScrollSyncToc rawMarkdownBody={article.content} />
            </div>
            <div className="prose dark:prose-invert lg:prose-lg">
              <div dangerouslySetInnerHTML={{ __html: articleHtml }} />
            </div>
          </div>
          <div className="relative hidden pt-24 lg:block">
            <ScrollSyncToc rawMarkdownBody={article.content} />
          </div>
        </div>
      </Container>
    </>
  )
}
