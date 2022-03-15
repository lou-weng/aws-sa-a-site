---
slug: snow
title: Snow
type: Migration & Transfer
image: snow.png
---

## AWS Snow Overview
* family of physical and portable devices to migrate data in and out of AWS

### Data Migration
* transferring large amount of data over a network takes a long time
* connectivity, bandwidth, network cost, and shared use can all impact transfer speeds
* AWS sends you a physical device via mail and you can send the Snow device to send data through a physical medium

### Snow Family Services
1. client requests Snowball device 
2. AWS sends the client a Snowball device via mail
3. load data onto the device locally and send it back to AWS
4. AWS imports/exports the device data onto S3

#### AWS Snowball Edge
* used to move TB or PB of data in and out of AWS
* pay for data transfer job
* used for large **data cloud migrations, decommissioning data centres, disaster recovery**

| Device Type | Capacity |
| --- | --- |
| Storage Optimized | 80TB |
| Compute Optimized | 42TB |

#### AWS Snowcone
* smaller than Snowball Edge (good for space constrained environments)
* you have to provide your own batteries and cables
* can withstand harsh environments
* only 8TB of usable storage 
* used for **edge computing, storage, data transfer**
* Snowcone can transfer data using AWS DataSync or mailed to AWS

#### AWS Snowmobile
* a truck used to transfer data
* used to transfer 1ExaByte (1000PB or 1,000,000TB), but each 
* high security, GPS
* better than Snowball Edge if you have over 10PB

### Snowball Usage
1. install snowball client/AWS OpsHub onto your servers
2. connect snowball to server and copy over files
3. ship device to AWS
4. snowball wiped after transfer

### OpsHub
* traditionally you need a CLI to use AWS Snow
* OpsHub is a program that you can download onto your computer to manage your snow devices

### S3 Glacier 
* you cannot directly connect Snowball to Glacier
* use S3 and lifecycle policies to migrate 