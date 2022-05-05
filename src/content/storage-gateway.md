---
slug: storage-gateway
title: Storage Gateway
type: Storage
image: storage-gateway.png
---

## Storage Gateway Overview
* hybrid cloud storage service
* connect on-prem application to AWS
* low latency, data is compressed when sent
* gateway is a VM running on on-prem with any of:
  * file gateway: store and retrieve objects to and from S3
  * volume gateway: block storage to on-prem apps 
    * can be used to generate EBS volumes into S3
  * tape gateway: use S3 to backup tapes
    * can store tapes directly into glacier

## Datasync
* used for cloud data migration
* decommission on prem after moving to cloud
* better for large amounts of data
* can directly transfer into glacier

### Datasync vs Storage Gateway
* migration vs. integration