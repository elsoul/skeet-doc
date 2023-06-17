import { useTranslation } from 'next-i18next'

export default function SkeetDemoRow() {
  const { t } = useTranslation()
  return (
    <>
      <div className="">
        <div className="mx-auto max-w-7xl px-6 py-48 sm:py-64 lg:px-8">
          <p className="mb-3 text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t('home:SkeetDemoRow.title1')}
          </p>
          <p className="text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t('home:SkeetDemoRow.title2')}
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <a
              href="https://skeeter.app/"
              className="bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 dark:bg-white dark:text-gray-900"
              rel="noreferrer"
              target="_blank"
            >
              {t('home:SkeetDemoRow.button')}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
