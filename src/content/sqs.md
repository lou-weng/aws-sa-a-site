---
slug: sqs
title: Simple Queue Service (SQS)
type: Application Integration
image: sqs.png
---

## SQS Overview
* used to decouple event processing from applications
* producer/consumer model
* fully managed

#### Types of application communication
* synchronous communication
  * application A communicates to application B
* asynchronous, event-based communication
  * application A sends an event into a queue, application B retrieves the event from queue
  * using the queue decouples application B from A

### Attributes
* unlimited throughput, unlimited messages in queue
* messages retained for 4 days, but can be set to max of 14 days
* messages limited to 256KB
* messages can be duplicated (at least once delivery)
* messages can be out of order (best effort ordering)

### Usage
* utilize the SendMessageAPI from the SDK
* message persists in SQS until a consumer deletes it
  * even if a message is processed, unless it is deleted, another consumer could pick it up
* you can link consumers to an autoscaling group and detect influx of messages in order to scale

### Message Visibility
* when a consumer polls a message, the message becomes invisible to other consumers for the duration of the '**message visibility timeout**'
* default timeout is 30 seconds
* if message not processed and deleted, it becomes visible in SQS after the timeout
* if timeout too high, failures take more time to reprocess
* if timeout too low, duplicate processing from consumers may occur

### Types of Queues
#### Dead Letter Queue
##### What happens if a message fails to be processed and always gets put back in the queue?
* maximum receive threshold can be set for a message
* if a message gets resent into the queue too many times, you can move it into a dead letter queue
* set an expiration of date of 14 days preferably for the dead letter queue

#### Delay Queue
* delay messages so that consumers don't see them immediately
* default delay is 0 seconds, but can be set up to 15 minutes
* can set a delay per queue or adjust delay for a specific message

#### FIFO (First in First out) Queue
* consumer polls the messages in the same order as producer
* limited throughput, so you don't want to overwhelm the queue
* exactly once send (removes duplicates)

##### What if you have different messages that might be grouped together
* give messages a Group ID so that they can be grouped together 
* without a group, only one consumer can read from a SQS FIFO queue
  
### Consumers
* containers
* EC2 instances
* AWS Lambda

#### Long Polling
* allow a consumer to wait for messages from SQS if there are none in the queue
* reduce the amount of API calls you make
* wait time for polling can be 1 to 20 seconds
* can be configured at the queue level or set the consumer to long poll

### Request-Response Systems
* for systems where requesters ask for something (HTTP calls to a server)
* allows responders to decouple from large request loads

#### How does the responder know which requester to talk to?
* requester attaches a correlation ID to their message so that responder knows where to go

#### How can I implement this?
* use the **SQS Temporary Queue Client**
* the tool uses a virtual queue so doesn't create/delete multiple SQS queues

### Security
* in-flight HTTPS API
* at-rest encryption using KMS keys
* client side encryption if client wants to control encryption

#### SQS Access Policies
* allow cross account access to SQS queues
* allow other serviecs to write to an SQS queue
  
```
{
    "Version": "2008-10-17",
    "id": "__default_policy_ID",
    "Statement": [
        {
            "Sid": "__owner_statement",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:..."
            },
            "Action": "SQS:*",
            "Resource": "arn:..."
        }
    ]
}
```