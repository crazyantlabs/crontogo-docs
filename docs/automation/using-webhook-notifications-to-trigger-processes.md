---
sidebar_label: 'Webhook notifications'
title: 'Using webhooks notification to trigger processes'
sidebar_position: 1
---
Webhooks enable you to receive notifications whenever particular events occur within your Cron To Go organization. You can subscribe to notifications for the following events:

* Job execution started
* Job execution succeeded
* Job execution failed

Webhook notifications are sent as HTTP POST requests to a URL of your choosing. To integrate with webhooks, you need to implement a server endpoint that can receive and handle these requests.

:::info
Please note that our webhooks don’t work with self-signed certs. If a webhook detects a self-signed cert, it will result in an error and no request will be sent.
:::

To subscribe to webhooks, click **Webhooks** from the menu, and then click the `Add webhook` button.

In the dialog that opens, fill out the following:

* `Nickname` (optional) - a descriptive name for your webhook.
* `Endpoint`  
  * `Type` - select one of the supported endpoint types:  
    * `Webhook` - send a HTTP POST requests to the endpoint URL.
    * `Slack` - send a Slack message to the endpoint URL which should be a valid [Slack incoming webhook URL](https://slack.com/oauth/v2/authorize?client_id=754603809072.3867924020054&scope=incoming-webhook&user_scope=).
    * `Teams` - send a Microsoft Teams message to a [Teams incoming webhook URL](https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook?tabs=dotnet).
    * `Email` - send a notification to an email recipient.
  * `URL` - For Webhook, this should be a valid HTTPS URL that will receive webhook notifications. For Slack and Teams, this should be a valid incoming webhook URL. 
  * `Email` - An email address of a recipient that will receive all webhook notifications for Email types. An address with display name is also supported (e.g. `Display Name <email-address>`)
* `Authorization Header` (optional) - a custom `Authorization` header that will be included with all webhook notifications.
* `Topics` - select the types of notifications you want to be informed about. You must include at least one topic.
* `Filter` (optional) - apply filtering rules to trigger notifications that meet the specified criteria, i.e. have (or don't have) certain properties.

Finish by clicking `Add webhook`.

### Securing Webhooks

To ensure the authenticity of webhook requests originating from Cron To Go and to prevent tampering, validate the signature in the X-Hub-Signature header before processing the delivery further. This helps you avoid processing unauthorized requests and prevents man-in-the-middle attacks.

To do this, you need to:

1. Once a webhook is created, a signing secret is generated and displayed one time (you can rotate and request a new secret at any time).
2. Store the signing secret securely on your server.
3. Validate incoming webhook payloads against the signature to verify they are from Cron To Go and were not tampered with.

:::important

1. **Never** hardcode the signing secret in your code. Always store it securely and never expose it in your logs.
2. **Never** use a plain comparison operator to compare the signatures. Use a secure comparison function to avoid timing attacks.
:::


You may also use an authorization header to verify that the request did, indeed, come from Cron To Go. When properly set, the authorization header is passed through in the `Authorization` header in the request. It should be validated using the authorization mechanism of your choice on through your server.

#### Validating Webhook Signature

To ensure the authenticity of webhook requests originating from Cron To Go and to ensure that the delivery was not tampered with, validate the signature in the `X-Hub-Signature` header before processing the delivery further. This helps you avoid processing unauthorized requests and prevents man-in-the-middle attacks.

#### Testing the Webhook Signature Validation

To test the validation process, you can use the following `secret` and `payload` values to verify that your implementation is working correctly.

`secret`: "Very Secret Secret"  
`payload`: "Hello! This is a test payload."  

If your implementation is correct, the generated signature should be `sha256=8ba4c47558de1872150c3ec82211c34bf0cbd6d60fc4f9875b97853af06de917` and it can be validated against the signature provided in the `X-Hub-Signature` header.


#### Examples

Here are code examples for validating the webhook signature in different languages:

**Ruby**

```ruby
require 'openssl'
require 'json'

payload = 'Hello! This is a test payload.'
secret = 'Very Secret Secret' # ENV['SFTPTOGO_WEBHOOK_SINGING_SECRET']

# This should be the value of the X-Hub-Signature header
signature = 'sha256=8ba4c47558de1872150c3ec82211c34bf0cbd6d60fc4f9875b97853af06de917'

computed_signature = 'sha256=' + OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new('sha256'), secret, payload)

if computed_signature.bytesize == signature.bytesize && OpenSSL.fixed_length_secure_compare(computed_signature, signature)
  puts 'Signature is valid'
else
  puts 'Signature is invalid'
end
```

**Python**

```python
import hmac
import hashlib

payload = 'Hello! This is a test payload.'
secret = 'Very Secret Secret' # os.environ['SFTPTOGO_WEBHOOK_SINGING_SECRET']

# This should be the value of the X-Hub-Signature header
signature = 'sha256=8ba4c47558de1872150c3ec82211c34bf0cbd6d60fc4f9875b97853af06de917'

computed_signature = 'sha256=' + hmac.new(secret.encode(), payload.encode(), hashlib.sha256).hexdigest()

if hmac.compare_digest(computed_signature, signature):
    print('Signature is valid')
else:
    print('Signature is invalid')
```

**Node.js**

```javascript
const crypto = require('crypto');


const payload = 'Hello! This is a test payload.'
const secret = 'Very Secret Secret' // process.env.SFTPTOGO_WEBHOOK_SINGING_SECRET

// This should be the value of the X-Hub-Signature header
const signature = 'sha256=8ba4c47558de1872150c3ec82211c34bf0cbd6d60fc4f9875b97853af06de917';

const computedSignature = 'sha256=' + crypto.createHmac('sha256', secret).update(payload).digest('hex');

function safeCompare(a, b) {
  var strA = String(a);
  var strB = String(b);

  var aLen = Buffer.byteLength(strA);
  var bLen = Buffer.byteLength(strB);

  // Always use length of a to avoid leaking the length. Even if this is a
  // false positive because one is a prefix of the other, the explicit length
  // check at the end will catch that.
  var bufA = Buffer.alloc(aLen, 0, 'utf8');
  bufA.write(strA);
  var bufB = Buffer.alloc(aLen, 0, 'utf8');
  bufB.write(strB);

  return crypto.timingSafeEqual(bufA, bufB) && aLen === bLen;
}

if (safeCompare(computedSignature, signature)) {
  console.log('Signature is valid');
} else {
  console.log('Signature is invalid');
}

```

### Managing Webhooks

After creating a webhook, you may do the following:

* Pause/Resume - temporarily pause or resume webhook notifications.
* Rotate secret - request a new signing secret. See [Securing Webhooks](#securing-webhooks)
* Ping webhook - manually send a test event to your endpoint
* View deliveries - View a log of the notifications that Cron To Go has enqueued for delivery. Each notification has a `status` (one of `Succeeded`, `Failed`, 'Pending'), `Created` timestamp, `ID`, `Topic` (one of `job.execution.started`, `job.execution.succeeded`, `job.execution.failed`, `webhook.ping`) and `Duration`. You may also view the `Request payload`, `Response code`, and `Response body` as well as manually send a webhook payload from within the webhook delivery dialog.

### Receiving Webhooks

When a webhook event that you've subscribed to occurs, SFTP To Go sends a POST request to your server endpoint consisting of the events’ details.

You can verify the authenticity of these requests through any of the following ways:

* The request’s Authorization header matches the value you provided when subscribing to notifications.
* The request’s X-Hub-Signature header contains the HMAC SHA256 signature of the request body (signed with the given secret value provided when subscribing).

:::tip
Path is form-urlencoded, that is, spaces are encoded as `+` and `+` is encoded as `%2b`. Use the appropriate function to decode in order to avoid confusion between the two characters.
:::


A resulting webhook notification request resembles the following:

```
POST https://webhook.site/394f2074-e56f-4110-7bf7-ca14a1f48b7c
Authorization: Bearer 01234567-89ab-cdef-0123-456789abcdef
X-Hub-Signature: cLcN5U5x+jHEkANnVaaRwBw7yE4uv4pXdjcY9Cajc7M=
```

```json
{
  "Metadata": {
    "Webhook": {
      "Id": "6b1c6f0c-52c1-47a6-9344-57a4579ced68"
    },
    "Delivery": {
      "Id": "c7ce90e6-5708-43b1-a052-13991f45c771"
    },
    "Attempt": {
      "Id": "2e241efe-d22f-4fe7-aab9-adcde63fca6d"
    },
    "Event": {
      "Id": "2e579289-4c4a-4085-9b43-74020865cdda",
      "Topic": "webhook.ping"
    }
  },
  "CreatedAt": 1590911947688,
  "Resource": "webhook",
  "PreviousData": null,
  "Data": {
    "Topics": [
      "job.execution.succeeded",
      "job.execution.failed",
      "job.execution.started"
    ],
    "State": "paused",
    "Alias": "Test Webhook",
    "CreatedAt": 1590501031122,
    "Id": "6b1c6f0c-52c1-47a6-9344-57a4579ced68",
    "OrganizationId": "d57060b1-23fe-2d59-afd0-7f56d9e1fc55",
    "UpdatedAt": 1590911941179,
    "Url": "https://webhook.site/394f2074-e56f-4110-7bf7-ca14a1f48b7c"
  },
  "Id": "2e579289-4c4a-4085-9b43-74020865cdda",
  "Topic": "webhook.ping",
  "UpdatedAt": 1590911947688
}
```

You should always respond with a 200-level status code to indicate that you had received the notification. SFTP To Go ignores the body of your response, so a 204 status with an empty body is ideal:

```
204 No Content
```

:::note
If you do not return a 200-level status code, SFTP To Go records the failure. The failure can be viewed in the deliveries log.
:::

The `Actor` key contains information on the user who performed the action. If the action was performed by a user, the `Type` would be `User` and the `Id` would be the **username**.

### job.execution.started Event Format

```json
{
  "Id": "22e45a18-0a91-470d-b0d4-846b2fa832cb",
  "Topic": "job.execution.started",
  "CreatedAt": 1590591047428,
  "UpdatedAt": 1590591047428,
  "Resource": "JobExecution",
  "PreviousData": null,
  "Data": {
    "AttemptsCount": 1,
    "TriggerType": "manual",
    "Target": {
      "Type": "dyno",
      "TimeToLive": 1800,
      "AppId": "22e1e196-fbc6-4091-af57-8d7ad63aa7d3",
      "Command": "python run_etl.py",
      "Size": "Hobby"
    },
  }
  "State": "running",
  "CreatedAt": 1590591046983,
  "Id": "43668791-ce11-4994-9e91-fc8fda310614",
  "OrganizationId": "d57060b1-23fe-2d59-afd0-7f56d9e1fc55",
  "NextAttemptAt": null,
  "UpdatedAt": 1590591046983,
  "JobId": "6069e1c0-280d-22a3-93ce-159d9a60924d",
  "LastAttempt": {
    "State": "running",
    "CreatedAt": 1590591046512,
    "Id": "a28c2010-549c-4253-a869-42b748998477",
    "StatusCode": 201
  },
  "Metadata": {
    "Webhook": {
      "Id": "6b1c6f0c-52c1-47a6-9344-57a4579ced68"
    },
    "Delivery": {
      "Id": "e69d0b8a-447d-4ddc-a21a-704630272353"
    },
    "Attempt": {
      "Id": "7ecb9953-dd36-4309-8db6-0043f989b7aa"
    },
    "Event": {
      "Id": "22e45a18-0a91-470d-b0d4-846b2fa832cb",
      "Topic": "job.execution.started"
    }
  }
}
```

### job.execution.succeeded Event Format

```json
{
  "Id": "5b8f2e1c-4a53-4db6-b6ae-a88786f77459",
  "Topic": "job.execution.succeeded",
  "CreatedAt": 1590591016589,
  "UpdatedAt": 1590591016589,
  "Resource": "JobExecution",
  "PreviousData": null,
  "Data": {
    "AttemptsCount": 1,
    "TriggerType": "schedule",
    "Target": {
      "Type": "dyno",
      "TimeToLive": 1800,
      "AppId": "22e1e196-fbc6-4091-af57-8d7ad63aa7d3",
      "Command": "python run_etl.py",
      "Size": "Hobby"
    },
    "State": "succeeded",
    "CreatedAt": 1590591011407,
    "Id": "acc83806-505c-46a1-b9a9-04025f7d66fe",
    "OrganizationId": "d57060b1-23fe-2d59-afd0-7f56d9e1fc55",
    "NextAttemptAt": null,
    "UpdatedAt": 1590591016222,
    "JobId": "6069e1c0-280d-22a3-93ce-159d9a60924d",
    "LastAttempt": {
      "ExitStatus": 0,
      "State": "succeeded",
      "CreatedAt": 1590591011017,
      "Id": "2f858f6e-1adb-46ac-945f-b86230ec2076",
      "StatusCode": 201
    }
  },
  "Metadata": {
    "Webhook": {
      "Id": "6b1c6f0c-52c1-47a6-9344-57a4579ced68"
    },
    "Delivery": {
      "Id": "277d0c61-1eff-46f2-8e8a-22d9c144d11c"
    },
    "Attempt": {
      "Id": "6c6128fd-ca7f-4828-997f-0084cc15d4b1"
    },
    "Event": {
      "Id": "5b8f2e1c-4a53-4db6-b6ae-a88786f77459",
      "Topic": "job.execution.succeeded"
    }
  }
}
```

:::tip
When a Data.Path value ends with `/`, this indicates that a directory has been created. In all other instances, a file had been created.
:::


### file.downloaded Event Format

```json
{
  "Id": "265a4af1-7db2-41ad-a3d1-79f7ef2b20ac",
  "Topic": "job.execution.failed",
  "CreatedAt": 1590591051225,
  "UpdatedAt": 1590591051225,
  "Resource": "JobExecution",
  "PreviousData": null,
  "Data": {
    "AttemptsCount": 1,
    "TriggerType": "manual",
    "Target": {
      "Type": "dyno",
      "TimeToLive": 1800,
      "AppId": "22e1e196-fbc6-4091-af57-8d7ad63aa7d3",
      "Command": "python run_etl.py",
      "Size": "Hobby"
    },
    "State": "failed",
    "CreatedAt": 1590591046983,
    "Id": "43668791-ce11-4994-9e91-fc8fda310614",
    "OrganizationId": "d57060b1-23fe-2d59-afd0-7f56d9e1fc55",
    "NextAttemptAt": null,
    "UpdatedAt": 1590591051024,
    "JobId": "6069e1c0-280d-22a3-93ce-159d9a60924d",
    "LastAttempt": {
      "ExitStatus": 7,
      "Message": "Process exited with status 7",
      "State": "failed",
      "CreatedAt": 1590591046512,
      "Id": "a28c2010-549c-4253-a869-42b748998477",
      "StatusCode": 201
    }
  },
  "Metadata": {
    "Webhook": {
      "Id": "6b1c6f0c-52c1-47a6-9344-57a4579ced68"
    },
    "Delivery": {
      "Id": "a03167ee-e26c-47dc-a798-f3fa4eb2a41d"
    },
    "Attempt": {
      "Id": "c56f1bbf-b154-4f0b-96dd-d500946cbd55"
    },
    "Event": {
      "Id": "265a4af1-7db2-41ad-a3d1-79f7ef2b20ac",
      "Topic": "job.execution.failed"
    }
  }
}
```

### webhook.ping Event Format

```json
{
  "Id": "2e579289-4c4a-4085-9b43-74020865cdda",
  "Topic": "webhook.ping",
  "CreatedAt": 1590911947688,
  "UpdatedAt": 1590911947688,
  "Resource": "webhook",
  "PreviousData": null,
  "Data": {
    "Topics": [
      "job.execution.succeeded",
      "job.execution.failed",
      "job.execution.started"
    ],
    "State": "paused",
    "Alias": "Test Webhook",
    "CreatedAt": 1590501031122,
    "Id": "6b1c6f0c-52c1-47a6-9344-57a4579ced68",
    "OrganizationId": "d57060b1-23fe-2d59-afd0-7f56d9e1fc55",
    "UpdatedAt": 1590911941179,
    "Url": "https://webhook.site/394f2074-e56f-4110-7bf7-ca14a1f48b7c"
  },
  "Metadata": {
    "Webhook": {
      "Id": "6b1c6f0c-52c1-47a6-9344-57a4579ced68"
    },
    "Delivery": {
      "Id": "c7ce90e6-5708-43b1-a052-13991f45c771"
    },
    "Attempt": {
      "Id": "2e241efe-d22f-4fe7-aab9-adcde63fca6d"
    },
    "Event": {
      "Id": "2e579289-4c4a-4085-9b43-74020865cdda",
      "Topic": "webhook.ping"
    }
  }
}
```


### Filtering Webhooks

With webhook filters, you can specify conditions that must be met for SFTP To Go to trigger events. This allows you to create customized rules for triggering webhooks, based on specific criteria.

Webhook filters use the AND operator to combine filtering rules. This means that all specified conditions must be met in order for the webhook to be triggered. Each rule consists of three elements: field, operator, and value.

#### Fields

The following fields can be used in a webhook filter:

* **Job ID**: The identifier of the job that triggered the event.
* **Job Command**: The command that was executed.
* **Execution State**: The state of the job execution.

#### Operators

The following operators can be used in a webhook filter:

* **Is**: Checks if the field and value match exactly (e.g. Job ID Is 1234567890).
* **Is not**: Checks if the field and value don't match (e.g. Job ID Is not 1234567890).
* **Contains**: Checks if the field contains the value (e.g. Job Command Contains "python run_etl.py").
* **Doesn't contain**: Checks if the field does not contain the value (e.g. Job Command Doesn't contain "python run_etl.py").
* **Starts with**: Checks if the field starts with the value (e.g. Job Command Starts with "python run_etl.py").
* **Ends with**: Checks if the field ends with the value (e.g. Job Command Ends with "python run_etl.py").
* **Matches**: Checks if the field matches the regular expression in the value (e.g. Job Command Matches (python|run_etl|ruby)).

By using webhook filters, you can create powerful rules for triggering webhooks based on specific criteria.
