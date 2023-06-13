---
tags: CSE
date: 13-06-2023
type: 
 Note
 Incomplete
summary: 
---

## Dead Lock Problem

Think of it as a "Stand-Still" where a group of processes are holding on to a resource and needs a different resource (that is acquired by another resource).

Example: let's say we have two processes, P1 and P2, and two resources, R1 and R2.

- Process P1 has acquired R1 and needs R2 to proceed.
- Simultaneously, process P2 has acquired R2 and needs R1 to proceed.

These two processes will end up being stuck in a waiting state (deadlock).

**How it should have normally worked (General System Model)**
1. Process P1 should request for the resource R1. In this thought process, we consider R1 to be in units (ie. R1 can have multiple instances --> think RAM having more than 1 unit of space)
2. P1 then use the resource when it acquires it --> can be linked to [[Synchronization Problems in Computer Systems#^bbdac0|critical section problem]].
3. P1 then releases the resource once it has completed it's task.

The issue only arises when it P1 needs another unit of R2 to complete it's task but R2 is unavailable if another process P2 is using it.


**Conditions for DeadLock:**
1. Mutual Exclusion (Mutex)
2. Hold and Wait: The process holding a resource is requesting for another resource held by other processes.
3. No Preemption: The resource can only be released by the process using it voluntarily.
4. Circular Wait: >2 processes are waiting for resources held by the other process --> ends up having to depend on the another process which leads to a circular dependency. 

---

## Detecting Deadlocks

#### Resource Allocation Graph

A graph naturally have Vertices and Edges:
- Vertices: can include both Processes and Resources
- Edge: can include a **request** and **assignment** type

**Assignment Edge:** A resource pointing to a process indicates that this resource is assigned to this process.

**Request Edge:** A process wants to access (pointing to) this resource.

It is simple to detect a deadlock by looking at the edges --> Check if there is a loop in the graph. Or, just use common sense --> See if the processes depend on each other to complete.

---

## Handling Deadlocks

#### Avoidance
Main Idea: We constantly check if allocating that resource will end up in a deadlock. This also includes in the future. Basically, we just want to **avoid** deadlock as much as we can.

**How does it work?**
- Every resource request will need to provide more information -> eg: the maximum amount of resources needed (for each type) that it will need in the future as well.
- An [[Deadlocks#Bankers Algorithm|avoidance algorithm]] is used to check the current resource allocation state to see if the above resource request will not lead to a deadlock state.
- The above two procedure ensures a ==**safe state:**== A sequence of processes such that each process's requests will always be satisfied (*currently available resource + held resources by previous processes*) such that any preceding any following processes will finish their task.

A system being in a safe state guarantees no deadlocks. The converse is true.


##### Bankers Algorithm

The bankers algorithm keeps in mind the main idea for avoiding a deadlock --> check and see if allocating the resource will enter a dead lock state.

| Data Structure | Description                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Availability   | An array of size m in which each index indicates the availability of the resource (number of units available)                                             |
| Max            | A matrix (nxm) that indicates the maximum type of resource needed for each requesting process. Each row is a process with columns as the type of resource |
| Allocation     | A matrix (nxm) that indicates the resources that are currently in use by each process. Each row is a process with columns as the type of resource         |
|   Need             |    A matrix (nxm) that indicates the resources needed in the future.                                                                                                                                                       |





#### Detection and Recovery
Main Idea: We allow deadlocks to occur but we constantly check for them. Once **detected**, we break them apart (**recovery**).


#### Prevention
Main Idea: Impose conditions on all resource requests --> we ensure that we **never** enter a deadlock state --> this means we don't even need to check.