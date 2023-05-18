---
id: basic-architecture
title: Basic Architecture
description: Describes the basic tree structure and usage of the Skeet Framework backend.
---

## Basic Structure of Skeet Framework

Since the Skeet Framework backend is serverless,
You can start writing from functions right away.

`src` will contain the frontend source code.
The firebase functions project will be placed under the `functions` directory.
You can add multiple functions to functions.

```bash
├── src
│   ├── public
│   └── types
├── functions
│   ├── openai
│   └── solana
├── package.json
├── skeet-cloud.config.json
```

| Directory                 | Description                        |
| ------------------------- | ---------------------------------- |
| `src`                     | Frontend source code               |
| `src/public`              | Frontend source code               |
| `src/types`               | Frontend type definitions          |
| `functions`               | Firebase Functions source code     |
| `functions/openai`        | functions related to OpenAI API    |
| `functions/solana`        | functions related to Solana Web3js |
| `package.json`            | Backend package management         |
| `skeet-cloud.config.json` | Skeet Framework configuration file |

## Basic Structure of Skeet Functions

Skeet Functions are based on Firebase Functions.
The firebase functions project will be placed under the `functions` directory.
You can add multiple functions to functions.

`functions/openai`

```bash
.
├── build.ts
├── devBuild.ts
├── dist
│   └── index.js
├── nodemon.json
├── package.json
├── src
│   ├── index.ts
│   ├── lib
│   ├── models
│   ├── routings
│   ├── scripts
│   ├── types
│   └── utils
├── tsconfig.json
└── yarn.lock
```

| Directory       | Description                |
| --------------- | -------------------------- |
| `build.ts`      | build script               |
| `devBuild.ts`   | build script               |
| `dist`          | Source code after build    |
| `nodemon.json`  | Local launch configuration |
| `package.json`  | Backend package management |
| `src`           | source code                |
| `src/index.ts`  | entry point                |
| `src/lib`       | Libraries                  |
| `src/models`    | models                     |
| `src/routings`  | routings                   |
| `src/scripts`   | scripts                    |
| `src/types`     | type definitions           |
| `src/utils`     | Utilities                  |
| `tsconfig.json` | TypeScript configuration   |
| `yarn.lock`     | Package lock file          |
