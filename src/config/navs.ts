// Icons => https://heroicons.com/
import {
  HeartIcon,
  HomeIcon,
  RocketLaunchIcon,
  WindowIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline'

export const defaultMainNav = [
  {
    name: 'common:navs.defaultMainNav.news',
    href: '/news/',
  },
  {
    name: 'common:navs.defaultMainNav.doc',
    href: '/doc/',
  },
]

export const commonFooterNav = [
  {
    name: 'common:navs.commonFooterNav.news',
    href: '/news/',
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
    ],
  },
  {
    name: 'doc:menuNav.frontend.groupTitle',
    children: [
      {
        name: 'doc:menuNav.frontend.react-native',
        href: '/doc/frontend/react-native/',
        icon: DevicePhoneMobileIcon,
      },
    ],
  },
  {
    name: 'doc:menuNav.web.groupTitle',
    children: [
      {
        name: 'doc:menuNav.web.ssg-template',
        href: '/doc/web/ssg-template/',
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
    name: 'doc:headerNav.news',
    href: '/news/',
  },
]
