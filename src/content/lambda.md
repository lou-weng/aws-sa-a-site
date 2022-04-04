---
slug: lambda
title: Lambda
topic: Serverless
image: lambda.png
---

## Lambda Overview
* virtual functions that you just run
* short executions, you don't need to keep an EC2 running forever
* run whatever functions you want on demand (pay for what you use)
* scaling to handle function load is automated

### Serverless
* new paradigm where developers don't need to manage servers
* deploy code and functions
* you just don't manage or interact directly with the servers involved

#### Benefits of Lambda
* easy pricing: pay per request and compute time
* lambda integrates with a lot of AWS services
* supports multiple languages
* can be monitored by CloudWatch
* easy to scale resources required

### Synchronous Invocations
* user invoked: CLI, SDK, API Gatewaye, ALB, CloudFront
* service invoked: cognito, step functions
* results are returned immediately
* client handles error handling
* lambda function returns a value immediately after a function invokation

### Lambda Integrations

#### Application Load Balancer
* exposing lambda as HTTPS endpoint
* use ALB or API Gateway
* lambda must be registered to a target group

##### ALB to Lambda Process
* HTTP request gets turned into JSON
* Lambda returns json payload and ALB turned it into HTTP request

#### CloudFront
##### What can you use Lambda@Edge for?
* change CloudFront requests and responses