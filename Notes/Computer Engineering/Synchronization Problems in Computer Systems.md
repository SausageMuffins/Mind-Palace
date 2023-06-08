---
tags: CE
date: 07-06-2023
type: 
 Note
 Incomplete
summary: The potential (sync) issues a computer system can face and the solutions to resolve them. Producer-Consumer problem, race conditions, critical section problems
---

## Parallel vs Concurrency

Before understanding synchronization problems, these two concepts of parallel and concurrency should be well understood!

**Concurrency:**
Think context switching where we are request for something from the computer system, then switch to another process so that we don't waste time. The idea is that we are "multi-tasking" and having the server deal with our request in the background.z

**Parallel:**


## Producer-Consumer Problem

The main idea of this problem is that we want to make progress on both producing work and consuming work to/from a shared buffer or space. Both the producer and consumer are asynchronous processes/threads but have to synchronize their actions with respect to the buffer.

The problem is most obvious when we execute these processes [[]].
**criteria:**
1. A producer cannot add more to the buffer if it's full
2. A consumer cannot take away more from the buffer if it's empty.



