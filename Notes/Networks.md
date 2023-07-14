---
tags: CE
date: 12-07-2023
type: 
 Note
 Incomplete
summary: 
---

# Overview

The internetwork or more popularly known in it's short form, internet, is a **network of networks**. We are talking about a whole infrastructure in which data can be sent to many other networks/devices. The main uses of the internet can be to connect Internet Service Providers to send data or provide services like APIs.

## Packets

To understand the networks and how they communicate, we start with the most basic unit of data in networking (packets). Packets are literally just "packets or bundles" of information. 

Things we can do with packets:
- Send packets to another end host via [[Networks#Networking Links|communication links]] 
- Reassembled to form more coherent pieces of information (segment data and add header bytes)

Packets are received and forwarded on **packet switches** to outgoing communication links. (routers)

---

## Networking Links

These links are also known as **communication links** whose purpose is to forward or receive packets.

There are many types of communication links (different materials) with different transmission rates (speed):
- Coaxial cable
- Copper wire
- Optical fiber
- Radio spectrum (wireless)

Transmission rates / bandwidth: measure in bits/s.

**Network Edges:** Our end systems and hosts - applications run on these edges.
**Network Core:** Our routers or switches - packets are sent back and forth on these cores.

---

## Internet Service Providers (ISP)

ISPs are entities that provide services (such as access to the internet) to a group of people. They can also be described as networks of packets switches and communication links. 

Examples:
1. Regional ISPs such as local cable or telephone companies (they’re bound by geographical boundaries)
2. Global ISPs (not bound by geographical boundaries), also known as Tier 1 ISP (see this section): AT&T, Sprint, Verizon, etc
3. Corporate ISPs; 
4. University ISPs; 
5. Other ISPs that provide WiFi access in airports, hotels, coffee shops, and other public places.

![](https://lh5.googleusercontent.com/GQ1q2u6rzzNf3hXSlXh0sQwjAVX9RX9iKkAJTZDg1PR2I6PYBYMQDH7Te81aMcQaAqvuUFlgH0yUYtmZ-mU-WNYwpEtfTzSO0VgokpErmXOfggVlc6RFVk70vBAH2s5Sp8U0CoUcU1WZSbQzZBQdwA)

### Services

ISP provide services which can mean many things - access to the internet and being able to connect to another end system is a obvious one. However, there are also important services that the internet can support. For example, APIs.

Applications hosted by end systems (or computers) can call APIs (connect to and interact) with another end system (eg: a server hosting your database). Examples of these applications include: mail, browsers, youtube etc.

Applications that involve many end systems are also known as **distributed applications**

