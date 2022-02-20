---
slug: efs
title: Elastic File System (EFS)
type: storage
---
## Elastic File System Overview
* managed network file system that can be mounted onto any EC2
* supports EC2 instances across multiple AZs
* more expensive than EBS (only pay for what you use)
* use security group to manage connections to EC2 instances
* only used with Linux AMIs
* encryption done using AWS KMS

#### Use Cases
* content management
* web serving
* data sharing

### EFS Types
* Performance mode
  * **General purpose**: latency sensitive use cases
  * **Max I/O**: high latency, throughput, good for parallel tasks
* Throughput mode
  * **Bursting**
  * **Provisioned**: sets throughput regardless of storage size
    * good for small file system, but high throughput

### EFS Storage Tiers
* Standard: frequently accessed files
* Infrequent Access: cost to retrieve files, but lower price to store