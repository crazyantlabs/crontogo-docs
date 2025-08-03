---
sidebar_label: 'Email notifications'
title: 'Setting up email notification'
sidebar_position: 2
---

Cron To Go monitors your job executions and determines execution status using API response status code and the process exit code. When a process exits with code 0 (zero), execution is successful. Otherwise, if the API response status code is not 2xx or the process exit code is greater than 0, the job is marked as failed.

By default, app members of plans that support notifications will receive email notifications every time a job starts to fail and additionally when the job completes successfully after one or more consecutive failures.

You can change these settings by clicking `Settings` in dashboard top menu:

* Change the notification trigger, to permit email notifications only when jobs start to fail.
* Set recipient emails manually (the preferred approach is to use your email platform to create an alias and manage group membership instead of managing email lists in Cron To Go).
* Silence notifications by deselecting both app members and email recipients.
