---
tags: CE
date: 23-05-2023
type: 
 Note
 Incomplete
summary: A concept to improve efficiency in CPU usage.
---

## Overview

The multiprogramming concept is important in keeping the CPU utilization relatively higher (more efficient). 

Why? - we hate idling things and running the CPU at max capacity all the time can run it down to the ground.

---

## The Scheduler - Kernel
The operating system's kernel needs to have a very efficient and smart kernel to schedule jobs properly for the CPU to execute. 

**Link with Virtual Memory Concept**
When we schedule jobs, the kernel can also plan ahead to schedule jobs/instructions in the disk's swap space. 

When handling a system call, we would have to pause the current process and perform a [[Multiprogramming In Computer Systems#Timesharing and Context Switches|context switch]] to handle the interrupt.

---

## Timesharing and Context Switches

Context Switch is the standard process of saving the current state of the current process and transitioning to the another **process**.

The concept of timesharing is the illusion that we are running multiple processes at once. In reality, the computer system is just switching back and forth so fast that we can't really perceive it.

---


