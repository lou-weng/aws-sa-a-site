---
slug: database
title: Relational Database Service (RDS)
type: Database
image: rds.png
---

### AWS Relational Database Service (RDS)
* managed database service for databases that use SQL
* you can create databases in the cloud that are managed by AWS
  * **Postgres**
  * **MySQL**
  * **MariaDB**
  * **OracleDB**
  * **Microsoft SQL Server**
  * Aurora

##### Why use RDS instead of setting up your own DB?
* RDS is a managed service, AWS does the following for you:
  * automated provisioning & OS patches
  * monitoring dashboards 
  * storage based off of EBS
  * autoscaling features
* RDS also comes with unique features
  * continueous backups and point in time restore functionalities
  * **read replicas** 
  * **multi AZ** setup for disaster recovery
  * scaling capabilities
* you cannot SSH into an RDS instance

#### Automated Backups & Snapshots
##### Backups
* backups are automatically enabled for RDS
* daily full backups of RDS database
* transaction logs backed up every 5 minutes
* you can restore your instance to a previous point in time
* 7 day retention of backups, but can be extended to 35 days

##### Snapshots
* manually triggered by the user
* retain the snapshot for longer than backups

#### Storage Autoscaling
* RDS can detect when you are out of storage space and can scale automatically to accomodate
* set a **Maximum Storage Threshold**
* set autoscaling rules
  * free storage is less than X% of max threshold
  * low storage state persists for more than Y minutes
  * Z amount of time has passed since the previous autoscaling

### Read Replicas vs Multi-AZ
#### Read Replicas
* creating **asynchronous** "clones" of database that are read-only (only SQL SELECT)
  * replication is **eventually consistent** (all replicas don't stay 100% updated in real time)
  * replicas can be turned into a standard DB instance
* allows for services to handle large amounts of read traffic to data
* can be created within AZ, cross AZ, or cross region

##### When would you use a read replica?
* Take the following scenario: a team uses a production database to handle transactions from customers
* An adjacent team decides they want to run analytics on the production database to find insights
* The analytics job could overwhelm the production database with read requests on top of the requests sent by clients
* Answer: create a read replica so that the analytics job reads from the replica instead and doesn't impact the production DB

##### What costs are associated with Read Replicas?
* read replicas within the **same region** are **free**
  * aysnch replication from us-east-1a and us-east-1b is free
* read replicas across regions require a network fee

#### Multi-AZ
* creating **synchronous** "clone" of database that is on standby in case failure happens (**availability**)
  * changes in master are automatically reflected in the standby 
* one DNS name for both the master and standby (in case master fails, automatic failover to standby)
  * no manual changes in application needed as applications only see that one DNS name
* standby not used for reads or writes (only used for failover)

##### How do we make an RDS instance from single AZ to multi AZ?
* just click on "modify" for database and enable multi-AZ
* no downtime or manual work required to setup multi AZ

##### How is multi-AZ created?
1. snapshot of your current database is taken
2. database is restored from the snapshot in a different AZ
3. original and new database are synchronized

##### How is multi-AZ related to read replicas?
* you can setup your read replicas for multi-AZ

### RDS Security
#### Encryption
* at rest encryption
  * encrypt master and read replicas with AWS KMS
  * encryption defined at launch time
  * if master is not encryped, the read replicas cannot be encrypted
  * TDE (transparent data encryption) possible for Oracle and SQL Server
* in-flight encryption
  * use SSL to encrypt transfer of data from RDS

##### Encrypted Snapshots
* snapshots are encrypted/not encrypted based on the database being encrypted/unencrypted
* you can copy an unencrypted snapshot into an encrypted one

##### How do you encrpyt an un-encrypted RDS instance?
1. create a snapshot of the unencrypted database
2. enable encryption of the snapshot
3. restore the database from the encrypted snapshot
4. migrate applications from old database to the new one

#### Network Security
* keep RDS in a private network
* network security done using security groups

#### IAM Security
* IAM policies control who can manage RDS
* username and password can be used to login into the database
* IAM database authentication only work for PostGres and MySQL
  * you only need an authentication token (from IAM) that exists for 15 min
  * IAM authentication allows you to manage users more centrally without creating users within database

##### User Security Responsibilities
* checking ports and security groups that allow traffic to DB
* user creation and access to DB
* public/private access
* ensuring that inflight transactions are protected (SSL)