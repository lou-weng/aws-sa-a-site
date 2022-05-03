---
slug: vpc
title: Virtual Private Cloud (VPC)
type: Miscellaneous
image: vpc.png
---

# VPC Overview
* all accounts have a default VPC
  * contains internet connectivity
  * all EC2 instances get public IPv4 address
  * you get a public and private DNS name
* soft limit of 5 VPCs per region
* maximum number of CIDR for each VPC is 5
  * min size of /28 (16 IP addresses)
  * max size of /16 (65536 IP addresses)
  * only private IPv4 ranges are allowed

## Subnets
* a sub-range of IPv4 ranges in a VPC
* AWS reserves the first 4 and last IP address in each subnet
  * 10.0.0.0/24 reserved addresses are as follows:
    * 10.0.0.0 - network address
    * 10.0.0.1 - reserved for VPC router
    * 10.0.0.2 - used for AWS DNS
    * 10.0.0.3 - reserved for future use
    * 10.0.0.255 - network broadcast address (broadcast not supported in VPC so it's just reserved)

## Internet Gateway
* allows resources in a VPC to connect to the internet
* scales horizontally
* created seperately from a VPC
  * only one internet gateway for each VPC
* **must have route table to connect to internet**

## Route Table
* defines how packets are forwarded within VPC, internet and VPN
* good practice: create private and public route tables
* send traffic from 0.0.0.0/0 to internet gateway to provide internet access to public subnet

## Bastion Hosts
* connect a private subnet to the internet
* create an EC2 instance in a public subnet that will act as a host (bastion host)
* allow users to SSH into bastion host then into the private subnet
* make sure bastion host only has **IP from the EC2 you need**, not the whole security group

## NAT Instance (Network Address Translation)
* NAT instance is an EC2 instance that provides NAT routing functionality
* allow EC2 instance in private subnet to the internet
* must be launched in a public subnet
* must have fixed **elastic IP attached**
* rewrites sent packets and changes the source IP to the NAT IP
* must disable source/destination check for EC2 instance
* not the best solution anymore (deprecated)

## NAT Gateway (NATGW)
* AWS managed NAT instances
* private subnet -> NATGW -> IGW
* resilient only within a singe AZ
* if a AZ goes down, you need multiple NATGW in different AZs

## DNS Resolution
### With DNS support
* instance will query the Amazon DNS at 169.254.169.253 or VPC network range (.2) [the third reserved address]
* instance will query the route53 resolver before querying the internet with an IP address

### Without DNS support
* you will need to provide a DNS server to use

### With DNS hostname
* set to true for default VPC, false to newly created VPCs
* assigns public hostname to instance if it has a public IPv4

## Security Groups and Network Access Control List
### Security Groups
* if an instance allows traffic in, the security group will automatically allow its outbound reply to go through (**stateful**)
* anything in always can go out
* anywhere the EC2 reaches out to can always go back in

### NACL
* incoming requests hit the stateless NACL and inbound rules are applied
* outbound rules are also evaluated
* a "firewall"
* one NACL per subnet (subnet level)
* rules are numbered from 1-32766 with lower numbers having a higher precedence (first rule match)
* recommended to add rules in increments of 100
* automatically affects EC2 instances that are part of a subnet

#### Default NACL
* allows all inbound/outbound with the subnets its associated with
* very open
* do not modify the default NACL, if you want more protection, create a custom NACL

#### Ephemeral Ports
* clients connect to a defined port on the server(HTTP: 80, HTTPS: 443), it opens a port for responses (ephemeral)
* MS Windows uses 49152-65535
* Linux uses 32768 - 60999

#### NACLs and Ephemeral Ports
* how do you allow ephemeral ports to move through NACLs?
* allow ephemeral port ranges to pass through NACLs

