---
slug: waf
title: Web Application Firewall
type: Security, Identity, and Compliance
image: waf.png
---

## Overview
* firewall to protect your web applications
* protects layer 7 (HTTP)
* define a **Web ACL** (access control list)

### Integration 
* application load balancer
* api gateway
* cloudfront

### Web ACL
* set rules to look out for 
  * **IP addresses**
  * **HTTP** headers
  * HTTP body
  * **URI strings**
* protects from common attack patterns
  * **SQL injection**
  * cross site scripting (XSS)
* can contrain message sizes
* can geo-match and limit geographic locations (**blacklist countries**)
* **rate-based rules** for DDoS protection
  * an IP cannot send more than 10 requests per second for example