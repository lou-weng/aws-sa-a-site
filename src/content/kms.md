---
slug: kms
title: Key Management Service
type: Security, Identity, and Compliance
image: kms.png
---

## Overview
* most types of encryption on AWS done with KMS
* AWS manages the keys
* integrated with IAM for authorization
* seamlessly integrates into just about every service

### KMS Features
* ability to 
  * create/delete keys
  * rotate policies on keys
  * enable/disable keys
* integrate with CloudTrail to monitor key usage
* user uses KMS API to interact with keys
* can only encrypt 4KB of data, any more requires envelope encryption

#### Best Practices
* use anytime you need to share sensitive information
* never store passwords or secrets in plaintext
* encrypted secrets can be stored in code or environment variables
* ensure that
  * key policy allows the user
  * IAM allows API calls to KMS

### Customer Master Keys
* can be managed by customer or AWS

#### Symmetric
* single encryption key is used for encrypting and decrypting
* most services use symmetric CMKs
* you never get access to the key unencrypted (KMS API used to interact with it)

#### Asymmetric 
* public key used for encrypting
* private key used for decrypting
* public key is downloadable
* private key is not available unencrypted
* good if someone external to AWS wants to encrypt something, but has no access to the AWS KMS API

### Key Policies

#### Default
* only root user has access to the key
* gives access to keys using IAM policy

#### Custom
* define users and roles who can access the keys
* define administrators of the key
* good for cross-account access of keys

##### Example of Copying Snapshots across Accounts
1. create snapshot and encrypt with CMK
2. authorize KMS key policy to allow cross-account access
3. share encrypted snapshot
4. create a cpy of the snapshot and encrypt with KMS key
5. create volume from snapshot

### Key Rotation
* auto key rotation can be enabled
  * only for customer-managed CMKs
  * previous key is kept active so decryption of old data still possible

### Alias Updating