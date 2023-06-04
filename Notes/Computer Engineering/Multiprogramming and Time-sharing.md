---
tags: CE
date: 23-05-2023
type: 
 Note
 Complete
summary: A high level overview on two important characteristics of a computer system.
---

## Overview

The computer system has to handle many processes and the resources (memory and I/O devices etc) the processes needs. 

The two important characteristic we want are **==time-sharing==** and **==multiprogramming==** for our computer to feel fast and "lag-free". Hence, to realize these two characteristics, we make use of the kernel and the concept of virtual memory.

---

## Multiprogramming 

The idea of having the CPU doing something all the time and minimizing idle time. This characteristic is implemented through the [[Processes and Threads#Scheduling Processes|scheduling of processes by the kernel]]. 

**Link with Virtual Memory Concept**
When we schedule jobs, the kernel can also plan ahead to schedule jobs/instructions in the disk's swap space. 

When handling [[System Calls]], we would have to pause the current process and perform a [[Processes and Threads#^73f7be|context switch]] to handle the interrupt.

---

## Time-sharing Support

Context Switch is the standard process of saving the current state of the current process and transitioning to the another **process**.

The concept of timesharing is the illusion that we are running multiple processes at once. In reality, the computer system is just switching back and forth so fast that we can't really perceive it.

Details can be found [[Processes and Threads#A Process Context|here]].

---


