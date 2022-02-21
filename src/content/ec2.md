---
slug: ec2
title: Elastic Compute Cloud (EC2)
type: Compute
image: ec2.png
---

## EC2 Fundamentals
* AWS's most low-level service offering (Infrastructure as a Service)
* Infrastructure offerings consists of multiple different related functions
  * [**EC2**](## "Elastic Compute Cloud"): Renting virtual machines 👈 **Our focus right now**
  * [**EBS**](## "Elastic Block Storage"): Renting virtual storage and memory
  * [**ELB**](## "Elastic Load Balancer"): Distributing load
  * [**ASG**](## "Auto Scaling Group"): Auto-scaling

### Configuration Options
* operating system (Mac, Linux, Windows)
* **compute power**
* **memory**
* **storage**
* network
* firewall
* configuration scripts

#### EC2 User Data
* allows you to [**bootstrap**](## "launching commands when the machine is first booted up") your EC2 instance
* allows for automation and configuration of EC2 intance upon startup
  * installing updates and software
  * downloading from internet
* all commands run with root permissions (sudo)

##### Example User Data Script
```shell
!/bin/bash

yum update -y
yum install -y httpd
systemctl start httpd
```

### Instance Types

#### Instance Type Naming Convention

m5.2xlarge
* m: instance class
* 5: generation
* 2xlarge: size within the instance class

#### Instance Types

| Type | Purpose | Families | Use Case |
| --- | --- | --- | --- |
| General Purpose | Balance between compute, memory, networking | M, T, A | web servers, code repos |
| **Compute** Optimized | High performance and CPU intensive tasks | C | batch processing, media, modelling & ML, gaming |
| **Memory** Optimized | Fast performance for large data sets | R, X, Z | databases, in-memory database for BI, real-time data processing |
| **Storage** Optimized | Tasks with high reads and write to persistent storage | I, D, H | OLTP, databases, data warehousing, distributed file systems |

### Instance Launch

| Launch Type | Benefit | Drawback | Use Case |
| --- | --- | --- | --- |
| On-demand | No commitment | Highest cost | Short-term, uninterrupted workloads |
| Reserved Instance | Discounts | Commitment to contact | Steady-state usage |
| Spot Instance | Highest discount | Can lose instance | Failure resistant jobs |
| Dedicated Host | Control over entire server | Most expensive option | Regulations, licensing, compliance |
| Dedicated Instance | Control over instances in physical hardware | More expensive | Regulations, licensing, compliance at an instance level |

#### On-demand
* Standard use of EC2 where you **pay as you go**
* Billed per second/per minute

#### Reserved Instance
* Up to 75% discount compared to on-demand
* Allows you to reserve instances from AWS at a discount (more discount the longer you reserve)
* Purchasing options
  * no upfront
  * partial upfront
  * all upfont (largest discount)
* You need to reserve a specific instance type as well
* Multiple types of reserved instances
  * **Standard** reserved
  * **Convertible** reserved
    * change EC2 instance type
  * **Scheduled** reserved
    * specific launch time window

#### Spot Instances
* up to 90% discount compared to on-demand
* Spot price fluctuates over time
* If your max price for spot instances is less than the current spot price, then you lose the instance
* Good for failure resistant processes
  * Batch jobs (you can always restart the batch processing)
  * Data analysis (as long as the spot instance doesn't lose the base data being used)
  * Image processing (you can always restart the processing from the base image)
  * Distributed jobs (other servers can pick up from where the instance was lost)
  * Flexible start & end time

##### How does the "lose" instance work?
* You set a maximum price that you can pay for a spot instance
* As long as the current spot price < your max price, you get access to a spot instance
  * Current spot price changes hourly and is affected by demand and capacity
  * If the current spot price goes over your max price, you have a **2 minute grace period** to either **stop** or **terminate** the instance

##### Spot Requests
1. Create a spot request
   * Define price, # of instances, launch config, request type, valid from/till
   * **One-time** request (single request for instances)
   * **Persistent** request, the request will trigger when an instance gets stopped or interrupted
2. Spot requests have different states
   * **Open**: request creation
   * **Active**: creating spot instances to the spec of the spot request
   * **Disabled**: not currently running
   * Failed: unable to create spot request
   * Closed: after one-time request, don't use the request anymore
   * Cancelled: self-explanatory
   * **Bolded states can be cancelled**
3. If you have a persistent request, cancel the spot request first **BEFORE** you terminate any spot instances
   * All running spot instances have to be manually cancelled
   * If a request is active when you terminate, the spot request will boot up another spot instance to ensure request specifications are met

##### Spot Fleets
* Launch a set of spot instances and on demand instances based on your target **capacity** and **price** constraints
* Configure launch "pools" (clusters with configuration options): instance type, OS, AZ
* Set multiple pools so that the fleet can choose what it wants to launch
* Pool Best Practices 
  * Lowest Price
  * Diversified
  * Capacity Optimized
* **automatically request spot instances at the lowest price**

##### Spot Blocks
* Deprecated as of December 21, 2022
* Get a spot instance for a specified time frame (1-6 hours)
* Very rare, but instance could still be reclaimed

#### Dedicated Hosts
* Most expensive option (per **host** billing)
* You rent an entire physical server from AWS that you reserve for yourself
* 3-year period reservation period

#### Dedicated Instances
* Instances are run on hardware that's owned by you (per **instance** billing)
* Share hardware with other instances within an account
* 1 or 3 year reservation period

### Instance Security

#### Security Groups
* Control traffic in/out of EC2 instances
* Only contain **ALLOW** rules
  * Allow IP
  * Allow other security groups
* Think of security groups as a firewall for EC2
  * Control the ports that the instance has access to
  * Control the in/outbound network the EC2 instance can communicate with

##### Why use security groups?
* Can be attached to multiple EC2 instances
  * Provide SSH access to EC2 instances through a security group
* External from EC2 instance (additional "layer" of security)


##### Troubleshooting
* Connection Time Out: security group issue
* Connection Refused: issue with the instance itself

#### Security Group Example
##### Inbound Rule Example
| Type | Protocol | Port Range | Source | Description
| --- | --- | --- | --- | --- |
| HTTP | TCP | 80 | 0.0.0.0/0 | Optional Text |

The follow example allows traffic from any source IP to communicate HTTP traffic with the EC2 instance through port 80

### Amazon Machine Image (EC2)
* customization of an EC2 instance
* pre-packaged configuration of an instance that you can use to deploy multiple instances quickly
* types of AMIs
  * public (AWS provided)
  * custom (make and maintain yourself)
  * AWS marketplace AMI (provided by a third party

#### Creating an AMI
1. start an instance customize it
2. stop the instance
3. build an AMI
4. launch instances using AMI