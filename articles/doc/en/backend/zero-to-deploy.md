---
id: zero-to-deploy
title: Zero to Deploy
description: Zero to Deploy with Skeet TypeScript Serverless Framework
---

## Zero to deploy

### Create a Google Cloud project

If you have never used Google Cloud before, follow this link to create a project.

[How to create a project](https://cloud.google.com/resource-manager/docs/creating-managing-projects)

:::div{.success}
Beginners as well as those already using Google Cloud

You can get $200 free credits from the link below.

[Google Cloud credit link](https://cloud.google.com/partners/partnercredit?pcn_code=0014M00001h3BjPQAU)
:::

## Gcloud Auth login

```bash
$ gcloud auth application-default login
```

## Github CLI Auth Login

```bash
$ gh auth login
```

### Initial Deployment - skeet init

To begin the deployment process, run the following command in your terminal:

```bash
$ skeet init
```

The interactive prompt will guide you through the following settings:

- GitHub repository name
- Google Cloud SQL password
- Google Cloud Load Balancer

If the Load Balancer is set to true, you will also be prompted for:

- Domain Address
- Domain's Google Cloud Project ID

If this is your first time using Google Cloud DNS, copy the name server address that is output to the console and update your DNS settings accordingly.

If you are already using Google Cloud DNS to manage your domain, simply specify the Project ID that is already configured.

![Skeet Init](https://storage.googleapis.com/skeet-assets/animation/skeet-init-compressed.gif)

## Cloud Configuration File

The configuration for the deployed cloud is output to ./skeet-cloud.config.json.

You can modify this file to update cloud settings such as:

- Memory
- CPU
- maxConcurrency
- maxInstances
- minInstances

```json
{
  "api": {
    "appName": "skeet-example",
    "projectId": "skeet-example",
    "region": "europe-west4",
    "hasLoadBalancer": true,
    "cloudRun": {
      "name": "skeet-skeet-example-api",
      "url": "https://api-example.skeet.dev",
      "cpu": 1,
      "maxConcurrency": 80,
      "maxInstances": 100,
      "minInstances": 0,
      "memory": "4Gi"
    },
    "db": {
      "databaseVersion": "POSTGRES_14",
      "cpu": 1,
      "memory": "3840MiB",
      "storageSize": 10,
      "whiteList": "x.x.x.x"
    }
  },
  "workers": [
    {
      "workerName": "solana-transfer",
      "cloudRun": {
        "name": "skeet-skeet-example-worker-solana-transfer",
        "url": "https://skeet-skeet-example-worker.run.app",
        "cpu": 1,
        "maxConcurrency": 80,
        "maxInstances": 100,
        "minInstances": 0,
        "memory": "4Gi"
      }
    }
  ],
  "taskQueues": [],
  "cloudArmor": [
    {
      "securityPolicyName": "skeet-skeet-example-armor",
      "rules": [
        {
          "priority": "10",
          "description": "Allow Your Home IP addresses",
          "options": {
            "src-ip-ranges": "x.x.x.x",
            "action": "allow"
          }
        },
        {
          "priority": "100",
          "description": "Defense from SQLi attack",
          "options": {
            "action": "deny-403",
            "expression": "evaluatePreconfiguredExpr('sqli-stable')"
          }
        },
        {
          "priority": "200",
          "description": "Defense from XSS attack",
          "options": {
            "action": "deny-403",
            "expression": "evaluatePreconfiguredExpr('xss-stable')"
          }
        },
        {
          "priority": "300",
          "description": "Defense from NodeJS attack",
          "options": {
            "action": "deny-403",
            "expression": "evaluatePreconfiguredExpr('nodejs-v33-stable')"
          }
        },
        {
          "priority": "2147483647",
          "description": "Deny All IP addresses",
          "options": {
            "action": "deny-403"
          }
        }
      ]
    }
  ]
}
```

## Updating Deployments

### Commit and Push to start CI/CD

Skeet offers two methods for deployment:

### 1. GitHub Actions CI/CD

This is the recommended method for deploying updates.

Simply commit and push your changes to trigger the CI/CD process.

```bash
$ git add .
$ git commit -m 'first deploy'
$ git push origin main
```

### 2. Skeet Deploy Command

Use this command to immediately deploy to the production environment or update the specs for a Skeet Worker cloud

```bash
$ skeet deploy
```

Select the services to update using the space bar and press Enter to proceed.

![Skeet Deploy](https://storage.googleapis.com/skeet-assets/animation/skeet-deploy-compressed.gif)
