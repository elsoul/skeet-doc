import type { ReactNode } from 'react'
import { useEffect, useCallback } from 'react'
import DefaultHeader from './DefaultHeader'
import CommonFooter from '@/layouts/common/CommonFooter'

import { useRouter } from 'next/router'

type Props = {
  children: ReactNode
}

export default function DefaultLayout({ children }: Props) {
  const resetWindowScrollPosition = useCallback(() => window.scrollTo(0, 0), [])
  const router = useRouter()

  useEffect(() => {
    if (!router.asPath.includes('#')) {
      resetWindowScrollPosition()
    }
  }, [router.asPath, resetWindowScrollPosition])

  return (
    <>
      <div className="relative h-full w-full bg-white dark:bg-gray-900">
        <DefaultHeader />
        <div className="min-h-screen">{children}</div>
        <CommonFooter />
      </div>
    </>
  )
}
