---
slug: elb
title: Elastic Load Balancer (ELB)
topic: Compute
image: elb.png
---

## ELB Fundamentals
* Load balancers are servers that forward traffic to other servers
* Allow systems to handle heavy traffic and distribute load
* Health check instances to catch and handle instance failure

### Elastic Load Balancer
* Managed load balancing service that AWS provides for you (easier than setting up load balancing yourself)
* AWS manages updates, maintainence and ensuring availability of the load balancer
* Has integrations with other services (Route 53, AWS WAF, etc.)
* Can be internal (within VPC) or external (public internet facing)

### Load Balancer Types

| Type | Protocols | Use Case | Restrictions |
| --- | --- | --- | --- |
| Classic Load Balancer (**Deprecated**) | HTTP, HTTPS, TCP, SSL | Simple load balancing to downstream instances | No IPv6 | 
| Application Load Balancer (ALB) | HTTP, HTTPS, WebSocket | Applications and containers | More routing options than CLB |
| Network Load Balancer (NLB) | TCP, TLS, UDP | Extreme performance | Static IP (not hostname), Only TCP/UDP traffic |
| Gateway Load Balancer (GWLB) | IP Protocol | Passing all traffic through third party system (security) | Only IP protocol |

#### Classic Load Balancer
* fixed hostname: XXXX.region.elb.amazonaws.com

#### Application Load Balancer
* load balance to multiple HTTP applications (**target groups**)
* load balance to multiple applications on the same machine (**containers**)
* redirects also allowed (HTTP to HTTPS)
* fixed hostname: XXXX.region.elb.amazonaws.com
* application servers don't communicate with client IP
  * client also uses load balancer IP
  * client IP (metadata) hidden in request headers **X-Forwarded-For**

##### Routing Rules
* allows for routing based on **target groups** (test.com/path1 vs. test.com/path2)
* allows for routing based on **hostname** (one.test.com vs. two.test.com)
* allows for routing based on **query string** (test.com/one?id=1 vs. test.com/two?id=2)
* allows for dynamic port mapping with ECS

##### ALB Target Groups
* EC2 Instances
* ECS Tasks (Containers)
* Lambda Functions
* Private IP Addresses

#### Network Load Balancers
* forward TCP & UDP to instances
* low latency and can handle millions of requests per second
* has **one static IP per AZ**
* not included in free tier

##### NLB Target Groups
* EC2 Instances
* Private IP Addresses
* Application Load Balancer (combine fixed static IP of NLB and routing feature of ALB)

#### Gateway Load Balancer
* used to deploy, scale, manage 3rd party network virtual systems
* send all traffic through some security application before it reaches your applications
* firewalls, intrusion detection, payload manipulation, etc.
* GENEVE protocol on port 6081

##### GWLB Target Groups
* EC2 Instances
* Private IP Addresses

### Other ELB Features

#### Health Checks
* verify that downstream EC2 instance is working properly
* use a port and route to check the health of EC2 instance (/health route is most commonly used)
* if EC2 does not respond with status code 200 (healthy), ELB will avoid sending traffic to instance
* ALB health checks done at target group level

#### Security Groups

##### Load Balancer Inbound Rule
* allow users from anywhere to access the load balancer 
| Type | Protocol | Port Range | Source | Description |
| --- | --- | --- | --- | --- |
| HTTPS | TCP | 443 | 0.0.0.0/0 | Optional description |

##### Application Instance Inbound Rule
* downstream instances should only allow access from load balancer
  * Use security groups to enable only access to EC2 through load balancer
| Type | Protocol | Port Range | Source | Description |
| --- | --- | --- | --- | --- |
| HTTPS | TCP | 443 | **Load Balancer Security Group** | Optional description |

##### Security Group Process
1. Create a new security group for the load balancer you're using
2. Add security group to allowed inbound rules of instances to allow only traffic from ELB to enter

### ELB Configurations

#### Can we choose which instance to send traffic to?

##### Sticky Sessions
* client is always redirected to the same instance behind a load balancer
* used to ensure that user doesn't lose session data by getting switched between backend servers
* only for CLB and ALB
* **cookie** is used to track stickiness
* stickiness may impact the ELB's ability to distribute load evenly across instances

###### Cookies
* application-based cookie
  * custom cookie
    * generated by **application** that is specified for each target group
    * name is custom, but not the following three (AWSALB, AWSALBAPP, AWSALBTG)
  * application cookie
    * generated by **load balancer**
    * name is AWSALBAPP
* duration-based cookie
  * generated by the **load balancer**
  * name is AWSALB for ALB, and AWSELB for CLB

#### What if there is different traffic between two AZs, can we balance the traffic?
##### Cross-Zone Load Balancing
* With
  * Allow load balancers to distribute traffic evenly regardless of AZ
* Without
  * Traffic are distributed within the AZ of the traffic
* Always on for ALB (cannot be turned off)
  * No charges for moving data between AZs
* Disabled by default for NLB
  * Pay for data transfers between AZs
* Disabled by default for CLB
  * No charges for moving data between AZs

#### What if you turn off an EC2 while a load balancer is still pointed at it?
##### Connection Draining (CLB) / Deregistration Delay (ALB/NLB)
* Allows time for EC2 to complete in-flight requests before shutting off connection to EC2
* Stops sending requests to draining EC2

