---
slug: mq
title: MQ
type: data
image: mq.png
---

## MQ Overview
* SQS, SNS are cloud native and use proprietary protocols provided by AWS
* open source protocols include MQTT, AMQP, STOMP, Openwire, WSS
* when migrating applications to cloud, use Amazon MQ instead of having to re-write things to use SQS/SNS

### How it works
* Amazon MQ runs on a dedicated machine
* contains a queue and topic feature 
* does not scale as well as cloud native options
* can be configured for high availability