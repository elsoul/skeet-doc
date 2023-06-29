import { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import Container from '@/components/common/atoms/Container'
import YouTubeEmbed from '@/components/utils/YouTubeEmbed'

export default function SkeetTutorialYouTubeRow() {
  const { t, i18n } = useTranslation()
  const isJapanese = useMemo(() => i18n.language === 'ja', [i18n])

  return (
    <>
      <Container className="pb-48 pt-20 lg:pb-60">
        <YouTubeEmbed embedId={isJapanese ? '6em68qcSsJE' : '6em68qcSsJE'} />
      </Container>
    </>
  )
}
