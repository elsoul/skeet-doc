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
  CommandLineIcon,
  CogIcon,
} from '@heroicons/react/24/outline'

export const defaultMainNav = [
  {
    name: 'common:navs.defaultMainNav.doc',
    href: '/doc/',
  },
  {
    name: 'common:navs.defaultMainNav.quickstart',
    href: '/doc/skeet-firestore/quickstart',
  },
  {
    name: 'common:navs.defaultMainNav.enterprise',
    href: '/enterprise/',
  },
  {
    name: 'common:navs.defaultMainNav.news',
    href: '/news/',
  },
  {
    name: 'common:navs.defaultMainNav.company',
    href: '/company/',
  },
]

export const commonFooterNav = [
  {
    name: 'common:navs.commonFooterNav.doc',
    href: '/doc/',
  },
  {
    name: 'common:navs.commonFooterNav.quickstart',
    href: '/doc/skeet-firestore/quickstart',
  },
  {
    name: 'common:navs.defaultMainNav.enterprise',
    href: '/enterprise/',
  },
  {
    name: 'common:navs.commonFooterNav.news',
    href: '/news/',
  },
  {
    name: 'common:navs.commonFooterNav.company',
    href: '/company/',
  },
  {
    name: 'common:navs.commonFooterNav.press-kits',
    href: '/press-kits/',
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
    icon: CommandLineIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.server',
    href: '/doc/skeet-cli/skeet-cli-server/',
    icon: CommandLineIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.deploy',
    href: '/doc/skeet-cli/skeet-cli-deploy/',
    icon: CommandLineIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.init',
    href: '/doc/skeet-cli/skeet-cli-init/',
    icon: CommandLineIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.iam',
    href: '/doc/skeet-cli/skeet-cli-iam/',
    icon: CommandLineIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.yarn',
    href: '/doc/skeet-cli/skeet-cli-yarn/',
    icon: CommandLineIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.add',
    href: '/doc/skeet-cli/skeet-cli-add/',
    icon: CommandLineIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.sync',
    href: '/doc/skeet-cli/skeet-cli-sync/',
    icon: CommandLineIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.delete',
    href: '/doc/skeet-cli/skeet-cli-delete/',
    icon: CommandLineIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.login',
    href: '/doc/skeet-cli/skeet-cli-login/',
    icon: CommandLineIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.list',
    href: '/doc/skeet-cli/skeet-cli-list/',
    icon: CommandLineIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.curl',
    href: '/doc/skeet-cli/skeet-cli-curl/',
    icon: CommandLineIcon,
  },
  {
    name: 'doc:menuNav.skeet-cli.test',
    href: '/doc/skeet-cli/skeet-cli-test/',
    icon: CommandLineIcon,
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
    name: 'doc:menuNav.skeet-graphql.groupTitle',
    children: [
      {
        name: 'doc:menuNav.skeet-graphql.quickstart',
        href: '/doc/skeet-graphql/quickstart/',
        icon: RocketLaunchIcon,
      },
      {
        name: 'doc:menuNav.skeet-graphql.tutorial',
        href: '/doc/skeet-graphql/tutorial/',
        icon: AcademicCapIcon,
      },
      {
        name: 'doc:menuNav.skeet-graphql.initial-deploy',
        href: '/doc/skeet-graphql/initial-deploy/',
        icon: CloudArrowUpIcon,
      },
      {
        name: 'doc:menuNav.skeet-graphql.basic-architecture',
        href: '/doc/skeet-graphql/basic-architecture/',
        icon: BookOpenIcon,
      },
    ],
  },
  {
    name: 'doc:menuNav.skeet-firestore.groupTitle',
    children: [
      {
        name: 'doc:menuNav.skeet-firestore.quickstart',
        href: '/doc/skeet-firestore/quickstart/',
        icon: RocketLaunchIcon,
      },
      {
        name: 'doc:menuNav.skeet-firestore.tutorial',
        href: '/doc/skeet-firestore/tutorial/',
        icon: AcademicCapIcon,
      },
      {
        name: 'doc:menuNav.skeet-firestore.initial-deploy',
        href: '/doc/skeet-firestore/initial-deploy/',
        icon: CloudArrowUpIcon,
      },
      {
        name: 'doc:menuNav.skeet-firestore.basic-architecture',
        href: '/doc/skeet-firestore/basic-architecture/',
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
      {
        name: 'doc:menuNav.plugins.skeet-utils',
        href: '/doc/plugins/skeet-utils/',
        icon: CogIcon,
      },
    ],
  },
  {
    name: 'doc:menuNav.frontend.groupTitle',
    children: [
      {
        name: 'doc:menuNav.frontend.nextjs-template',
        href: '/doc/frontend/nextjs-template/',
        icon: WindowIcon,
      },
      {
        name: 'doc:menuNav.frontend.expo-template',
        href: '/doc/frontend/expo-template/',
        icon: DevicePhoneMobileIcon,
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
