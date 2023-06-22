---
tags: CE
date: 22-06-2023
type: 
 Note
 Incomplete
summary: 
---

## Overview on Files

There are two main types of files in a computer system - regular files and directories.

Regular files; store data for something (eg: programs, images etc.)

Directories: organize files (data)

The data stored is **non-volatile** and are usually stored in secondary storage (disks etc). Dealing with data can also follow the memory hierarchy.

![[Pasted image 20230622141425.png]]


**File Systems**: is **==a set of rules==** that help us to control how data (files) are stored/retrieved. **The purpose is to maintain and organize the secondary storage** so that the data becomes meaningful (which data is related to each other and when used together, can do something - ie files).

---

## Treating files as an abstract data type (class)

Just like a class, files have attributes (states) and methods (interface).

State (attributes):
- Name
- Identifier (unique number)
- Type
- Location (a pointer to the file's location on the disk)
- Size
- Permissions/Protection (who can read, write and execute the file)
- User information (the last person who accessed it, created/own it etc.

Interface (methods):
- Create
- Open
- Read/write
- Delete
- Memory Map (map file into a process's address space to be used)

==Common Sense: Open file -> Use file -> Close file==

note: if the file crash/terminate, the OS will automatically close it.

---

# Managing Files

## File System Data Structure

To have an actual system to manage storage and retrieval, we need some sort of data structure (as with all management algorithms/applications). Introducing the UNIX File System Data Structure.

![[4 1.png]]

#### File Descriptor Table (fd table)

The purpose of this table is to identify (through a unique number - ==fd flag==) opened files **for each process** With this fd flag, the file also has a pointer (==file ptr==) to an [[File Systems#System Wide Open File Table (SWOFT)|open file table]].


#### System Wide Open File Table (SWOFT)

This table is self explanatory. The table is managed by the **kernel** and it describes the list of opened files for all processes. Each file has a current point (**cp**) that points to a specific part (a byte) of the file to indicate which part of information is currently being used.

More importantly, each file entry will also have a pointer (**I-node pointer**) to point to the index of the Inode table.

Additional Points:
**Open Count:** The number of processes that open this file. Once it reaches 0, it is technically "not opened" and can be removed. The contrary is true.

We can also use Iseek() system call to change the current point CP to "jump" between information in the same file.


#### Inode Table (File Control Block / FCB)

The index node table is the file version of a [[Processes and Threads#Process Control Block|process control table with all the PCBs]]. This table contains an index for a file and it's accompanying states. **==Each file will have it's own index / unique inode number==**


---

## File System Mapping

With reference to the file system data structure, there are some interesting scenarios to consider.

## Many to One Relationships

#### Multiple processes that open the same file

This can be reflected in the data structure where more than 1 fd table (each fd table is a process) points to the same file in the SWOFT. 

A child process forked from the parent process will have it's own fd table pointing to the same opened file in the SWOFT. This can be a way for them to communicate (the opened file serves as a "bridge")


#### Single process referencing a file more than once

A single process may have multiple file descriptors (done using dup()) to reference the same file more than once.


#### Multiple SWOFT entries pointing to same file in the Inode table.

This is only possible by calling the ==open() system call== from multiple processes. **Open() system calls always creates a new entry in the SWOFT**. This makes sense when you think about multiple processes reading the same file but at different locations. ie. There can be multiple instances of the opened file that is looking at a different piece of information (different CP) within the same file.

---

# Directories