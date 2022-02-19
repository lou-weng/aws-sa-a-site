---
slug: iam
title: Identity and Access Management (IAM)
---
## Takeaway
### Important Note
* IAM is a global service (not locked to a region)

### Best Practices
* Principal of Least Privilege: always provide the most minimal set of permissions
* One physical user = one AWS user
* Ensure that passwords are strong and MFA is enabled
* Assign permission to groups rather than standalone permissions for users

---

### IAM Entities
#### Root User
* The main holder of the account. When you create a new account, it is the root
* This account has full control over all services
* Highly discouraged to share or use the root account for day to day tasks

#### User
* A person who is allowed to use the AWS account

#### Group
* Collection of **users** (nested groups not possible)
* Users can belong to more than one group

### Permissions
* You want to restrict the access and control that users have over an AWS account
* JSON documents called **policies** can be used to specify what a user can or cannot do

#### Policy Inheritance
* Policies who are attached to groups get automatically given to users in the group
* Users can inherit permissions from multiple groups
* Users who don't have groups can get **inline policies**

#### Policy Example
```JSON
{
    "Version": "2020-02-18",
    "Id": "Custom-Identification",
    "Statement": [
        {
            "Sid": "1",
            "Effect": "Deny",
            "Principal": {
                "AWS": ["arn..."]
            },
            "Action": [
                "s3:GetObject"
            ],
            "Resource": ["arn..."]
        }
    ]
}
```
#### Policy Breakdown
* **Version**: verioning of the policy
* ID (Optional): unique identifier for policy
* **Statement**: array of statements
  * SID (Optional): statement ID
  * **Effect**: allow or deny
  * **Principal**: who the policy applies to
  * **Action**: list of actions that is allowed or not
  * **Resource**: what resources that are effected
  * Condition (Optional): when this policy is in effect

### Roles 
* Some services need to perform actions *on behalf* of users
* Similar to user permissions, but instead for services acting on other services
* Example: EC2 Instance that wants to manipulate S3

### Security Tools
* IAM Credentials Report
  * Lists all users in an account and what their credentials are
  * Download a report CSV 
  * | user | arn | user_creation_time | pass_word_enabled | ... |
    | --- | ---- | --- | --- | --- |
* IAM Access Advisor
  * List all permissions provided to user and when they last used which services
  * Recent activity usually takes 4 hours to update
  * | Service Name | Policies Granted | Last Accessed |
    | --- | --- | --- |