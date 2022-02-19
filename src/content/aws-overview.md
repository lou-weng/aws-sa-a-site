---
slug: overview
title: AWS Overview
order: 1
---

## History of AWS
2002: Launched as an internal service to allow for rapid development of applications.   
2006: Launched for public use with S3, EC2, and SQS

## Important Terms

### Region
* Collection of data centres that are geographically related
* AWS services often have a regional scope
* Example: us-east-1, us-west-1  

#### Factors that affect choosing the region
* **Compliance**: governance and legal requirements may require services to run in particular regions. PIPEDA in Canada requires all data stored to be located within Canadian borders
* **Latency**: having regions closer to users ensure low latency of services
* **Availability**: different regions may have different services available
* **Pricing**: pricing of services will change based on region

### Availability Zone
* Datacentres located within regions. Each data centre has redundancy in power, networking, security to guard against failure
* AZs are isolated from one another to ensure that a failure in one doesn't affect the others
* AZs within a region are also connected with high-bandwidth, low latency networking capabilities
* Regions may have 2-6 availability zones 
* Example: ap-southeast-2a, ap-southeast-2b

### Points of Presence (Edge Locations)
* Provide facilities to allow low latency to users around the world
* Can include services like CDN (Content Delivery Networks)

