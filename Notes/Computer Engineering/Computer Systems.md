---
tags: CE
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
1. Allocate resources (hardware) for the processes/programs
2. Manages processes - Memory hierarchy, Virtual Memory
3. Ensuring Security - Protecting the hardware/resources

An important concept the operating system must include is [[Multiprogramming In Computer Systems|Multiprogramming]] and [[Multiprogramming In Computer Systems#Timesharing and Context Switches|Timesharing]].

---

#### Kernel

The Kernel is a program that serves as the "manager" or "handler" for the entire computer. It will allocate resources from the hardware (such as CPU, memory, I/O devices) for the processes.

==The kernel have full access/privilege to the computer's resources== (hardware) to carry out it's role as part of the operating system. This is also known as the **kernel mode**. As a result, the kernel will have full knowledge of where all the data is stored.

**Managing Resources**
When a program wants to use resources, it has to coordinate with the kernel and perform a [[Interrupts#Software Service Requests (System Calls)|system call]].

*More details:*
Since the kernel is so powerful, we need to ensure that we guard the kernel - not every program can access it's code/go in to kernel mode. Hence, this also means that the ==kernel must have controlled entry-points - Interrupts, Illegal Operations, Reset.==

A consequence of these controlled entry-points lead to system calls: when a program wants to access resources (CPU, I/O devices, memory) from the computer.

**Scheduling Jobs and Instructions**

The kernel is also responsible for scheduling different jobs and instructions for the CPU to execute to minimize idle time. This is highly related to the concept of [[Multiprogramming In Computer Systems|Multiprogramming]]

---

#### System and User Programs

The operating system also consists of system and user programs.

Most user and system programs will have to perform a ==system call which would use a trap== when the program's active processes require resources or services from the computer. 

This system call is handled by the operating system, or in particular, the [[Computer Systems#Kernel|kernel]]. When we perform system calls, we are also [[Interrupts|interrupting]] the system and the current process.

---

## Memory Hierarchy

The storage part of the computer system. The purpose of the hierarchy is to **maximize speed whilst minimizing cost**.

![[Pasted image 20230521221615.png]]


#### Caching

A related concept to memory hierarchy where we store information (that is more likely to be used) in faster memory based on the system's replacement policy.

Main Idea of the algorithm:
1. Check the highest level in the hierarchy (register or cache)
	1. HIT: RETURN the data to the CPU
	2. MISS: look at the next in line of the hierarchy
2. Update accordingly using the system's replacement policy.

#### Access Time

$$\alpha t_c + (1-\alpha)(t_c + t_m)$$

$\alpha$ : hit rate (number of hits/total attempts)
$t_c$ : time to access the cache
$t_m$ : time to access the memory (RAM)

Naturally, $1-\alpha$ is the miss rate.