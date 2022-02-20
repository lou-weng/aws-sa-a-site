---
slug: aurora
title: Aurora
type: Database
---

## Aurora Overview
* proprietary cloud optimized DB service
* only works for **Postgres** and **MySQL** databases

##### Why Aurora over RDS?
* cloud optimized (5x better performance MySQL over RDS and 3x better performance for Postgres)
* **Vertical Auto-scaling**: storage grows automatically in increments of 10GB, with a 128 TB limit
* **Self-healing**: data blocks are continuously scanned for errors and repaired
* **Replication**: Aurora creates 6 copies of your data across 3 AZs
  * 4/6 needed for writes
  * 3/6 needed for reads
  * storage works across 100s of EBS volumes (**shared storage volume** across 3 AZs)
  * read replicas support cross-region replication
* 15 read replicas allowed compared to 5
* failover is faster than RDS

##### Why not Aurora?
* costs more than RDS (20% more)

#### Failover
1. one aurora instance takes writes (master)
2. if master fails, automatic failover < 30 seconds
3. master and 15 read replicas serve database reads

#### Aurora Clusters
##### How do you interact with all those intances?
* writer endpoint: DNS name that always points to master (client abstracted away from which instance is master)
  * endpoint auto-adjusts if the master fails and a new one is selected
* reader endpoint: load balances automatically to all read replicas

#### Auto-Scaling
* replica autoscaling: adds read replicas
  * reader endpoint extends to allow connection to new replicas
* serverless scaling and instantiation can be set
  * utilize already existing instance of aurora from a "proxy fleet"
    * pay per second for storage space that is already allocated (no planning on your side needed)

##### What if you have different sized read replicas?
* example: you may want larger, more powerful instances for some read replicas for analytics
* create a custom endpoint
  * reader endpoint not used if you set a custom endpoint
  * you would need to create multiple read endpoints for your different use cases

##### What is you want high availability for writes?
* usually you only have one writer
* aurora can be set to write to multiple instances

#### Global Aurora
* set one primary region for reads and writes
* set 5 secondary read only regions
  * up to 16 read replicas for secondary region possible

#### Aurora Machine Learning
* run ML predictions to applications using SQL
* integration with ML services
  * AWS Sagemaker
  * AWS Comprehend
* fraud analysis, sentiment analysis, product recommendations