// Icons => https://heroicons.com/
import {
  HeartIcon,
  HomeIcon,
  RocketLaunchIcon,
  WindowIcon,
  WrenchScrewdriverIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline'

export const defaultMainNav = [
  {
    name: 'common:navs.defaultMainNav.blog',
    href: '/blog/',
  },
  {
    name: 'common:navs.defaultMainNav.doc',
    href: '/doc/',
  },
]

export const commonFooterNav = [
  {
    name: 'common:navs.commonFooterNav.blog',
    href: '/blog/',
  },
  {
    name: 'common:navs.commonFooterNav.doc',
    href: '/doc/',
  },
  {
    name: 'common:navs.commonFooterNav.privacy',
    href: '/legal/privacy-policy/',
  },
]

export const docMenuNav = [
  { name: 'doc:menuNav.home', href: '/doc/', icon: HomeIcon },
  {
    name: 'doc:menuNav.general.groupTitle',
    children: [
      {
        name: 'doc:menuNav.general.motivation',
        href: '/doc/general/motivation/',
        icon: HeartIcon,
      },
    ],
  },
  {
    name: 'doc:menuNav.backend.groupTitle',
    children: [
      {
        name: 'doc:menuNav.backend.quickstart',
        href: '/doc/backend/quickstart/',
        icon: RocketLaunchIcon,
      },
      {
        name: 'doc:menuNav.backend.basic-architecture',
        href: '/doc/backend/basic-architecture/',
        icon: AcademicCapIcon,
      },
      {
        name: 'doc:menuNav.backend.zero-to-deploy',
        href: '/doc/backend/zero-to-deploy/',
        icon: AcademicCapIcon,
      },
      {
        name: 'doc:menuNav.backend.graphql-api',
        href: '/doc/backend/graphql-api/',
        icon: AcademicCapIcon,
      },
      {
        name: 'doc:menuNav.backend.firebase-user-authentification',
        href: '/doc/backend/firebase-user-authentification/',
        icon: AcademicCapIcon,
      },
      {
        name: 'doc:menuNav.backend.add-worker',
        href: '/doc/backend/add-worker/',
        icon: AcademicCapIcon,
      },
      {
        name: 'doc:menuNav.backend.setup-load-balancer',
        href: '/doc/backend/setup-load-balancer/',
        icon: AcademicCapIcon,
      },
      {
        name: 'doc:menuNav.backend.cloud-armor',
        href: '/doc/backend/cloud-armor/',
        icon: AcademicCapIcon,
      },
      {
        name: 'doc:menuNav.backend.skeet-plugins',
        href: '/doc/backend/skeet-plugins/',
        icon: AcademicCapIcon,
      },
    ],
  },
  {
    name: 'doc:menuNav.frontend.groupTitle',
    children: [
      {
        name: 'doc:menuNav.frontend.underDevelopment',
        href: '/doc/frontend/under-development/',
        icon: WrenchScrewdriverIcon,
      },
    ],
  },
  {
    name: 'doc:menuNav.web.groupTitle',
    children: [
      {
        name: 'doc:menuNav.web.template',
        href: '/doc/web/template/',
        icon: WindowIcon,
      },
    ],
  },
]

export const docHeaderNav = [
  {
    name: 'doc:headerNav.home',
    href: '/',
  },
  {
    name: 'doc:headerNav.blog',
    href: '/blog/',
  },
]
