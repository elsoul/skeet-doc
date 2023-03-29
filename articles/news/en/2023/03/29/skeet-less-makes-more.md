---
id: skeet-less-makes-more
title: Skeet, a Full-stack TypeScript Serverless Framework, becomes more compact and powerful
category: Press release
thumbnail: /news/2023/03/29/LessMakesMore.png
---

## Break free from bottlenecks

Skeet has traditionally used a relational database, Cloud SQL (Postgres SQL), and provided a GraphQL API.

The aim was to manage relational databases historically and familiarly and provide a convenient API while using caching well.

However, due to the nature of relational databases, the API server must harden the database structure and be tightly coupled with it. Here because of the specifications that cannot be automatically scaled.

In the present age where AI, such as ChatGPT, has appeared, application development has changed fundamentally. Rather than replacing an extensive system, starting a small application and repeating verification while maintaining high agility is more desirable.

By migrating to Firestore's more scalable document-oriented data model, you can eliminate scaling bottlenecks and gain a more flexible and comfortable development environment.

## Lighter architecture

We will move from the current Cloud Run, which scales per Docker container, to Cloud Functions, which rises per Function.

Skeet centrally manages the Functions deployed for each business logic. In addition, it provides tools to make it easy to use (call) Functions from the front end. We are trying to make the development experience comfortable as if you are developing a monolith. Validation in Firestore consistently provides a type-safe, secure, and fast development environment.

In the past, we formed a complex monorepo with three large directories: API, Worker, and App, but we will move to a more compact style that adds Functions to the App as the starting point.

You can improve the scalability of your App while reducing the amount of code and improving the development experience and maintainability.

## Full-stack TypeScript Serverless Application Framework "Skeet"

Skeet is a full-stack serverless application framework developed in TypeScript that makes it fast and easy to build applications and operate services.

With a compact backend development environment that utilizes Cloud Functions and Firebase, and React Native, we have realized comfortable and safe mobile application development for both iOS and Android.

Skeet is certified as a Google Cloud Integration Product. Skeet has also helped develop the Web3 apps and has been certified as a Grizzlython project for Solana.
