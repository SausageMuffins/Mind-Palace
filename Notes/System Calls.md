---
tags: CE
date: 29-05-2023
type: 
 Note
 Incomplete
summary: More information about requesting fro services (software perspective)
---

## Software Service Requests

Software (ie. applications, programs or processes) will have to make a system call to request for resources. **Often, we will use system programs to act as an interface for system calls.**

This system call will then trap the computer system and handle this request. 

In doing so, ==there will be a SVC delay== which temporarily pauses the current process to handle the request.

These requests link up directly with the hardware interrupts. I would imagine the system would be much more efficient if we are only interrupted by hardware when we want it to (system call).

**Thought Process:**
1. Software Request
2. Kernel handles the request - ie ask from hardware to fulfil the request
3. **Return to Software** - because we don't want to freeze the system for one mere request.
4. Hardware interrupt once it is ready to fulfil the request - send data to RAM
5. CPU retrieves the relevant data from RAM for the software.

---

## System Calls via API

==API: Application Programming Interface== (a contract)
1. Have a list of available functions to call
2. Have the parameters for each function
3. Have the return value of each function

Think of it as a set of rules and protocols to follow.

Examples of APIs:
- Win32 for windows systems
- POSIX API for UNIX systems
- Java API for Java virtual machines (JVM)

**Why are APIs important and relevant to the computer system?**

When we develop applications or software for the system, we want to make sure our application can request for resources. Hence, when we use the APIs, it provides a layer of abstraction (we don't have to care how the system does it) for these service requests. ==This is one advantage of using APIs over direct system calls.==

Another reason is to make the application portable - Any computer system with the same API can run the software.

Imaging using a sequence of system calls instead of using a built-in function like read() to read a file.

---

## System Call Implementation

![[Pasted image 20230529130901.png]]

Main Idea of how system calls are implemented:

**A Table** with an index for each system call (light blue box). The **system call interface** that we see in the diagram will do two things.

1. [[System Calls#Invoking System Calls|invoke the system call]]
2. return status of the system call
3. return any values from the system call.

---

## Invoking System Calls

Imagine system calls as functions. Like any function, a system call may require certain parameters when we call it.


1. **==**Pass directly into a register**==      
	- Cons: There may be more parameters than registers
	- Pros: Simple an Fast

2. **==Push to Stack==**
	- Processes in user mode push the parameters to the stack and use syscall
	- kernel mode pops all the parameters

3. **==Blocks and Tables==**
	- Pass as an entire block to the RAM and the pointer to the block to a register
	- System call will look for the register with the pointer and obtain the parameters

---

## Link to System Programs

##### **What are system programs?**

System programs like such as ls is the terminal comes with the OS and provides the environment to make it easier to develop programs. They are very generic tools for low-level actions - such as seeing files.

Note: System Programs are not user programs - user programs are downloaded/developed by the users and **do not come with the OS**.


##### **How are system programs related to system calls?**

System programs can serve as the interface (API) for system calls. That is, we try to abstract away the details of the system calls with system programs. 
