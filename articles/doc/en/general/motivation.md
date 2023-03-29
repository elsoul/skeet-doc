---
id: general-motivation
title: Motivation
description: Skeet Framework Motivation of Development
---

## Reduce app development and maintenance costs

The city is full of points that can be improved through app development.

However, when you actually create and publish an app, it requires a relatively wide range of knowledge and skills, so many teams are currently struggling.

It is always difficult to achieve both rapid development and maintainability, and on top of that, it is necessary to solve complex phenomena during scaling, so it takes time to obtain a reproducible development environment.

Under such circumstances, the shortage of IT resources is still accelerating.

We want to address this issue by lowering application development and maintenance costs.

The Skeet framework allows small developers teams to quickly launch apps and maintain them over the long term.

## The choice has been TypeScript

We have tried various languages from Ruby to Rust and felt good and bad with each, but we feel that TypeScript is a very well-balanced language. The whole thing safer, making it easier to keep the code easy to develop and maintain at scale. I really appreciate it because it works still so fast.

The combination of TypeScript x ESLint x Prettier and editor completion (VSCode recommended) is outstanding, and you can get a development environment that is fast and reduces mistakes.

## Ready to deploy

Deployment has been a headache for application developers. Impressively, it always feels like the local environment and the production environment are different things. Logs? Why aren't you born by default?

Skeet solves this problem. Projects are born deployable from the start. Its CI/CD with GitHub Actions comes standard and is designed to continuously test changes and deploy those that pass.

All these logs are output to the Cloud Logs (administration screen), so administrators can safely check the status of the service wherever they are.

With Skeet, you can start writing your business logic as soon as your inspiration comes out, and you have a continuous deployment and global app publishing environment.
