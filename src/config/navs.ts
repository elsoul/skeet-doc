// Icons => https://heroicons.com/
import {
  HeartIcon,
  HomeIcon,
  RocketLaunchIcon,
  WindowIcon,
  DevicePhoneMobileIcon,
  AcademicCapIcon,
  BookOpenIcon,
  FireIcon,
  CloudArrowUpIcon,
  DocumentTextIcon,
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

const skeetCliNav = [
  {
    name: 'doc:menuNav.skeet-cli.create',
    href: '/doc/skeet-cli/skeet-cli-create/',
    icon: DocumentTextIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.server',
    href: '/doc/skeet-cli/skeet-cli-server/',
    icon: DocumentTextIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.deploy',
    href: '/doc/skeet-cli/skeet-cli-deploy/',
    icon: DocumentTextIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.init',
    href: '/doc/skeet-cli/skeet-cli-init/',
    icon: DocumentTextIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.iam',
    href: '/doc/skeet-cli/skeet-cli-iam/',
    icon: DocumentTextIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.yarn',
    href: '/doc/skeet-cli/skeet-cli-yarn/',
    icon: DocumentTextIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.add',
    href: '/doc/skeet-cli/skeet-cli-add/',
    icon: DocumentTextIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.sync',
    href: '/doc/skeet-cli/skeet-cli-sync/',
    icon: DocumentTextIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.delete',
    href: '/doc/skeet-cli/skeet-cli-delete/',
    icon: DocumentTextIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.login',
    href: '/doc/skeet-cli/skeet-cli-login/',
    icon: DocumentTextIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.list',
    href: '/doc/skeet-cli/skeet-cli-list/',
    icon: DocumentTextIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.curl',
    href: '/doc/skeet-cli/skeet-cli-curl/',
    icon: DocumentTextIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.test',
    href: '/doc/skeet-cli/skeet-cli-test/',
    icon: DocumentTextIcon,
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
        name: 'doc:menuNav.backend.tutorial',
        href: '/doc/backend/tutorial/',
        icon: AcademicCapIcon,
      },
      {
        name: 'doc:menuNav.backend.initial-deploy',
        href: '/doc/backend/initial-deploy/',
        icon: CloudArrowUpIcon,
      },
      {
        name: 'doc:menuNav.backend.basic-architecture',
        href: '/doc/backend/basic-architecture/',
        icon: BookOpenIcon,
      },
    ],
  },
  {
    name: 'doc:menuNav.plugins.groupTitle',
    children: [
      {
        name: 'doc:menuNav.plugins.skeet-firestore',
        href: '/doc/plugins/skeet-firestore/',
        icon: FireIcon,
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
  {
    name: 'doc:menuNav.skeet-cli.groupTitle',
    children: skeetCliNav,
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
