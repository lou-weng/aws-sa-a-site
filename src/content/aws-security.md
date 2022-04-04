---
slug: security
title: AWS Security
type: Miscellaneous
order: 1
image: security.png
---

## Types of Encryption
* encryption in flight (SSL)
* server side encryption


### Encryption in Flight (SSL)
* data encrypted before sending and decrypted by the receiver
  * SSL certificates used to encrypt HTTPS
  * ensure that no one can intercept and corrupt data in the message being sent

### Server Side Encryption at Rest
* data encrypted after server receives it
* data decrypted before being sent
* uses a key to store data in an encrypted form
* keys must be managed in a way that the server can access them

### Client Side Encryption
* data is encrypted by the client
* server never knows what data it is working with