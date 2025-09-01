---
sidebar_label: 'Updating Jobs'
title: 'Updating and Editing Jobs'
sidebar_position: 3
---

# Updating and Editing Jobs

This guide covers how to update, edit, and modify existing jobs in Cron To Go.

## Editing Job Configuration

### Accessing Job Edit Mode

1. Navigate to Jobs in your dashboard
2. Click on the job name
3. Click "Edit" to modify the job

### Updating Job Properties

#### Job Name
- Update job name at any time
- Use descriptive names that include environment, frequency, and purpose

#### Schedule Updates
- Change cron expressions
- Modify rate expressions
- Update timezone settings

#### Target Configuration
- Modify target-specific settings based on target type

#### Jitter Configuration
- Add jitter to prevent thundering herd problems
- Increase or decrease jitter values
- Remove jitter if not needed

#### Job State
- Pause jobs temporarily
- Resume paused jobs

## Target-Specific Updates

### Heroku/Build.io Dyno Jobs
- Update dyno commands
- Modify app configuration
- Update dyno size settings
- Update timeout settings

## Bulk Job Updates

### Selecting Multiple Jobs
- Select individual jobs using checkboxes
- Select all jobs at once
- Filter jobs by name, status, or other criteria

### Bulk Operations
- Pause multiple jobs simultaneously
- Resume multiple jobs at once
- Delete multiple jobs in one operation

## Resources

- **Creating Jobs**: [Creating Jobs](creating-jobs)
- **Deleting Jobs**: [Deleting Jobs](deleting-jobs)
- **Job Monitoring**: [Monitoring and Observing Jobs](monitoring-jobs)
- **Cron Expressions**: [Cron Expressions Guide](cron-expressions)