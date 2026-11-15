---
sidebar_label: 'Overview'
title: 'Overview'
sidebar_position: 0
slug: /
---

# Cron To Go - Cloud Scheduler for Modern Applications

Cron To Go is a fully-managed cloud scheduler that runs scheduled tasks using CRON expressions or time intervals, up to once per minute. It's designed to work seamlessly across multiple cloud platforms including Heroku, DigitalOcean, AWS, Google Cloud, and more.

## What is Cron To Go?

Cron To Go combines the simplicity of using cron to schedule jobs with the scale and elasticity of the cloud. Instead of running always-on processes, Cron To Go provides the option to start one-off tasks only when you need them. 

### Key Benefits

- **Platform Agnostic**: Works with multiple cloud providers
- **No Code Deployment**: Add, edit, or delete jobs without deploying new code
- **Cost Effective**: Pay only for execution time, not idle resources
- **Scalable**: Handles from simple tasks to complex workflows
- **Reliable**: Built-in monitoring, logging, and error handling
- **Developer Friendly**: Simple API, CLI tools, and comprehensive documentation

## How It Works

1. **Provision**: Add Cron To Go to your application through your cloud platform's add-on marketplace or CLI
2. **Configure**: Define your jobs using the dashboard, API, or CLI
3. **Execute**: Cron To Go runs your jobs on schedule using your platform's compute resources
4. **Monitor**: Track execution, logs, and performance through the dashboard

## Popular Use Cases

Based on feedback from thousands of users, here are the most common use cases:

### Database Operations
- Refresh materialized views
- Run cleanup statements
- Perform BI processes and data transformations
- Database maintenance and optimization

**Example:**
```bash
psql $DATABASE_URL -c "REFRESH MATERIALIZED VIEW vw_account_counters"
```

### Webhook Requests
- Trigger webhooks
- Call third-party APIs
- Start application processes
- Health checks and monitoring

**Example:**
```bash
curl -X POST https://api.example.com/webhook/process-orders
```

### Batch Processing
- Generate reports
- Process data files
- Send email notifications
- Data synchronization

**Example:**
```bash
node scripts/generate-weekly-report.js
```

### Data Management
- Backup operations
- Data cleanup and archiving
- ETL processes
- Cache invalidation

## Supported Compute Targets

Cron To Go integrates with multiple cloud platforms:

- **Heroku**: Trigger one-off Dyno on schedule
- **Build.io**: Trigger one-off Dyno on schedule (coming soon)
- **Webhook Request**: Send a POST request to a HTTP endpoint on schedule (coming soon)
- **AWS Lambda**: Trigger Lambda functions invocation on schedule (coming soon)
- **DigitalOcean**: Trigger a serverless function on schedule (coming soon)

## Supported Add-on Marketplaces

Cron To Go integrates with multiple add-on marketplaces:

- **Heroku**: Heroku add-on marketplace
- **Build.io**: Build.io add-on marketplace
- **DigitalOcean**: DigitalOcean add-on marketplace
- **Addons.io**: Addons.io add-on marketplace

## Getting Started

Choose your add-on marketplace and follow the quick start guide:

- [Getting Started on Heroku](getting-started/heroku-getting-started)
- [Getting Started on Build.io](getting-started/build-io-getting-started)
- [Getting Started on DigitalOcean](getting-started/digitalocean-getting-started)
- [Getting Started on Addons.io](getting-started/addons-io-getting-started)