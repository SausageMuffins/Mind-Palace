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

**Packet Switching:** a method of data transmission where data is send in small packets with a header - to be rearranged into a comprehensive form by the receiver.

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


# Challenges of Networks:

## Interoperability

In the internetwork, there are many devices, systems and applications (software) communicating with each other. The issue lies in how they are able to communicate with each other if their software and hardware is different?

**Solution:**
1. Standardization: Use of communication protocols (rules for everything message related - order, format etc) IETF, RFC.


## Shared Memory

The internet can be considered a shared resource - how can we allow so many users for the network without things crashing and burning?

![[Pasted image 20230714103307.png]]

**Solution:** **Circuit Switching**
1. ==Time Division Multiplexing:== users have to take turns sharing the network - booking of time slots and using it when it's their turn. (i imagine it as rapid context switching)
2. ==Frequency Division Multiplexing:== multiple users can send signals / data at the same time over a shared channel. (i imagine this to be like parallel processing)

Note: Data being sent by the user is often more in "bursts" then a consistent stream of data.


## Many Complex Components

A network will need different devices and applications to send/receive data, communicate etc (basically to work). This means a lot of different hardware and software components are needed. Hence, it may become hard to deal with problems, bugs or **emergent behaviours.**

**Solution:**
1. Modularity - make each component modular to test and implement. This can isolate the components and make the network easier to maintain.
2. Layering - minimize interactions between modules. Less interactions = less emergent behaviours (surprises)


**Layers:** A layer can be seen as a module of a system -  to implement a service/function. Each layer will use services of the previous layer and implement it's own service for the next layer.

These layers can be visualized in the ==Internet Protocol Stack== (ISP).

| Layers            | Description                                                                                                           |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| Application Layer | Software stuff such as web browsers, email clients etc. Deals with HTTP (web browsing), SMTP (emails) and FTP (files) |
| Transport Layer   | Delivery of packets and data. Deals with transport protocols (TCP)                                                    |
| Network Layer     | Addressing, routing and identifying destinations (best path). Deals with IP addressing                                |
| Link Layer        | The "interface" between the network and the physical components (Ethernet or Wi-Fi)                                   |
| Physical Layer    | "Wires" and other physical components at the destination (could be a computer)                                        |

![[Pasted image 20230714104842.png]]



## Scalability

The larger the network, the crazier the size grows to. As the number of nodes increases, the number of interconnection grows like $N^2$.

**Solution:**
1. Use a hierarchical structure - [[Networks#Internet Service Providers (ISP)|ISPs]] with global, regional, national sizes. The main thing to note here is that all of these ISPs **must be connected in some way** - IXP: internet exchange point, regional networks to connect ISPs, Google/Microsoft etc. bring content and services to end users.

![[Pasted image 20230714105839.png]]