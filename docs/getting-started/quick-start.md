---
sidebar_label: 'Quick Start'
title: 'Quick Start Guide'
sidebar_position: 1
---

# Quick Start Guide

Get up and running with Cron To Go in minutes. This guide will help you provision Cron To Go and create your first scheduled job.

## Step 1: Provision Cron To Go

Choose your platform and follow the provisioning steps:

### Heroku
1. Navigate to [Heroku Dashboard](https://dashboard.heroku.com)
2. Select your app and go to "Resources"
3. Search for "Cron To Go" and install
4. Access the dashboard through SSO (Single Sign-On)

Or, using the Heroku CLI:

```bash
# Install Cron To Go add-on on your app
heroku addons:create crontogo -a <your-app-name>

# Open the dashboard
heroku addons:open crontogo -a <your-app-name>
```

### Build.io
1. Navigate to [Build.io Dashboard](https://build.io)
2. Select your app and go to "Resources"
3. Search for "Cron To Go" and install
4. Access the dashboard through SSO (Single Sign-On)

Or, using the Heroku CLI:

```bash
# Install Cron To Go add-on on your app
build addons:create crontogo -a <your-app-name>

# Open the dashboard
build addons:open crontogo -a <your-app-name>
```

### DigitalOcean
1. Navigate to the Cron To Go [DigitalOcean Marketplace page](https://marketplace.digitalocean.com/add-ons/crontogo)
2. Click "Add Cron To Go" and follow the setup process
3. When the add-on is installed, you can access the dashboard through the DigitalOcean marketplace add-ons list

### Addons.io
1. Navigate to the Cron To Go [Addons.io Marketplace page](https://addons.io/marketplace/addons/crontogo)
2. Click "Install addon"
3. When the add-on is installed, you can access the dashboard through the Addons.io add-ons list

For detailed platform-specific instructions, see:
- [Getting Started on Heroku](getting-started/heroku-getting-started)
- [Getting Started on DigitalOcean](getting-started/digitalocean-getting-started)
- [Getting Started on Addons.io](getting-started/addons-io-getting-started)

## Step 2: Access Your Dashboard

Once provisioned, you can access your Cron To Go dashboard:

- **Heroku**: Via `heroku addons:open crontogo` or through Heroku Dashboard
- **DigitalOcean**: Through your DigitalOcean app dashboard
- **Addons.io**: Through SSO from your Addons.io dashboard

## Step 3: Create Your First Job

1. **Click "Add Job"** in your dashboard
2. **Enter a nickname** (e.g., "Daily Backup")
3. **Set the schedule** using cron expression (e.g., `0 2 * * *` for daily at 2 AM)
4. **Enter your command** (e.g., `curl https://your-api.com/backup`)
5. **Click "Create Job"**

## Step 4: Test Your Job

1. **Click "Run Now"** to test your job immediately
2. **Check the logs** to see the execution results
3. **Verify the output** matches your expectations

## Example Jobs

### Database Backup
```bash
# PostgreSQL backup
pg_dump $DATABASE_URL > backup.sql

# MySQL backup
mysqldump $DATABASE_URL > backup.sql
```

### HTTP Request
```bash
# API call
curl -X POST https://your-api.com/webhook

# Health check
curl https://your-app.com/health
```

### Script Execution
```bash
# Python script
python scripts/generate_report.py

# Node.js script
node scripts/send_notifications.js

# Ruby script
ruby scripts/cleanup_data.rb
```

## Next Steps

- **Learn about cron expressions**: [Cron Expressions Guide](../jobs/cron-expressions)
- **Explore use cases**: [Use Cases & Examples](../use-cases/database-operations)
- **Framework integration**: [Framework Integration](../frameworks/rails)
- **Advanced features**: [Advanced Features](../advanced/webhooks)

## Need Help?

- **Documentation**: Browse our comprehensive guides
- **FAQ**: Check [Frequently Asked Questions](../questions-and-answers/faq)
- **Support**: Contact us through your platform's support channels 