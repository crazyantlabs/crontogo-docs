---
sidebar_label: 'Getting Started with Heroku'
title: 'Getting Started with Heroku'
sidebar_position: 2
---

# Getting Started with Heroku

Cron To Go is available as a native Heroku add-on, providing seamless integration with Heroku's platform and tooling.

## Overview

Cron To Go on Heroku runs your scheduled jobs using one-off Dynos, which means you only pay for the time your jobs actually execute. This is more cost-effective than running always-on processes.

### Key Benefits on Heroku

- **Native Add-on**: Available through Heroku's add-on marketplace
- **CLI Integration**: Full support for Cron To Go CLI commands using the Heroku CLI Plugin
- **Environment Variables**: Automatic access to your app's config vars
- **Dyno Types**: Support for all Heroku Dyno types (Hobby, Standard, Performance)
- **Logging**: Integration with Heroku's logging system

## Provisioning

### Using Heroku CLI

```bash
# Install Heroku CLI if you haven't already
curl https://cli-assets.heroku.com/install.sh | sh

# Login to Heroku
heroku login

# Add Cron To Go to your app
heroku addons:create crontogo -a <your-app-name>

# Verify the add-on was added
heroku addons:info crontogo -a <your-app-name>
```

### Using Heroku Dashboard

1. Navigate to the Cron To Go [Heroku Marketplace page](https://elements.heroku.com/addons/crontogo)
2. Click **Add Cron To Go**
3. When the add-on is installed, you can access the dashboard through the Heroku add-ons list

## Accessing Cron To Go Dashboard

Once provisioned, you can access the Cron To Go dashboard in several ways:

### Via Heroku CLI
```bash
# Open the Cron To Go dashboard
heroku addons:open crontogo -a <your-app-name>
```

### Via Heroku Dashboard
1. Navigate to your app in the Heroku Dashboard
2. Go to the **Resources** tab
3. Click on the **Cron To Go** add-on

## Next Steps

Once you have access to the Cron To Go dashboard:

1. **Create Your First Job**: Use the dashboard to create and schedule jobs
3. **Monitor Execution**: Use the dashboard to monitor job execution and view logs
4. **Explore Features**: Set up notifications, webhooks, and other advanced features

For detailed information about job management, cron expressions, and advanced features, refer to the main documentation sections.

## Support

- **Heroku Support**: For Heroku platform issues
- **Cron To Go Support**: For Cron To Go specific issues
- **Documentation**: [Cron To Go Documentation](https://crontogo.com/docs)
- **Status**: [Cron To Go Status](https://status.crazyantlabs.com) or [Heroku Status](https://status.heroku.com)