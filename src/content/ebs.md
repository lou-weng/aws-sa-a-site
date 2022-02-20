---
slug: ebs
title: Elastic Block Storage (EBS)
topic: Storage
---

### EBS Volumes
* elastic block store 
* **network** drive that can be attached to instances when they run (persistent storage)
  * uses a network connection to connect to an EC2 instance
  * latency transferring information through the network
* can only be mounted to one instance at a time
  * one EC2 instance may have more than one EBS attached to it
  * can be detached from an instance and reattached to another one
* bound to **availability zone**
  * the attached EC2 must be in the same AZ
* needs to be provisioned in advance (size and [IOPS](## "Input-output per second"))
  * you get billed for the capacity provisioned

### EC2 Instance Store
* high performance **hardware disk** that can be attached to an EC2 instance
* provides better throughput, IO performance
* lose storage if EC2 is stopped (**ephemeral**), not great for persistent data
  * data loss risk if hardware or EC2 fails
  * make sure that it is backed up/replicated frequently
* use case
  * buffer
  * cache
  * temporary data store

### EBS Volume Types

| Volume | Disk | Details | Boot Volume? |
| --- | --- | --- | --- |
| gp2, gp3 | SSD | General purpose with balanced price and performance | Yes |
| io1, io2 | SSD | High performance for mission-critical low latency or high throughput | Yes |
| s1 | HDD | low cost for frequently accessed and throughput intensive jobs | No |
| sc1 | HDD | lowest cost HDD for low frequently accessed jobs | No |

#### General Purpose (GP1, GP2)
* cost effective, low latency
* 1 GB - 16TB
* use case:
  * system boot
  * virtual desktop
  * development and test environment
* gp3 you can independently set throughput and iops, gp2 the two are linked

#### Provisioned IOPS SSD (IO1, IO2)
* database workload (persistence and consistency)
* 4 GB - 16 TB
* supports **EBS multi-attach**

##### EBS Multi-Attach
* EBS volume can only be attached to one instance, except for Multi-Attach
* you can attach the same volume to multiple instances in AZ
* used for high availability in linux clustered applications (Teradata)
* applications must be able to do concurrent write operations

#### Hard Disk Drive (S1, SC1)
* 126 MB - 16TB
* big data, warehousing, log processing

##### How are EBS Volumes characterized?
* size
* throughput
* IOPS (I/O Operations per Second)

### Snapshots
* snapshots/backups are copies of your EBS volume
* even if volume is terminated, you can restore it from a backup
* use to copy snapshots across availability zones or regions

##### Delete on Termination 
* automatically on for root volume that comes with the EC2 instance
* by default not on for other volumes attached to an instance

### Encryption
* encryption is handled by AWS
* at-rest and in-flight data is encrypted inside the volume
* snapshots are also encrypted

##### Encrypt an unencrypted volume
1. Create a new EBS snapshot
2. Encrupt the snapshot
3. Create new (encrypted) volume from snapshot
4. Attach new volume to instance

