---
sidebar_label: 'Frequently Asked Questions'
title: 'Frequently Asked Questions'
sidebar_position: 1
---

# Frequently Asked Questions

## General Questions

### What is Cron To Go?
Cron To Go is a fully-managed cloud scheduler that allows you to run scheduled jobs on various platforms. It combines the simplicity of cron expressions with the scalability of cloud infrastructure, letting you schedule tasks without maintaining your own scheduling infrastructure.

### How does Cron To Go work?
Cron To Go executes your jobs in isolated containers (one-off Dynos on Heroku and Build.io, containers on other platforms) only when they need to run. This approach is more cost-effective than running always-on processes and provides better scalability.

### What add-on marketplaces does Cron To Go support?
Cron To Go is available on:
- **Heroku**: [Heroku add-on marketplace](https://elements.heroku.com/addons/crontogo)
- **DigitalOcean**: [DigitalOcean marketplace](https://marketplace.digitalocean.com/add-ons/crontogo)
- **Addons.io**: [Addons.io marketplace](https://addons.io/marketplace/addons/crontogo)

### How much does Cron To Go cost?
Pricing varies by marketplace. Check your platform's marketplace for current pricing:
- **Heroku**: [Cron To Go on Heroku Elements](https://elements.heroku.com/addons/crontogo)
- **DigitalOcean**: [Cron To Go on DigitalOcean Marketplace](https://marketplace.digitalocean.com/add-ons/crontogo)
- **Addons.io**: [Cron To Go on Addons.io Marketplace](https://addons.io/marketplace/addons/crontogo)

## Job Execution

### What types of jobs can I run?
You can run virtually any command or script that can be executed on a compute provider (e.g. Heroku, DigitalOcean, AWS, Build.io, etc.):
- **Database operations**: SQL queries, backups, cleanup
- **HTTP requests**: API calls, web scraping
- **Script execution**: Python, Node.js, Ruby, PHP, Go, etc.
- **File operations**: Data processing, report generation
- **Custom applications**: Any executable command or script

### How often can jobs run?
Jobs can run as frequently as once per minute using cron expressions or rate expressions.

### What happens if a job fails?
Failed jobs are logged with detailed error information. You can configure email notifications and webhooks to be alerted of failures. Jobs will continue to run on their schedule even if they fail.

### How long can jobs run?
Job timeout is configurable (default varies by platform). For long-running jobs, consider increasing the timeout or breaking them into smaller tasks.

## Platform-Specific Questions

### Heroku

#### I get "Requested type Eco is not available" error
**A:** Cron To Go shows the dyno types available for your app. This error typically indicates your Heroku application is not allowed to run on a Eco dyno. 

#### I get "Cannot run more than X size dynos" error
**A:** Heroku has [limits](https://devcenter.heroku.com/articles/limits#concurrent-one-off-dynos) on concurrent one-off dynos. To resolve this:
- Change the dyno type or job frequency
- Request Heroku to increase your limits
- If using private space dynos with low timeout values, this may also cause issues

#### My job fails with "process exited with status 143"
**A:** Exit code 143 indicates a SIGTERM signal was received. This can happen due to:
- Manual termination (stopping the job from Cron To Go or using `heroku ps`)
- Heroku maintenance
- Memory or CPU quota exceeded
- Environment changes or application updates
- Job timeout reached

Check if increasing the timeout is required or if your job needs more resources.

#### I'm using Cron To Go with PHP and don't see anything in job logs
**A:** Artisan may append `> '/dev/null' 2>&1` to commands. See our [logging guide](https://crontogo.com/blog/logging-laravel-background-tasks-in-heroku-the-right-way/) for solutions.

### DigitalOcean

#### How do I access Cron To Go on DigitalOcean?
**A:** After installing Cron To Go from the DigitalOcean Marketplace, you can access it through:
1. Your DigitalOcean dashboard
2. Direct SSO access to the Cron To Go dashboard
3. The Cron To Go dashboard URL provided in your DigitalOcean app

#### How is billing handled on DigitalOcean?
**A:** All Cron To Go charges appear on your DigitalOcean bill. You manage billing through your DigitalOcean account dashboard.

### Addons.io

#### How do I access Cron To Go on Addons.io?
**A:** After installing Cron To Go through Addons.io, you can access it through:
1. Your Addons.io dashboard
2. Direct SSO access to the Cron To Go dashboard
3. The Cron To Go dashboard URL provided in your Addons.io app

#### How is billing handled on Addons.io?
**A:** All Cron To Go charges appear on your Addons.io bill. You manage billing through your Addons.io account dashboard.

## Notifications and Monitoring

### How do I change my email notification settings?
**A:** The process varies by platform:

**Heroku:**
1. Go to your Heroku app dashboard
2. Find Cron To Go under "Installed add-ons" and click it
3. Click the "Settings" menu item
4. Scroll to the notifications section and configure recipients

**DigitalOcean/Addons.io:**
1. Access the Cron To Go dashboard through your platform's SSO
2. Click the "Settings" menu item
3. Scroll to the notifications section and configure recipients

### How do I set up webhook notifications?
**A:** In the Cron To Go dashboard:
1. Go to "Settings" → "Webhooks"
2. Click "Add Webhook"
3. Enter your webhook URL and configure topics
4. Optionally add custom headers for authentication

### How do I monitor job execution?
**A:** You can monitor jobs through:
- **Dashboard**: Real-time job status and logs
- **Email notifications**: Get alerts for job failures
- **Webhooks**: Receive real-time notifications
- **API**: Programmatically check job status

## Performance and Resources

### How do I disable Datadog's agent on Cron To Go job dynos?
**A:** To avoid Datadog charges on Cron To Go job dynos, add this to your [pre-run script](https://docs.datadoghq.com/agent/basic_agent_usage/heroku/#prerun-script):

```bash
# Disable the Datadog Agent based on dyno type
if [[ "$DYNOTYPE" == "crontogo"* ]]; then
  DISABLE_DATADOG_AGENT="true"
fi
```

### What dyno sizes are available?
**A:** Available dyno sizes depend on your platform and account status:
- **Heroku**: Hobby, Standard-1X, Standard-2X, Performance-M, Performance-L
- **Build.io**: Basic, Standard-1X, Standard-2X, Performance-M, Performance-L
- **DigitalOcean**: Various container sizes
- **Addons.io**: Depends on underlying platform

### How do I optimize job performance?
**A:** Consider these optimizations:
- **Right-size dynos**: Choose appropriate dyno size for your workload
- **Optimize timeouts**: Set appropriate timeouts for your jobs
- **Use efficient commands**: Minimize startup time and resource usage
- **Batch operations**: Combine multiple operations when possible

## Troubleshooting

### My job isn't running
**A:** Check these common issues:
1. **Job is paused**: Ensure the job is enabled in the dashboard
2. **Schedule issue**: Verify the cron expression or rate expression
3. **Platform limits**: Check if you've hit concurrent dyno limits
4. **Authentication**: Ensure your app has proper access to required resources
5. **Command error**: Check the job logs for command execution errors

### How do I debug failed jobs?
**A:** Use these debugging steps:
1. **Check job logs**: View detailed execution logs in the dashboard
2. **Test locally**: Run the command locally to verify it works
3. **Check environment**: Ensure all required environment variables are set
4. **Verify permissions**: Check if the job has access to required resources
5. **Review timeout**: Increase timeout if jobs are being killed

### How do I export/import jobs?
**A:** You can import jobs from:
- **Heroku Scheduler**: One-click import from Heroku Scheduler
- **Temporize**: Import from Temporize scheduler
- **Advanced Scheduler**: Import from Advanced Scheduler
- **Other Cron To Go instances**: Import from other Cron To Go accounts

Export jobs to backup your configurations or migrate between accounts.

## Security

### How secure is Cron To Go?
**A:** Cron To Go provides several security features:
- **Isolated execution**: Jobs run in isolated containers
- **Environment variables**: Secure handling of sensitive data
- **Webhook signing**: Secure webhook delivery with signatures
- **Access control**: Platform-based authentication and authorization

### How do I handle sensitive data in jobs?
**A:** Use environment variables to handle sensitive data:
- **Platform environment variables**: Use your platform's environment variable system
- **Cron To Go variables**: Set job-specific environment variables
- **Never hardcode**: Avoid putting sensitive data directly in job commands

## Migration and Integration

### How do I migrate from Heroku Scheduler?
**A:** Use the one-click import feature:
1. Install Cron To Go on your Heroku app
2. Click "Import" in the Cron To Go dashboard
3. Select "Heroku Scheduler" as the source
4. Review and confirm the imported jobs

### Can I use Cron To Go with my existing CI/CD pipeline?
**A:** Yes, Cron To Go integrates well with CI/CD pipelines:
- **API integration**: Use the Cron To Go API to manage jobs programmatically
- **Environment deployment**: Jobs automatically use your app's current environment
- **Zero-downtime**: Jobs continue running during deployments

### How do I integrate Cron To Go with monitoring tools?
**A:** Cron To Go supports various monitoring integrations:
- **Webhooks**: Send job events to monitoring services
- **Email notifications**: Get alerts for job failures
- **API monitoring**: Monitor job status programmatically
- **Log aggregation**: Forward logs to your logging service 