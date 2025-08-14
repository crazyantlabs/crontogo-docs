---
sidebar_label: 'About Jobs'
title: 'About Jobs'
sidebar_position: 1
---

# About Jobs

Jobs are the core entities in Cron To Go. They are the scheduled tasks that you create and manage.

## Job Scheduling

Cron To Go supports the following scheduling options:

- **Cron Expression**: Use a cron expression to schedule a job (e.g. `0 2 * * *` for daily at 2 AM)
- **Time Interval**: Use a time interval to schedule a job (e.g. every 15 minutes, every 1 hour, every 1 day)

## Target Types

Cron To Go supports the following target types:

- **Heroku Dyno**: Trigger a one-off Heroku Dyno on schedule
- **Build.io Dyno**: Trigger a one-off Build.io Dyno on schedule
- **HTTP Endpoint**: Send a POST request to a HTTP endpoint on schedule (coming soon)
- **AWS Lambda Function**: Invoke a AWS Lambda function on schedule (coming soon)
- **DigitalOcean Function**: Invoke a Digital Ocean serverless function on schedule (coming soon)

