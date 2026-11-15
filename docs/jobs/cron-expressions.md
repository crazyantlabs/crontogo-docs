---
sidebar_label: 'Cron Expressions'
title: 'Cron Expressions Guide'
sidebar_position: 30
---

# Cron Expressions Guide

Cron expressions are a powerful way to schedule jobs with precision. This guide covers the syntax, common patterns, and best practices for using cron expressions in Cron To Go.

## Basic Syntax

Cron expressions consist of 5 or 6 fields:

```
* * * * * [command]
│ │ │ │ │
│ │ │ │ └── Day of week (0-7, where 0 and 7 are Sunday)
│ │ │ └──── Month (1-12)
│ │ └────── Day of month (1-31)
│ └──────── Hour (0-23)
└────────── Minute (0-59)
```

## Special Characters

| Character | Description | Example |
|-----------|-------------|---------|
| `*` | Every value | `* * * * *` = every minute |
| `?` | No specific value (day of week/month) | `0 0 * * ?` = daily at midnight |
| `-` | Range | `0 9-17 * * *` = every hour 9 AM to 5 PM |
| `/` | Step/increment | `0 */2 * * *` = every 2 hours |
| `,` | Multiple values | `0 0 1,15 * *` = 1st and 15th of month |
| `L` | Last day of month/week | `0 0 L * *` = last day of month |
| `W` | Weekday nearest to date | `0 0 15W * *` = nearest weekday to 15th |
| `#` | Nth day of month | `0 0 * * 1#2` = 2nd Monday of month |

## Common Examples

### Minute Patterns
```bash
# Every minute
* * * * *

# Every 5 minutes
*/5 * * * *

# Every 15 minutes
*/15 * * * *

# Every 30 minutes
*/30 * * * *
```

### Hour Patterns
```bash
# Every hour
0 * * * *

# Every 2 hours
0 */2 * * *

# Every 6 hours
0 */6 * * *

# Business hours (9 AM to 5 PM)
0 9-17 * * *
```

### Daily Patterns
```bash
# Daily at midnight
0 0 * * *

# Daily at 2 AM
0 2 * * *

# Daily at noon
0 12 * * *

# Daily at 6 PM
0 18 * * *
```

### Weekly Patterns
```bash
# Every Monday at 9 AM
0 9 * * 1

# Every weekday at 8 AM
0 8 * * 1-5

# Every weekend at 10 AM
0 10 * * 6,0
```

### Monthly Patterns
```bash
# 1st of every month at 1 AM
0 1 1 * *

# 15th of every month at 3 PM
0 15 15 * *

# Last day of month at 11 PM
0 23 L * *
```

### Complex Patterns
```bash
# Every 2 hours during business days
0 9-17/2 * * 1-5

# Every 15 minutes during business hours
*/15 9-17 * * 1-5

# 2nd Tuesday of every month
0 9 * * 2#2

# Every 30 minutes on weekends
*/30 * * * 6,0
```

## Advanced Patterns

### Multiple Times
```bash
# Twice daily (9 AM and 6 PM)
0 9,18 * * *

# Three times daily
0 8,12,18 * * *

# Every 4 hours starting at 2 AM
0 2,6,10,14,18,22 * * *
```

### Business Hours
```bash
# Every hour during business days
0 9-17 * * 1-5

# Every 30 minutes during business hours
*/30 9-17 * * 1-5

# Every 15 minutes during business hours
*/15 9-17 * * 1-5
```

### Weekend Patterns
```bash
# Every hour on weekends
0 * * * 6,0

# Every 2 hours on weekends
0 */2 * * 6,0

# Weekend maintenance at 2 AM
0 2 * * 6,0
```

## Real-World Examples

### Database Operations
```bash
# Daily backup at 2 AM
0 2 * * * pg_dump $DATABASE_URL > backup.sql

# Weekly cleanup on Sunday at 3 AM
0 3 * * 0 python cleanup_old_data.py

# Monthly maintenance on 1st at 1 AM
0 1 1 * * python monthly_maintenance.py
```

### API Calls
```bash
# Health check every 5 minutes
*/5 * * * * curl https://your-app.com/health

# Data sync every hour
0 * * * * curl -X POST https://api.example.com/sync

# Report generation daily at 6 AM
0 6 * * * python generate_daily_report.py
```

### Monitoring
```bash
# System check every 15 minutes
*/15 * * * * python system_monitor.py

# Performance metrics every hour
0 * * * * python collect_metrics.py

# Weekly performance report
0 8 * * 1 python weekly_performance_report.py
```

## Best Practices

### Avoid Overlapping Jobs
```bash
# Good: Jobs don't overlap
0 2 * * * daily_backup.sh
0 3 * * * daily_cleanup.sh

# Avoid: Jobs might overlap
0 2 * * * long_running_job.sh
0 2 * * * another_job.sh
```

### Use Appropriate Frequencies
```bash
# High-frequency monitoring (every 5 minutes)
*/5 * * * * health_check.sh

# Medium-frequency tasks (every hour)
0 * * * * data_sync.sh

# Low-frequency maintenance (daily/weekly)
0 2 * * * daily_maintenance.sh
```

### Consider Time Zones
```bash
# Use UTC for consistency
0 2 * * * backup.sh  # 2 AM UTC

# Or specify timezone in your job
0 2 * * * TZ=America/New_York backup.sh
```

### Test Your Expressions
```bash
# Test locally before deploying
crontab -l  # View current crontab
crontab -e  # Edit crontab

# Use online cron expression validators
# https://crontab.guru/
# https://cron.qqe2.com/
```

## Common Mistakes

### Incorrect Field Order
```bash
# Wrong: Day of week in wrong position
* * 1 * *  # This means every minute on 1st of month

# Correct: Day of week at the end
* * * * 1  # This means every minute on Monday
```

### Overly Complex Expressions
```bash
# Avoid: Too complex to maintain
0 9-17/2 1,15,30 * 1-5

# Better: Split into multiple jobs
0 9,11,13,15,17 1 * * 1-5   # 1st of month
0 9,11,13,15,17 15 * * 1-5  # 15th of month
0 9,11,13,15,17 30 * * 1-5  # 30th of month
```

### Ignoring Time Zones
```bash
# Problematic: Assumes local timezone
0 2 * * * backup.sh

# Better: Explicit timezone
0 2 * * * TZ=UTC backup.sh
```

## Testing and Validation

### Validate Expressions
Use online tools to validate your cron expressions:
- [Cron Expression To Go](https://cronexpressiontogo.com/)
- [Crontab Guru](https://crontab.guru/)

### Monitor Execution
- Check job logs in Cron To Go dashboard
- Set up notifications for job failures

## Resources

- **Cron Expression Validator**: [Cron Expression To Go](https://cronexpressiontogo.com/)
- **Cron To Go Blog**: [Complete Guide to Cron](https://crontogo.com/blog/the-complete-guide-to-cron/)
- **Job Management**: [Creating Jobs](../jobs/creating-jobs) 