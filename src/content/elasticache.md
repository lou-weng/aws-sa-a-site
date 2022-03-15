---
slug: elasticache
title: ElastiCache
type: Database
image: elasticache.png
---

## ElastiCache Overview
* used to get a managed Redis (REmote DIctionary Service) or Memcached instance
* in-memory database with high performance and low latency
* takes the load off of databases that have read intensive workloads
* can help make applications stateless
* **using ElastiCache means heavy application code changes**

##### What does AWS manage?
* OS maintenance
* optimizations
* setup
* configurations
* monitoring
* failure recovery
* backups

### Types of USes
* have application query information to elasticache first before an RDS database
  * cache miss would read from RDS instance and write to cache
  * cache hit would return with low latency
  * needs to have invalidation policy or else old data never updates
* user session store
  * user logs onto the application and session data gets written to elasticache
  * users with difference devices can access the same sessions through the cache

### Redis vs Memcached
#### Redis
* multi AZ with auto-failover
* read replicas can be created to scale reads
* backup and restoration functionality
* data durability and persistence

#### Memcached
* multi-node for partitioning data (sharding)
* no replication over AZs (not highly reliable)
* non persistent
* no backup and restore

### Cacheing Implementation
#### Considerations
* Is it safe to cache the data? 
  * Can you risk the data being out of date or inconsistent
* Should you be caching the data?
  * Don't Cache: 
    * data changes slowly
    * data is needed unfrequently
* Is data structured well for caching?
  * key value caching
  * caching of aggregation results
* Which cacheing design pattern is the most appropriate

### Caching Design Patterns
#### Lazy Loading/Cache Aside/Lazy Population
* cache sits between application and database

| Pros of Lazy Loading | Cons of Lazy Loading |
| --- | --- |
| only requested data is cached | cache miss penalty requires three round trips (read cache, read database, write to cache) |
| node failures are not fatal, you just need to repopulate the cache |

#### Write Through Cache
* add or update cache only when database is updated

| Pros of Write Through | Cons of Write Through|
| --- | --- |
| cache contents are always updated | write penalty (write to RDS, write to cache) |
| good for cases where you can have longer latency on writes (social media) | data only written to cache with writes, may need lazy loading to initially load |
| | a lot of data may never be read (no read temporal locality)

### Cache Eviction
* delete item from cache manually
* item is evicted due to memory full, (LRU policy: least recently used evicted)
* set a TTL (time to live)
  * avoid in write through, you don't want to lose the updated cache data from the write operations

### ElastiCache Replication
* Node: machine that is storing data in memory
* Cluster: logical grouping of nodes
* Shard: organization of clusters

#### Cluster Mode Disabled
* you can store your Redis data in multiple "nodes"
  * one main node and up to 5 read only replicas
  * primary node is for read/write
  * asyncronous replication of nodes
* there is only one shard
  * shard contains all the nodes
  * all nodes contain all the data in the shard
* multi AZ disabled by default for failover
* useful when scaling read performance

#### Cluster Mode Enabled
* data is partitioned across multiple shards
  * each shard contains part of the data
* each shard has a primary and up to 5 replica nodes
* multi-AZ enabled by default
* up to 500 nodes per cluster
  * 500 shares with one master
  * 250 shards with 1 master and 1 replica each
  * 83 shards with one master and 5 replicas each
