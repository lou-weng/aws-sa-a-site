---
slug: inspector
title: Inspector
type: Security, Identity, and Compliance
image: inspector.png
---

## Overview
* automated security assessments for EC2 instances
* can run analysis on OS for vulnerabilities 
* run analysis on open network entries
* AWS Inspector Agent needs to be installed on OS of EC2 instances
* creates a **report** with all vulnerbilities detected

### Assessments
* network assessment 
  * can be done agent-less
  * look at network reachability
* host assessment
  * agent required
  * looks for common vulnerabilities
  * uses CIS benchmarks
  * uses security best practices