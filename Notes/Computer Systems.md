---
tags: CSE
date: 17-05-2023
type: 
 Note
 Incomplete
summary: Computer Systems and how it relates to other concepts
---

## Overview

Computer systems are the big picture idea of the computer, users, and programs. The computer system describes the relationships between the aforementioned agents and are managed by the operating system (OS). This OS also helps to demonstrate different concepts.

![[2.png]]

## Components of the Computer System

### Operating System
Is the set of software that links together the programs in the computer system to the hardware.  

**Roles of the Operating System:**
1. [[Computer Systems#Kernel|Allocate resources]] (hardware) for the processes/programs
2. Manages processes - Memory hierarchy, Virtual Memory
3. Ensuring Security - Protecting the hardware/resources

#### Kernel
The Kernel is a program that serves as the "manager" or "handler" for the entire computer. It will allocate resources from the hardware (such as CPU, memory, I/O devices) for the processes.

==The kernel have full access/privilege to the computer's resources== (hardware) to carry out it's role as part of the operating system. This is also known as the **kernel mode**. As a result, the kernel will have full knowledge of where all the data is stored.

*How does the kernel manage resources?*
When a program wants to use resources, it has to coordinate with the kernel.

Since the kernel is so powerful, we need to ensure that we guard the kernel - not every program can access it's code/go in to kernel mode. Hence, this also means that the ==kernel must have controlled entry-points - Interrupts, Illegal Operations, Reset.==

A consequence of these controlled entry-points lead to system calls: when a program wants to access resources (CPU, I/O devices, memory) from the computer.