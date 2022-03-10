---
slug: sns
title: Simple Notification Service (SNS)
type: App Integration
image: sns.png
---

## SNS Overview
* used to send messages/notifications to multiple receivers
* publisher/subscriber model
* many subscribers may want to listen for messages

### How it works
* an event producer creates a message to an SNS 'topic'
* many receivers can watch the SNS queue for topic notifications
* 100 000 topic limit, 10 000 000 subscriptions per topic

#### Subscriber Sources
* SQS
* HTTP
* Lambda
* Emails
* SMS messages
* mobile notifications

#### Publishing to SNS
* create a topic 
* create a subscription to the topic
* publish messages to a topic

### Security
* refer to SQS security 

### SQS Integation (Fan-out)
* you can further decouple by combining SNS and SQS
* push a message into a SNS topic, then have all receiving SQS queues subscribe to the topic
* allows for data to be persisted and processing through failure
* make sure to enable SQS access policy to allow SNS write

### Topics
#### First-In First-Out (FIFO)
* producer sends messages to SNS FIFO and receivers will receive messages in order
* retains message order and reduces duplication by using a deduplication ID
* only have SQS FIFO queues as subscribers

#### Message Filtering
* subscriber uses JSON policy to filter SNS policies from producer
* default is for subscriber to receive all messages