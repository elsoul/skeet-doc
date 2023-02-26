import { ReactElement } from 'react'
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import DefaultLayout from '@/layouts/default/DefaultLayout'
import HeroRow from '@/components/pages/home/HeroRow'

const seo = {
  pathname: '/',
  title: {
    ja: 'トップページ',
    en: 'Top page',
  },
  description: {
    ja: 'そのアイデア、すぐに始めましょう。アプリ公開の準備はできています。ワン・コマンドでクラウドへのデプロイやCI / CDの設定を完了できます。',
    en: "Let's start that idea immediately. You are ready to release the app. With one command, you can complete deployment to the cloud and CI / CD settings.",
  },
  img: null,
}

const getStaticProps = makeStaticProps(['common', 'home'], seo)
export { getStaticPaths, getStaticProps }

export default function Home() {
  return (
    <>
      <HeroRow />
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
