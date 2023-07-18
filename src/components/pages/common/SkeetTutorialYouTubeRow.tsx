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
        <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="bg-gradient-to-tl from-red-600 via-orange-500 to-yellow-400 bg-clip-text text-base font-semibold leading-7 text-transparent">
              {t('common:SkeetTutorialYouTubeRow.subtitle')}
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {t('common:SkeetTutorialYouTubeRow.title')}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
              {t('common:SkeetTutorialYouTubeRow.description')}
            </p>
          </div>
        </div>
        <div className="shadow-2xl">
          <YouTubeEmbed embedId={isJapanese ? '6em68qcSsJE' : '6em68qcSsJE'} />
        </div>
      </Container>
    </>
  )
}
