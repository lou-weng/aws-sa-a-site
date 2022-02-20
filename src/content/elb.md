---
slug: elb
title: Elastic Load Balancer (ELB)
---

* Load balancers are servers that forward traffic to other servers
* Allow systems to handle heavy traffic and distribute load
* Health check instances to catch and handle instance failure

### Elastic Load Balancer
* Managed load balancing service that AWS provides for you (easier than setting up load balancing yourself)
* AWS manages updates, maintainence and ensuring availability of the load balancer
* Has integrations with other services (Route 53, AWS WAF, etc.)
* Can be internal (within VPC) or external (public internet facing)

#### Load Balancer Types

| Type | Protocols | Use Case | Restrictions |
| --- | --- | --- | --- |
| Classic Load Balancer (Deprecated) | HTTP, HTTPS, TCP, SSL | | |
| Application Load Balancer (ALB) | HTTP, HTTPS, WebSocket | | |
| Network Load Balancer (NLB) | TCP, TLS, UDP | | |
| Gateway Load Balancer (GWLB) | IP Protocol | | |

##### Classic Load Balancer
* fixed hostname: XXXX.region.elb.amazonaws.com
* 

#### Health Checks
* Verify that downstream EC2 instance is working properly
* Use a port and route to check the health of EC2 instance (/health route is most commonly used)
* If EC2 does not respond with status code 200 (healthy), ELB will avoid sending traffic to instance

#### Security Groups

##### Load Balancer Inbound Rule
* Allow users from anywhere to access the load balancer 
| Type | Protocol | Port Range | Source | Description |
| --- | --- | --- | --- | --- |
| HTTPS | TCP | 443 | 0.0.0.0/0 | Optional description |

##### Application Instance Inbound Rule
* Downstream instances should only allow access from load balancer
  * Use security groups to enable only access to EC2 through load balancer
| Type | Protocol | Port Range | Source | Description |
| --- | --- | --- | --- | --- |
| HTTPS | TCP | 443 | **Load Balancer Security Group** | Optional description |