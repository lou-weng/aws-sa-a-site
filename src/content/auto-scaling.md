---
slug: auto-scaling
title: Auto Scaling Groups (ASG)
type: Management & Governance
image: auto-scaling.png
---

## Auto Scaling Overview
* allow you to scale in/out EC2 instances to adjust for demand 
* set a limit to the minimum and maximum number of running machines
* automatically link new instances to a load balancer
* all roles to ASG will apply to underlying EC2
* free to use, you pay for resources launched under ASG
* can terminate unhealthy instances detected by ELB

### ASG Launch Configurations
* used to define how ASGs behave 
* ASGs must be updated using new launch configurations

#### Launch Configuration Attributes
* AMI + instance type to configure EC2s being created
* EC2 user data to customize launch scripts/operations
* EBS volumes to set storage requirements
* security groups for security (duh)
* SSH key pair to access EC2 instances
* network information
* load balancer information
* scaling policies
* **min/max/initial capacity**

#### Launch Template
* allows additional features on top of autoscaling
* supports multiple versions and granular control
* recommended to use by AWS

### ASG Scaling

#### Alarms
* you can link ASGs to cloudwatch alarms to trigger scaling
* process of using cloudwatch:
  * have cloudwatch monitor a metric (average CPU)
  * calculate the metric over all ASG instances
  * scale in/out based on alarm

#### Auto Scaling Metrics
* can create a custom metric (number of connected users)
* use CloudWatch **PutMetricAPI**

### Auto Scaling New Rules
* EC2 has managed rules that can be used for auto scaling
  * target average CPU usage
  * number of requests on ELB per instance
  * average network in
  * average network out

### ASG Scaling Policies
Dynamic Policy | Definition | Example 
--- | --- | ---
Target Track | set a target range to hit | "Have average CPU usage stay around 40%"
Simple/Step Scaling | increase/decrease at certain thresholds | "Remove 2 units if CPU usage falls under 30%"
Scheduled Actions | scale based on a usage patter | "increase capacity on afternoons of Fridays"

#### Predictive Scaling Policies
* service to forecast load and schedule scaling to accomodate
* AWS analyzes historic load and predicts accordingly

### Metrics for Scaling
Metric | Definition |
CPU Utilization | average CPU usage across instances |
Request Count Per Target | watch overload of request to particular EC2 instance |
Average Network In/Out | monitor network traffic of EC2 instances

### Scaling Cooldown
* default cooldown of 300 seconds after scaling 
* during cooldown ASG will not launch or terminate instances
* use a configured AMI to speed up process of configuration