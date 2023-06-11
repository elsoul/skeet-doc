import {
  GlobeAltIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'next-i18next'

const features = [
  {
    name: 'home:MainPurposeRow.feature1Title',
    description: 'home:MainPurposeRow.feature1Description',
    icon: RocketLaunchIcon,
  },
  {
    name: 'home:MainPurposeRow.feature2Title',
    description: 'home:MainPurposeRow.feature2Description',
    icon: GlobeAltIcon,
  },
  {
    name: 'home:MainPurposeRow.feature3Title',
    description: 'home:MainPurposeRow.feature3Description',
    icon: WrenchScrewdriverIcon,
  },
  {
    name: 'home:MainPurposeRow.feature4Title',
    description: 'home:MainPurposeRow.feature4Description',
    icon: ShieldCheckIcon,
  },
]

export default function MainPurposeRow() {
  const { t } = useTranslation()
  return (
    <>
      <div className=" py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-emerald-600">
              {t('home:MainPurposeRow.subtitle')}
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {t('home:MainPurposeRow.title1')} <br />
              {t('home:MainPurposeRow.title2')}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              {t('home:MainPurposeRow.description1')} <br />
              {t('home:MainPurposeRow.description2')}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {t(feature.name)}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                    {t(feature.description)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  )
}
