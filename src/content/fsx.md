---
slug: fsx
title: FSx
type: Storage
image: fsx.png
---

## FSx Overview
* a way to launch 3rd party file systems onto AWS
* fully managed

### FSx for Windows File Server
* EFS provides a file system for linux machines -> What if you are also storing files on Windows?
* FSx for windows supports SMB protocol and NTFS file systems
* Active Directory integration
* built on SSD, scalable for large use cases
* can be accessed from on-prem infrastructure
* high availability with multi-AZ capabilities
* data is backed up daily to S3

### FSx for Lustre (Linux + Clustering)
* parallel distributed file systems
* machine learning, high performance computing (HPC), video processing
* seamless integration with S3, read it as a fiel system
* can be used for on-prem servers

### File System Deployment
#### Scratch File System
* better performance, but temporary storage 
* data is not replicated 

#### Persistent File System
* used for long term storage
* data is replicated within an AZ
* failed files can be replaced in minutes
