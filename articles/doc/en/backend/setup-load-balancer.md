---
id: setup-load-balancer
title: Setup Load Balancer - Google Cloud Load Balancer
description: How to use Load Balancer
---

## load balancer configuration

Get a domain in advance and prepare to set up nameservers.
Domain names can be example.com or subdomains like api.example.com.

```bash
$ skeet setup lb <YOUR_DOMAIN>
```

- Not necessary if you have already set up a load balancer with `skeet init`.
