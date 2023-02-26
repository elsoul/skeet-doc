import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
type Props = {
  toc: {
    id: string
    depth: number
    value: string
  }[]
  activeItemIds: string[]
}

export default function Toc({ toc, activeItemIds }: Props) {
  const { t } = useTranslation()
  return (
    <>
      {toc.length > 0 && (
        <>
          <div className="p-4">
            <p className="text-base font-semibold">{t('common:toc')}</p>
          </div>
          <div className="border-l p-4">
            <nav className="space-y-1" aria-label="Sidebar">
              {toc.map((item) => (
                <a
                  key={`Toc${item.id}`}
                  href={`#${item.id}`}
                  className={clsx(
                    activeItemIds.includes(item.id)
                      ? 'bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-900 dark:hover:text-gray-50',
                    'flex items-center px-3 py-2 text-sm font-medium'
                  )}
                  aria-current={
                    activeItemIds.includes(item.id) ? 'location' : undefined
                  }
                >
                  <span className="truncate">{item.value}</span>
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  )
}
