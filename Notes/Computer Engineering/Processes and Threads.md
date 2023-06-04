---
tags: CE
date: 30-05-2023
type: 
 Note
 Complete
summary: The concept of a process, what a process entails and how the computer manages a process (scheduling, context switches, communication etc)
---

## Processes

Processes are active programs (programs that are currently executing - not AFK). We say that a program becomes a process when it's executable (binary) file is loaded into memory.

There are two types: **Independent (default)** or **Cooperating (can be affected by other processes)** -> a cooperating process needs to [[Processes and Threads#Communication Between Processes (IPC)|communicate]] with other processes.

We can visualize the states of a process as a state machine

![[1.png]]


==**Abstractions in Processes**== 
- **Concurrency** - Each process runs in it's own virtual machine ^57d863
	- Stack
	- Data
	- Program Counter
	- Heap
-  **Protection** - **Private Address Space**
	- Not accessible by other processes (by default) - protects the process from being altered by another program.


#### A Process Context != PCB

The context includes all the information that is abstracted + **contents of the registers for the process** + **text section (code or instructions)**.


**Context Switching** ^73f7be

The idea of switching between processes and maintaining an illusion of concurrency (or multitasking). It can only do this when the kernel switches from one [[Processes and Threads#Process Control Block|PCB]] to another. 

*The formal definition of context switching:* 
the mechanism of saving the states of the current process and restoring (loading) the state of a different process when switching the CPU to execute another process.

Context Switching is the fundamental concept behind [[Multiprogramming and Time-sharing#Timesharing Support|Time-sharing]].

*A drawback of context switching:* The system is not doing work during the switch.


#### Process Control Block

This block of information will contain all the necessary data for managing a process.

1. Process State
2. Program Counter Value
3. CPU registers and scheduling information
4. Memory-management information
5. Accounting Information
6. I/O Status information

![[Pasted image 20230530225856.png]]

Let's think of it as a "saved state" of a game - what items are being in used, what menu is opened etc. **The information is updated when the process is interrupted.**


==Why is the process control block important/relevant to the computer system?==

It is needed for both scheduling and context switching. Without the information in the Process Control Block, the system cannot "resume" the state of a process. This will break the illusion of [[Processes and Threads#^57d863|Concurrency]].


#### Communication Between Processes (IPC)

This section is especially relevant for cooperating processes. Processes need to communicate due to various reasons (sharing information, speeding up computation, modularity and even convenience). There are two main mechanisms listed below.

##### POSIX Shared Memory
A location in the RAM that is shared and accessed though system calls by multiple processes.

1. Caller process request for sharing memory
2. Kernel allocate and establish a region of memory -> return to caller
3. Cooperating processes can access memory (write/read) without kernel's assistance.

##### Message Passing (sockets)
Quite simply asking the kernel to pass a message (sender/**client**) to another process (receiver/**server**)

A **socket** is an interface for a process to pass a message. Imagine a tunnel (communication link) with two openings (socket)

Details:
- It is a concatenation of an IP address, e.g: 127.0.0.1 for localhost
- And TCP (connection-oriented) or UDP (connectionless) port, e.g: 8080.
    - We will learn more about UDP and TCP as network communication protocols in the later part of the semester.
- When concatenated together, they form a socket, e.g: 127.0.0.1:8080
- All socket connection between two communicating processes must be unique.


Another interface for message passing is a **message queue**.

![[16.png]]


#### Message Passing VS Shared Memory

1. Number of System Calls: 
	- Message Passing: Generally faster with short messages (require system calls for each message)
	- Shared Memory: Initial system calls to set up the region is very costly but becomes much faster afterwards
2. Number of processes Involved:
	- Message Passing: between two processes only
	- Shared Memory: between two or more processes
3. Synchronization Mechanism:
	- Message Passing: no additional sync mechanisms - just use kernel
	- Shared Memory: need additional sync mechanisms to prevent race-conditions

---
## Process Creation

We generally create processes using the **fork** [[System Calls|system call]]. There will always be a parent process and a child process -> we end up getting something like a tree!

![[8.png]]


**General Flow:**
1. Parent process if forked
2. Child process gets a new process identifier (PID=0) and duplicates the contents of the parent process. **Both the parent and child have it's own address space.**
3. Child process executes while the parent waits.
4. Child process finishes and the parent process resumes.

![[11.png]]

### Example code

```c
#include <sys/wait.h>
#include <sys/types.h>
#include <stdio.h>
#include <unistd.h>

int main(int argc, char const *argv[])
{
   pid_t pid;

   pid = fork();
   printf("pid: %d\n", pid);

   if (pid < 0) // ERROR
   {
       fprintf(stderr, "Fork has failed. Exiting now");
       return 1; // exit error
   }
   else if (pid == 0) // CHILD EXECUTES
   {
       execlp("/bin/ls", "ls", NULL);
   }
   else // PARENT EXECUTES CONCURRENTLY
   {
       wait(NULL);
       printf("Child has exited.\n");
   }
   return 0;
}
```

#### execlp system call

`execlp` is a system call that loads a new program called `ls` onto the child process’ address space, effectively **replacing** its text (code), data, and stack content.

#### wait system call

Concurrently, the parent process executes `wait(NULL)`, which is a system call that **suspends** the parents’ execution until this child process that is executing `ls` has returned.


---
## Scheduling Processes

There are three main types of processes that are currently in the system.

| Types of Processes | Description                                            |
| --------------- | ------------------------------------------------------ |
| Job Queue       | All of the processes                                   |
| Ready Queue     | Processes that are waiting to be executed (in the RAM) - queueing for CPU |
| Device Queue                | Processes that are queuing for I/O hardware - each hardware piece have it's own queue                                                        |

Using the concept of a queue (FIFO) to fulfil the needs/system calls of a process. I imagine each queue is like a linked list, pointing to the process's PCB.

![[5.png]]

![[6.png]]

Legends:
- **Rectangular** boxes represent queues,
- **Circles** represent resources serving the queue
- All types

---

## Process Termination

Two ways for a process to end: **exit() system call** and **kill(pid, SIGKILL) system call**. For kill to work, the current process needs to know the pid -> suggests that parent processes can kill child processes.

A terminated process frees up resources for other processes.

#### Orphaned Processes

These processes occur when we kill the parent and leave the child hanging. There are two main ways to deal with this.

- Kill the children as well. (cascading termination)
- Adopt the children into other (most probably the INIT process) processes.

#### Zombie Processes

These processes are supposed to be dead (terminated) but the exit status is not read by the parent. This occurs when the parent **does not call wait/waitpid** to read the exit status.

This is problematic due to the following reasons:
1. PCB entry still remains -> is taking up resources
2. PID of the child still remains -> 1 less possible PID 

Recall that each PID must be unique: 

32-bit system = 32767 available pids -> 0 and 1s are reserved.
64-bit system = 2^22 available pids.

Finding the max PID in a system
```bash
`cat /proc/sys/kernel/pid_max`
```

---

## Amdahl's Law: measure of maximum speedup

$$max\ speedup =\frac{1}{\alpha + \frac{1-\alpha}{N}}$$

**Legend:**
$\alpha$ : fraction of program that must be executed serially (not parallel)
$N$ : the number of CPU cores.



---
## Threads

Threads are parts of a process -> if a process a a layer of cloth, threads are quite literally, the threads. **Threads are managed by the thread scheduler!**

**Characteristics:**
1. Possess a thread ID
2. Possess a PC
3. Possess a set of registers
4. Possess a stack.

**Pros:**
- Make the system more responsive -> allow different parts of the process to continue
- Require less resources -> context switch between threads (creating processes are costly!)
- Fast communication -> share same address space = lower overhead when context switching.
- May not even need to perform a system call to access thread API (resources)

**Cons:**
- No protection since the code, data and files are shared between threads.
- Parallel thread execution may not be available -> depends on [[Processes and Threads#Types of Threads|types of threads]].
- More careful planning and programming (effort) to synchronize threads.


### Types of Threads

#### User level threads / green threads

- Scheduled by runtime library
- In user space -> can work is OS that do not have native thread support (not known by kernel)

#### Kernel level threads

- Scheduled by kernel + share data with other kernel threads
- Can be created by kernel whenever the thread is needed for a task -> perform the task asynchronously
- Cannot execute in user mode!

Kernel threads are typically needed when we have to wait for an asynchronous event and we have to do a background task as result of this async event.

---

#### Java Examples

**Runnable Interface**

The first way is by implementing a **runnable interface** and call it using a thread:

```java
    public class MyRunnable implements Runnable {
        public void run(){
           System.out.println("MyRunnable running");
        }
      }
```

Create a new Thread instance and pass the runnable onto its constructor. Call the `start()` function to begin the execution of the thread:

```java
Runnable runnable = new MyRunnable();
Thread thread = new Thread(runnable);
thread.start();
```


**Thread subclass**

The second way is to create a **subclass** of `Thread` and override the method `run():`

```java
    public class CustomThread extends Thread {
      public void run(){
         System.out.println("CustomThread running");
      }
    }
```

Create and start CustomThread instance to start the thread:

```java
CustomThread ct = new CustomThread();
ct.start();
```


### Thread Models

#### One to One

![[Pasted image 20230604232805.png]]

Examples
Windows NT/XP/2000
Linux
Solaris 9 and later

**Advantages:**
- More concurrency -> any thread with blocking system call no problem!
- Multiple threads can run in parallel on multicore systems

**Disadvantage:**
- A lot of overhead to create a thread -> need a corresponding kernel thread
- Can only create a limited number of threads to prevent destroying the system
- May involve kernel when context switching -> increases overhead.

#### Many to One

![[Pasted image 20230604232836.png]]

Examples:
Solaris Green Threads
GNU Portable Threads

**Advantages:**
- More efficient - thread management done in user space by thread library
- Developer can create many threads

**Disadvantage:**
- Any thread that makes a blocking system call will jam the entire process
- Threads cannot run in parallel on multicore systems

#### Many to Many

![[Pasted image 20230604232859.png]]

Examples
Solaris before v9 (Solaris
LWP is user thread’s door
to kernel thread)
Windows NT/2000 w/
ThreadFiber package


==Retains the advantages of both many to one and one to one models.==



#### Hybrid Model

![[Pasted image 20230604232927.png]]

Examples
IRIX
HP-UX
Tru64 UNIX
Solaris 8 and earlier

---
