---
tags: CE
date: 30-05-2023
type: 
 Note
 Complete
summary: When we design an OS, we need to consider our user and system goals, followed by the principles and the structure.
---
# Considerations

---
## Goals

**User Goals:** OS should be ideal for a user (convenient, easy, fast)
**System Goals:** OS should be flexible, error free, maintainable and efficient

---
## Principles

**Policy:** The policy of an operating system promises things what the operating system can do.

**Mechanism:** The mechanism will then elaborate on how the operating system will do the promised things.

**Why are these two principles important?**
==Flexibility.== Policies can change (sometimes quite quickly) which may require a change in the mechanism. 

*The key idea is that our mechanism that we developed should be insensitive to the changes of a policy.*

---
## OS Structures

#### Simple/Monolithic Structure

Example: MS-DOS (without dual mode)

![[Pasted image 20230530151614.png]]

**Characteristics:**
- Can operate with or without dual mode
- ==The entire OS is working in the kernel space==
- Kernel provides almost all of the functionalities (file management, OS functions etc)

**Pros:**
- Little overhead (little layers of communication) in the system call interface which means ==higher performance==

**Cons:**
- Difficult to implement
- Difficult to maintain


#### Layered Approach

Example: Windows NT

![[10.png]]

**Characteristics:**
- Each layer relies on only the layers below the current one.
- The lowest layer usually include low level parts of the computer system like the hardware. - lower layers are likely in the kernel mode.

**Pros:**
- Easy to implement and debug the OS
- There are layers of abstraction for each layer - any given layer does not need to know how the layers below are doing their jobs.

**Cons:**
- Require careful planning for the layers.
- May be hard to detect bugs if we assume the layers below are correct - these kinds of bugs are very difficult to resolve at the user level.
- Less efficient - need to traverse many layers (overhead)


#### Microkernels

Example: Windows NT

![[12 2.png]]

**Characteristics:**
- Have a very small kernel with minimal process and memory management
- Kernel only does 3 things: Inter-process communication, memory management and scheduling. ie. the barebones of an OS.
- Every process will have to interact with a file server.

**Pros:**
- Easy extension to OS - no need to modify kernel (everything added to user mode)

**Cons:**
- Increased overhead cause need more communication which lowers performance


#### Hybrid Approaches

It is possible to combine characteristics from different OS structures to form a hybrid version. We can combine microkernel and the simple structures to complement each other.

Example: MacOS

![[13.png]]

