import Container from '@/components/common/atoms/Container'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import prismaLogo from '@/assets/img/logo/projects/prisma.svg'
import googleCloudLogo from '@/assets/img/logo/projects/GoogleCloud.svg'
import reactLogo from '@/assets/img/logo/projects/react.svg'
import androidLogo from '@/assets/img/logo/projects/android.svg'
import tailwindLogo from '@/assets/img/logo/projects/tailwindcss.svg'
import iosLogo from '@/assets/img/logo/projects/ios.svg'
import graphqlLogo from '@/assets/img/logo/projects/graphql.svg'
import typescriptLogo from '@/assets/img/logo/projects/typescript.svg'
import { Button } from '@/components/common/atoms/Button'
import clsx from 'clsx'

export default function HomeHeroRow() {
  const { t } = useTranslation()

  return (
    <>
      <Container className="pt-24 pb-20 text-center lg:pt-40">
        <h1 className="font-display mx-auto max-w-4xl text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-7xl">
          {t('home:HeroRow.title')}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-gray-700 dark:text-gray-200">
          {t('home:HeroRow.body')}
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <Button href="/doc" className="">
            {t('common:navs.defaultMainNav.doc')}
          </Button>
          <Button
            href="https://github.com/elsoul/skeet"
            variant="outline"
            className=""
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Button>
        </div>
        <div className="mt-36 lg:mt-48">
          <ul
            role="list"
            className="mt-8 flex flex-col items-center justify-center gap-x-8 sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0"
          >
            {[
              [
                {
                  name: 'Prisma',
                  logo: prismaLogo,
                  link: 'https://www.prisma.io/',
                },
                {
                  name: 'Graphql',
                  logo: graphqlLogo,
                  link: 'https://graphql.org/',
                },
                {
                  name: 'Google Cloud',
                  logo: googleCloudLogo,
                  link: 'https://cloud.google.com/',
                },
                {
                  name: 'TypeScript',
                  logo: typescriptLogo,
                  link: 'https://www.typescriptlang.org/',
                },
              ],
              [
                {
                  name: 'React',
                  logo: reactLogo,
                  link: 'https://reactjs.org/',
                },
                {
                  name: 'Tailwindcss',
                  logo: tailwindLogo,
                  link: 'https://tailwindcss.com/',
                },
                {
                  name: 'iOS',
                  logo: iosLogo,
                  link: 'https://developer.apple.com/',
                },
                {
                  name: 'Android',
                  logo: androidLogo,
                  link: 'https://developer.android.com/',
                },
              ],
            ].map((group, groupIndex) => (
              <li key={`HeroRowLogoCloudList${groupIndex}`}>
                <ul
                  role="list"
                  className="flex flex-row items-center gap-x-6 sm:gap-x-12"
                >
                  {group.map((project) => (
                    <li key={project.name} className="flex">
                      <a href={project.link} target="_blank" rel="noreferrer">
                        <Image
                          src={project.logo}
                          alt={project.name}
                          className={clsx(
                            'grayscale hover:opacity-60',
                            project.name === 'React'
                              ? 'invert dark:invert-0'
                              : 'dark:invert'
                          )}
                          width={168}
                          height={48}
                          unoptimized
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  )
}
