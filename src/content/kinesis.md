---
slug: kinesis
title: Kinesis
type: Analytics
image: kinesis.png
---

## Kinesis Overview
* used to collect, process, analyze streaming real-time data
* contains an entire family of offerings
* good for real-time processing, analytics, ETL

### Kinesis Family
#### Kinesis Data Streams
* data streams are made of shards
* more shards increase the throughput of the stream
* link kinesis to a producer of streaming data (applications, client, sdk)
* low latency
* you add your own code to manage ingested data
* you need to manage your scaling by shard splitting/merging

###### How does it work?
* producer creates a record 
  * **partition key**
  * data blob up to 1MB
* record gets sent into the data stream
* each shard can handle 1MB/s or 1000msg/s
* kinesis data stream is then sent to a consumer 
* sequence number given to processed data to denote which shard it went through

###### Billing
* billing is per shard provisioned

###### Data Retention
* data in shards can be retained for 1 day to 365 days
* allows you to replay data
* once data is inserted into a shard, it cannot be deleted
* data that shares the same parition goes to the same shard

#### Kinesis Firehose
* used to store data into a target destination
* reads records up to 1MB at a time
* lambda can be attached to firehose to transform data
* firehouse batch writes the data (32MB minimum) into a target destination (near-real-time)
* serverless, auto-scaling, fully managed

##### Billing
* pay for the data that you use

##### Destinations
###### AWS
* S3
* Redshift
* Elasticsearch

###### 3rd Party
* Datadog
* New Relic
* Splunk

###### Custom
* HTTP endpoint

#### Kinesis Data Analytics
* writing SQL code on your streams (**real time analytics**)
* source comes from Kinesis Data Stream and Kinesis Data Firehouse
* you can run SQL statements on the real time streaming data and send the results to Data Streams or Fire Hose
* fully managed (auto scaling)
* good for real time dashboards and metrics

### Kinesis Case
* You have 100 trucks where you want to track their information, but in order. 
* how would you use Kinesis and SQS to scale the ingestion and processing of each truck

* use a partition key that maps to each truck's unique truck id
  * this will make sure a truck will always go to a particular shard (maintain order)
* set the kinesis stream to send data into an SQS FIFO queue
  * FIFO queue retains ordering
* set a Group ID that maps to each truck's id so that you can scale the amount of consumers (one for each truck)

