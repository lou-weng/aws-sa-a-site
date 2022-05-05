---
slug: cloudhsm
title: Cloud Hardware Security Module
type: Security, Identity, and Compliance
image: cloudhsm.png
---

## Overview
* KMS is software for encryption
* CloudHSM is for encryption hardware
* client manages encryption keys intirely
* HSM device is tamper resistant
* no free tier

### Usage
* must use CloudHSM Client Software
* good for SSE-C encryption 
* you create your own users and manage their permissions

### How it works
* AWS manages the hardware for CloudHSM
* you use the HSM client to connect and manage your keys

### High Availability
* CloudHSM clusters can be spread across availability zones