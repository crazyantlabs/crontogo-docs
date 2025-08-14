---
sidebar_label: 'Creating Jobs'
title: 'Creating and Managing Jobs'
sidebar_position: 2
---

# Creating and Managing Jobs

This guide covers how to create and configure jobs in Cron To Go.

## Creating Your First Job

### Step 1: Access the Dashboard

1. Navigate to Jobs in your Cron To Go dashboard
2. Click "Add Job" or the "+" button
3. Fill out the job configuration form

### Step 2: Job Configuration

#### Job Name
- Use descriptive names that include purpose and frequency
- Examples: "Daily Database Backup", "Weekly Report Generation"

#### Schedule Configuration

Choose between a cron expression or a rate expression that will be used to schedule the job.

##### Cron Expression

Common examples:
- `0 2 * * *` - Daily at 2 AM
- `0 * * * *` - Every hour
- `*/15 * * * *` - Every 15 minutes
- `0 9 * * 1-5` - Weekdays at 9 AM

##### Rate Expression

Common examples:
- `5 minutes` - Every 5 minutes
- `2 hours` - Every 2 hours
- `1 day` - Every day
- `1 week` - Every week

##### Timezone

Choose the timezone for the job. UTC is recommended for avoiding daylight savings time issues.

- UTC (default)
- Common options: America/New_York, Europe/London, Asia/Tokyo

#### Target Type Selection

Choose from the following target types:

- **Heroku Dyno**: Trigger a one-off Heroku Dyno on schedule
    - Set Command to run your job
    - Set the Application to run the command on
    - Set Dyno Size to the size you want to use
    - Set Timeout to the timeout you want to use
- **Build.io Dyno**: Trigger a one-off Build.io Dyno on schedule `(coming soon)`
    - Set the Command to run your job
    - Set the Application to run the command on
    - Set Dyno Size to the size you want to use
    - Set Timeout to the timeout you want to use
- **HTTP Endpoint**: Send a POST request to a HTTP endpoint on schedule `(coming soon)`
    - Set the URL to send the request to
    - Choose the content type of the request
    - Set the Payload to the body you want to send
    - Set the signing secret to the value you want to use
    - Set the Authorization header to the value you want to use
- **AWS Lambda Function**: Invoke a AWS Lambda function on schedule `(coming soon)`
    - Set the Function ARN to the ARN of the AWS Lambda function you want to use
    - Set the Payload to a JSON value you want to send
    - Set the Timeout to the timeout you want to use
- **DigitalOcean Function**: Invoke a Digital Ocean serverless function on schedule `(coming soon)`
    - Set the Function to the Digital Ocean function you want to use
    - Set the Payload to a JSON value you want to send
    - Set the Timeout to the timeout you want to use


#### Jitter

- Adds random delay to prevent thundering herd problems
- Common values: 5 minutes, 15 minutes, 1 hour

#### State
Indicate if the jobs is active or paused

## Job Management

### Pausing and Resuming Jobs
- Pause jobs temporarily
- Resume paused jobs
- Bulk pause/resume operations

### Running Jobs Manually
- Run jobs immediately
- Add custom parameters when running

**Note**: For detailed information on updating, deleting, and monitoring jobs, see the dedicated guides:
- [Updating Jobs](updating-jobs) - Learn how to edit and modify existing jobs
- [Deleting Jobs](deleting-jobs) - Learn how to safely delete and remove jobs
- [Monitoring Jobs](monitoring-jobs) - Learn how to monitor and observe job performance

## Best Practices

### Job Naming
- Use descriptive names with purpose and frequency
- Avoid generic names like "job1", "backup", "test"

### Scheduling Best Practices
- Avoid overlapping jobs
- Use appropriate frequencies for the task type
- Consider timezone implications

### Target-Specific Best Practices

#### HTTP Endpoint Jobs
- Use HTTPS endpoints
- Include authentication headers for better security
- Set appropriate timeout values

#### AWS Lambda Jobs
- Use function ARN of the AWS Lambda function
- Configure appropriate timeout
- Consider cold start strategies

#### Heroku/Build.io Dyno Jobs
- Choose appropriate Dyno size that meets your job needs
- Plan for the Dyno concurrency limits

## Troubleshooting

### Common Issues

#### Job Not Running
- Check job status and ensure it's enabled
- Verify schedule syntax
- Confirm timezone settings

#### Job Failing
- Check logs for error details
- Verify target configuration
- Test target accessibility

#### Job Timing Out
- Increase timeout settings
- Optimize target implementation
- Consider breaking into smaller jobs

## Resources

- **Cron Expressions**: [Cron Expressions Guide](cron-expressions)
- **Updating Jobs**: [Updating and Editing Jobs](updating-jobs)
- **Deleting Jobs**: [Deleting and Removing Jobs](deleting-jobs)
- **Monitoring Jobs**: [Monitoring and Observing Jobs](monitoring-jobs) 