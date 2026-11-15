---
sidebar_label: 'Monitoring Jobs'
title: 'Monitoring and Observing Jobs'
sidebar_position: 5
---

# Monitoring and Observing Jobs

This guide covers how to monitor, observe, and track job performance in Cron To Go.

## Viewing Job Logs

### Accessing Job Logs
1. Navigate to Jobs in your dashboard
2. Click on the job name
3. Click "View Logs" to see execution history

### Log Information
- Start and end times
- Duration and exit codes
- Complete log output (when available)

For more production-ready persistence of logs, we recommend using logging services for your job target logs.

## Job Alerts

### Email Notifications
- Configure email alerts for job events
- Set alert conditions (failed, succeeded, started, retried)
- Choose alert frequency (immediate, daily, weekly)
- Customize notification content

### Webhook Notifications
- Set up webhook endpoints
- Receive structured job event data
- Integrate with Slack, Discord, Teams
- Connect to PagerDuty or custom systems

## Real-time Monitoring

### Live Job Status
- View current job status indicators
- Monitor running jobs in real-time
- Track execution progress
- Auto-refresh dashboard updates

### Execution Tracking
- Monitor currently running jobs
- View execution progress
- Track resource usage in real-time
- Stream live log output

## Troubleshooting Monitoring

### Common Issues

#### Logs Not Appearing
- Check job status and execution
- Verify log retention settings
- Confirm access permissions
- Logs might not be available for your job target

#### Alerts Not Working
- Verify alert configuration
- Test notification delivery
- Check webhook endpoints
- Validate email settings

#### Performance Issues
- Analyze resource usage patterns
- Review historical performance data
- Identify bottlenecks
- Optimize job configuration
- Check your background jobs for queueing issues

## Resources

- **Creating Jobs**: [Creating Jobs](creating-jobs)
- **Updating Jobs**: [Updating and Editing Jobs](updating-jobs)
- **Deleting Jobs**: [Deleting Jobs](deleting-jobs)
