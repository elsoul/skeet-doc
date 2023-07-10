import { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import Container from '@/components/common/atoms/Container'
import YouTubeEmbed from '@/components/utils/YouTubeEmbed'

export default function SkeetTutorialYouTubeRow() {
  const { t, i18n } = useTranslation()
  const isJapanese = useMemo(() => i18n.language === 'ja', [i18n])

  return (
    <>
      <Container className="pb-48 pt-48 lg:pb-60">
        <h3 className="font-display mx-auto mb-8 max-w-4xl text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:mb-12 sm:text-5xl">
          YouTube Tutorial
        </h3>
        <YouTubeEmbed embedId={isJapanese ? '6em68qcSsJE' : '6em68qcSsJE'} />
      </Container>
    </>
  )
}