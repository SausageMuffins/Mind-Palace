---
tags: CE
date: 07-06-2023
type: 
 Note
 Complete
summary: The potential (sync) issues a computer system can face and the solutions to resolve them. Producer-Consumer problem, race conditions, critical section problems. Solved by software and hardware solutions (peterson's solution and hardware locks) as well as semaphores to reduce busy waiting.
---

## Parallel vs Concurrency

Before understanding synchronization problems, these two concepts of parallel and concurrency should be well understood!

**Concurrency:**
Think context switching where we are request for something from the computer system, then switch to another process so that we don't waste time. The idea is that we are "multi-tasking" and having the server deal with our request in the background.

**Parallel:**
Parallel execution just means that two processes are executing at the exact same time! This naturally means that we need an appropriate hardware to support this (the computer system must have multiple processors or cores)

---

## Producer-Consumer Problem

The main idea of this problem is that we want to make progress on both producing work and consuming work to/from a shared buffer or space. Both the producer and consumer are asynchronous processes/threads but have to synchronize their actions with respect to the buffer.

**Win Con:**
1. A producer cannot add more to the buffer if it's full
2. A consumer cannot take away more from the buffer if it's empty.

---

## Race Condition

The producer consumer problem is the preface for the race condition. Quite literally, I imagine two different processes or threads "racing" with each other to complete their task. This is because we lack a synchronization method between the two.

Example:

We have two processes that try to add 1 to a variable x. 

What happens when we have a race condition between these two processes?

One possible answer is that x will only increment by 1. Even though we expect x to be incremented by 2 when executed sequentially, the race condition would mean that upon reading the value of x by any of the process, x would be 0 for BOTH processes. 

This example showcases the problem of race condition where a program can execute and produce an unintended result. The two processes can also be described as **interleaving** - we don't know for sure which process will execute first

**Link to Producer-Consumer problem:** if the two processes to add or remove an item from the buffer are in a race condition, then the criteria may not be fulfilled. This is because a consumer may end up taking away an item before the producer adds to it (vice versa)!

---

## Atomicity of Operations / Processes

An **Atomic Process** cannot be interrupted and guarantees that it will execute. In the context of the race problems and concurrency, these processes are very important in preventing race conditions. This overview of atomic operations are highly relevant to [[Synchronization Problems in Computer Systems#Hardware Solutions|this segment about hardware solutions]].

**==Critical Section Problem==**
Using an atomic process ensures the execution of **critical operations** on shared resources. These lines of code that are "critical operations" are also known as the critical section  ^bbdac0

From the above example, x is the shared variable and adding to x is a critical section!

Formal Definition: The issue of synchronizing access to shared resources in a way that ensures ==mutual exclusion== (mutex) and ==progress.== Having progress also implies that every process cannot execute forever and have a fixed number of times to enter the critical section -> ==bounded waiting time==.

This results in a process with two properties: **safe (no race conditions)** and **liveness** (making progress = no hang). There are two main solutions for this problem - rely or don't rely on busy waiting.

#### **Busy Waiting** 
The idea of a process/thread in a constant loop which checks a condition --> In the context of the race condition, the process/thread keeps checking to see if it can enter the critical section (it's turn).

A type of busy waiting is known as spinlocks. There are solutions to the [[Synchronization Problems in Computer Systems#^bbdac0|critical section problem]]. These are known as Mutex Locks.

**==Spinlocks==** are bad because they waste resources.

**==Mutex Locks==** don't waste much resources because it puts the process to sleep while they are waiting but this needs coordination from the kernel. Hence, the tradeoff is the overhead when coordinating with the kernel scheduler.

---

## Solutions

---

### Software Solutions

#### Mutex Algorithm (==Busy Waits==)

Mutex is just short form for mutual exclusion --> The algorithm ensures no two process can access the share resource at the same time.

##### Peterson's Solution: (Only deals with two processes in CSE course)

Initialization: all flags for every process == false, set "turn" into arbitrary numbers. 

Main Idea: 
flag == True/False which means the process is READY/NOT READY to enter critical section.
turn = i which means it is process i's turn to enter critical section.

The flag mainly ensures ==mutual exclusion== and the turn ensures ==progress==. Whenever the process cannot enter it's critical section, it is ==busy waiting==.


```c
do{
   flag[i] = true;
   turn = j;
   while (flag[j] && turn == j); // this is a while LINE
   // CRITICAL SECTION HERE
   // ...
   flag[i] = false;
   // REMAINDER SECTION HERE
   // ...
}while(true)
```

Most appropriate for single core systems. --> makes it unviable for modern computers because it does [not guarantee to work on modern computers](https://natalieagus.github.io/50005/os_notes/week4_solutions#will-petersons-work-in-modern-cpus-out-of-the-box).

---

### Hardware Solutions

**==Hardware Locking:==** The main idea here is that only one process or thread can "lock" the hardware out of other processes. This can be super fast but is primitive and the number of locks are physically limited by the system -> each piece of hardware need additional components. ie. it is not scalable. ^571f0e

*We do not need the kernel for this since it's hard coded into the hardware.*

**==General Idea of how Hardware Solutions work with locking:==**
- **CHECK** (using TAS and CAS) if the resource is being used by another process.
- **TELL** the process that the resource is currently taken up/available.
- The sad process may ==busy wait== until the resource is available.
- Once the sad process and access the resource, the hardware (eg: memory) will make a note that the resource is being used --> locking the hardware out and repeating again.

**==Details==**

Two important atomic operations for a process to check if a hardware is locked. These are Low-level assembly language instructions.

1. **Compare and Swap (CAS)**
	- It compares the value at the specified memory location with the expected value.
	- If the values match, it updates the memory location with the new value.
	- It returns a Boolean indicating whether the comparison and update were successful.

2. **Test and Set (TAS)**
	- It reads the value at the specified memory location.
	- If the value is false or indicates that the resource is available, it sets the value to true or marks the resource as taken.
	- It returns a boolean indicating whether the resource was successfully acquired.


---

## Semaphores

Semaphores are really just integer variables that is managed by the kernel. The value of the semaphore corresponds to the number of available shared resource. Accessing and changing the semaphore value through **wait()** and **signal()**.

The main idea of the semaphore is that if it is more than 0, it will wake up one process that is waiting in a queue to resume. Otherwise, a process that tries to enter while the semaphore is 0 will be put to sleep. (Before it is put to sleep, we may need to busy wait a bit.)

There are two main ways to use semaphore:

| Method           | Description   |
| ---------------- | ------------- |
| Binary Semaphore | It's a 1 or 0 - Any process/thread that makes the semaphore call Wait() will be blocked and added to the waiting Queue. Alternatively, any process that calls Signal() will increase the semaphore value to 1.|
| Counting Semaphore                 | Can count from 0 to N (Integer)               |

**==Semaphore does not completely eliminate busy waiting==**. There will be busy waiting in the [[Synchronization Problems in Computer Systems#^bbdac0|critical section]] of the semaphore - wait() and signal(). Since the busy waiting will be relatively shorter than constantly busy waiting with the other methods, the CPU resources can be saved! :D

---




















---

#### More on Atomic Operations

Atomic operations are usually implemented as specialized instructions inside the hardware of computer systems. (hard coded) **These operations cannot be interrupted and it's intermediary values cannot be observed.**

---

#### More on Busy Waiting

A type of busy waiting is known as spinlocks. There are solutions to the [[Synchronization Problems in Computer Systems#^bbdac0|critical section problem]]. These are known as Mutex Locks.

**==Spinlocks==** are bad because they waste resources.

**==Mutex Locks==** don't waste much resources because it puts the process to sleep while they are waiting but this needs coordination from the kernel. Hence, the tradeoff is the overhead when coordinating with the kernel scheduler.

---

## Java Implementation to Synchronization

### Java Object Mutex Locks

![[3.png]]

The main idea here is that threads of an object have to queue up (**blocked**) to possess the lock. Once the thread obtains the hardware lock, it leaves the entry set and becomes **runnable.** After the thread is done, it will release the object lock.

==The entry set contain the threads waiting to acquire the lock (to enter critical section) whereas the wait set contain the threads waiting for a condition to happen so that they can join the entry set.==

The way this works is through the **notify()** and **wait()** calls. Note: these two atomic calls belong to the thread and are not from the semaphore - (wait and signal).

**Wait():**
Whenever a thread wants to enter a synchronized block / critical section, it will call the wait method. If the critical section lock is available, the thread can enter and "own" the lock. Subsequently, any other thread that tries to enter will be blocked/put to sleep.

**Notify() and NotifyAll():**
After a thread possessing the lock finished it's task (critical section), the thread can **yield()** it's CPU resource to signal to the scheduler and CPU that it can be rescheduled. Additionally, the thread will also call **Notify() or NotifyAll()** to wake up a thread / all the threads. This will allow the threads that were woken up be to be scheduled to enter the critical section.

**Condition Variables:**
These variables are another method to solve the critical solution problem. They are essentially a shared variable (using [[Synchronization Problems in Computer Systems#^571f0e|hardware locks]]) between threads. It is similar to the wait and notify method but it calls **await() and signal()** instead. 

Main idea:
1. Thread i enters the critical section because the conditional variable (which is an array) allows it to. ie. thread i has met it's condition to enter.
2. Once thread i is done, it will use the signal() method to literally signal the next thread (could be in a queue) to enter the critical section.
3. Other threads will be blocked as their condition is not met until the current working thread finishes and signals (switching on their condition) the next thread to start.

---
