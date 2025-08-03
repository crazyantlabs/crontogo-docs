---
sidebar_label: 'Overview'
title: 'Overview'
sidebar_position: 0
slug: /
---
[Cron To Go](https://crontogo.com) is a fully-managed cloud scheduler to run scheduled tasks based using CRON expressions or time intervals, up to once per minute. 

Cron To Go combines the simplicity of using cron to schedule jobs with the scale and elasticity of the cloud. Instead of running always-on processes, Cron To Go provides the option to start one-off tasks only when you need them. Another benefit of using Cron To Go over code-based schedulers is that you don't need to deploy new code when you have to make changes or additions to your scheduled jobs - simply add, edit or delete a job from the Cron To Go dashboard.

These docs are here to help you with any questions you may have. If there's anything else you'd like to see here or if you have other questions or feedback, please feel free to reach out to us via in-app chat (you'll find the chat button at the bottom-right corner of the screen).

## Popular use cases

Using feedback and data collected over time, we have highlighted the top use cases of our clients up to date:

* Running periodic SQL statements on databases. You can refresh materialized views, run cleanup statements to get rid of unwanted data, or perform BI processes such as in-database transformations. The following example makes use of psql command line with the DATABASE_URL environment variable to refresh a materialized view: psql $DATABASE_URL -c "REFRESH MATERIALIZED VIEW vw_account_counters"
* Hitting HTTP endpoints. You can easily make HTTP(S) requests to your web API or 3rd party API endpoints using Curl to start application processes. The following example uses curl to reach a 3rd party endpoint: curl http://itsthisforthat.com/api.php?json
* Scheduling periodical batch jobs. Jobs such as grabbing orders from Shopify, generating weekly reports, or sending email notifications to application users by running your own code are made possible.