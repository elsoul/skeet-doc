![Skeet Framework Logo](https://storage.googleapis.com/skeet-assets/imgs/logo/ogp.png)

<p align="center">
  <a href="https://twitter.com/intent/follow?screen_name=ELSOUL_LABO2">
    <img src="https://img.shields.io/twitter/follow/ELSOUL_LABO2.svg?label=Follow%20@ELSOUL_LABO2" alt="Follow @ELSOUL_LABO2" />
  </a>
  <br/>

  <a aria-label="npm version" href="https://www.npmjs.com/package/skeet">
    <img alt="" src="https://badgen.net/npm/v/skeet">
  </a>
  <a aria-label="Downloads Number" href="https://www.npmjs.com/package/skeet">
    <img alt="" src="https://badgen.net/npm/dt/skeet">
  </a>
  <a aria-label="License" href="https://github.com/elsoul/skeet/blob/master/LICENSE.txt">
    <img alt="" src="https://badgen.net/badge/license/Apache/blue">
  </a>
    <a aria-label="Code of Conduct" href="https://github.com/elsoul/skeet/blob/master/CODE_OF_CONDUCT.md">
    <img alt="" src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg">
  </a>
</p>

# Skeet Doc

Document Web Media for Skeet Framework.

## Aiming to

- Fast Development
- High Performance
- Global Scale
- Maintainable Code
- Strong SEO

## Summary

- [x] [Next.js (v13) - SSG Framework](https://nextjs.org/)
- [x] [React (v18) - UI Framework](https://reactjs.org/)
- [x] [TypeScript (v4.9) - Type Check](https://www.typescriptlang.org/)
- [x] [ESLint - Linter](https://eslint.org/)
- [x] [Prettier - Formatter](https://prettier.io/)
- [x] [Husky - Pre Commit](https://typicode.github.io/husky/#/)
- [x] [Recoil - State Management](https://recoiljs.org/)
- [x] [Next i18next (v13) - i18n Translation](https://github.com/isaachinman/next-i18next)
- [x] [Firebase - Hosting & Analytics](https://firebase.google.com/)
- [x] [Tailwind - CSS Framework](https://tailwindcss.com/)

## Quick start

```bash
# Node version (using nodenv)
$ node -v
v18.14.2

# Install dependencies
$ yarn install --frozen-lockfile

# Run dev server (localhost:4200)
$ yarn dev
```

## Firebase Hosting

You need to login to Firebase to use Firebase Hosting to publish your media website.

```bash
# Install Firebase tools
$ npm i -g firebase-tools

# Login to Firebase to enable `yarn deploy` from local
$ firebase login

# Get FIREBASE_DEPLOY_TOKEN to use CI/CD
$ firebase login:ci

```

## GitHub Actions (CI/CD)

Needs to set Secrets on GitHub to work with GitHub Actions.

```
BING_API_KEY
FIREBASE_DEPLOY_TOKEN
```

Also you need the BING_API_KEY for .env to send sitemap when `yarn deploy`
