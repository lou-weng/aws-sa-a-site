---
slug: secrets-manager
title: Secrets Manager
type: Security, Identity, and Compliance
image: secrets-manager.png
---

## Overview
* used to store secrets used in applications
  * generally used for RDS integration
  * supports MySQL, PostgreSQL, Aurora (all RDS offerings)
* can automatically force the rotation of secrets and auto-generate new ones with lambda
* secrets are encrypted with KMS

### Why not parameter store?
* secret store forces encryption
* secrets can also be rotated
* secrets can be accessed across AWS accounts
* fixed cost per secret