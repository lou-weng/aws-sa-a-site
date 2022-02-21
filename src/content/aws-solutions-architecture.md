---
slug: solutions-architecture
title: AWS Solutions Architecture
type: Solutions Architecture
image: aws.png
---
## Pillars of Well Architected Applications
1. Cost
2. Performance
3. Reliability
4. Security
5. Operational Excellence

## Best Practices

### Resource Instantiation
##### How do we best leverage the cloud to speed up deployment of applications?
* EC2
  * Use "golden AMI" with everything already installed and configured
    * Launch future instances using golden AMI
  * Bootstrap instance with user data instead of manual configurations
  * Hybrid (use AMI and bootstrapping with Elastic Beanstalk)
* RDS & EBS Volumes
  * Boot from snapshots

## Case Studies
### Stateless Web Application

#### Case Study: WhatIsTheTime.com
* no database needed
* start small, accept some downtime
* may need to scale vertically/horizontally as usage grows

##### Case Progression
1. Public t2.micro EC2 instance that takes in a request from a user (static IP)
2. What happens when you need to reboot/stop instances?
* Attach elastic IP so that EC2 can be started/rebooted without disruption
* Without elastic IP, you would need to let users know about new IP to reach your application every single time
3. What happens when there is more traffic than the t2 micro can handle?
* Stop instance, change instance type, then start the m5 instance with vertical scaling
* Causes downtime during the update
4. What happens when there is more users than you can vertically scale?
* Scale horizontally by adding more m5 instances
* Users need to be aware of the multiple elastic IPs from each of the instances
5. How do users keep track of all your IPs?
* Set up route 53 hostname that refers to the EC2 instances
6. How do we add/remove instances on the fly?
* Route 53 TTL would still point to missing or shut off instances
* Add a load balancer with health checks to point to each of the instances
* Ensure that load balancer and instances are in different subnets
* Set alias record in Route 53 to connect to load balancer
7. How do you automatically add instances to load balancer?
* Set up an auto scaling group that is linked to the load balancer
* Scale in and out based on user demand
8. What happens if an AZ goes down?
* Implement multi-AZ
* Configure ELB for multi-AZ
* Auto-scale into multiple AZs
9. How to diminish cost?
* Reserve instances (at least one in two AZs) to reduce cost 

### Stateful Web Application (Persistence)
#### Case Study: MyClothes.com
* shopping cart for users to buy clothes online
* be able to scale horizontally
* keep application as stateless as possible
* user/catalogue information in database

##### Case Progression
1. Start with auto-scaling multi-AZ EC2 -> multi-AZ ALB -> Route 53 DNS name
2. How to maintain state when querying load balancer (don't switch EC2 server each time)
* Add ELB stickiness with cookies (session affinity)
  * ELB cookie
    * Directs user traffic to same instance each time
    * EC2 instance keeps track of the contents of the shopping cart
    * If instance goes down, user loses their state information since ELB just directs the user to instances, not keep state
  * User cookie
    * User keeps track of their shopping cart contents
    * Servers not don't need to maintain user state
    * HTTP request is bigger and contains more information, cookies also have a size limit
    * Cookies can be altered potentially
    * Ensure that cookie contents are validated
  * Server session
    * Keep an id of a server session
    * Keep an ElastiCache/DynamoDB cluster to store shopping cart information
    * When user requests from different instances, the instances lookup contents from ElastiCache
    * More secure since hackers cannot change ElastiCache
  * Database
    * Store shopping cart in RDS instance
    * Slower than ElastiCache
    * **Scaling reads and writes**
      * Create master for writes and read replicas for session querying (more scalability)
      * Read through cache instead of going through RDS everytime
3. If we use persistent data store services, how do we guard against disasters?
* Database option
  * Multi-AZ
* Cache option
  * Multi-AZ
4. What kind of security do we need to be aware of?
* Restrict all EC2 traffic to load balancer
* Restrict all datastores (RDS, Cache) traffic to EC2 instances

### Stateful Web Application (Storage)
#### Case Study: Wordpress.com
* scalable wordpress site
* access and display picture uploads

##### Case Progression
1. Create RDS/Aurora architecture
2. How do we store images?
* Use EBS volume attached to EC2 instance
3. How do we scale storage (EBS)?
* Each instance has their own EBS volume, which means only one server has access to an image
* Use EFS to allow all EC2 instances to access one central point of storage