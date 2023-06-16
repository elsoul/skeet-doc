---
id: initial-deploy
title: Initial Deploy
description: You can learn how to publish your Skeet app. You can also set deploy for each Commit with GitHub Actions with a single command.
---

## First deploy

In this chapter, we will proceed with the project name _skeet-demo_.

## Login GitHub CLI Auth

```bash
$ gh auth login
```

### Initial deployment with Skeet Init command

Configure the following settings with the Skeet init command.

1. Region selection
2. Specify a GitHub repository name
3. Nameserver domain settings
4. Load balancer subdomain settings

```bash
$ skeet init
```

This command

- Create a GitHub repository
- Commit/push to GitHub repository
- Configure Actions for GitHub repositories
- Configuring secrets for GitHub repositories
- Google Cloud IAM settings
- Setting up Google Cloud DNS
- Configure Google Cloud Load Balancer
- Configure Google Cloud Armor
- Configuring Google Cloud VPC Network
- Configure Google Cloud VPC Subnet Network
- Configure Google Cloud VPC Connector

automatically.

Once configured, you will see the nameserver domain settings in the console log.

```bash
🚸 === Copy & Paste below nameServer addresses to your DNS Setting === 🚸

ns-cloud-a1.googledomains.com.
ns-cloud-a2.googledomains.com.
ns-cloud-a3.googledomains.com.
ns-cloud-a4.googledomains.com.

👷 === https will be ready in about an hour after your DNS settings === 👷

✔ You are all set 🎉

📗 Doc: https://skeet.dev
```

## Setting nameservers

Set the four records displayed above to your domain's nameservers.
The domain settings will be reflected in about 30 minutes to 2 hours after the settings are completed. (depending on your nameserver settings)

You have now completed your first deployment.

Let's go to https://your-domain.com/root.

```json
{
  "status": "success",
  "message": "Skeet APP is running!"
}
```

is displayed, it is successful.

## Start Firebase Emulator

```bash
$ skeet s
```

Let's go to http://localhost:4000.

If you can see the Firebase UI, you're good to go.

## Add Firebase Web APP

Add Web APP from the Firebase project settings screen.

Copy the Firebase Config after completing the settings.

And Paste to

`src/lib/firebaseConfig.ts`

Now while starting the Firebase emulator

```bash
$ skeet login
```

command is now available.
