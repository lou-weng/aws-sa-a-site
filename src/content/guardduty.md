---
slug: guardduty
title: GuardDuty
type: Security, Identity, and Compliance
image: guardduty.png
---

## Overview
* intelligent threat discover for your AWS account
* leverages machine learning, anomaly detection
* enabled with a click, no software needed

## How it works
* ingests input data
  * CloudTrail logs: unusual API calls & deployments
  * VPC flow logs: unusual traffic, IP addresses
  * DNS logs: compromised EC2 instances sending data within DNS queries


## Integrations
* CloudWatch Event Rules can be triggered when unusual activity is detected
* data send to SNS or Lambda