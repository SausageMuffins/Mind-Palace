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

#### Many to One Relationships

#### Multiple processes that open the same file

This can be reflected in the data structure where more than 1 fd table (each fd table is a process) points to the same file in the SWOFT. 

A child process forked from the parent process will have it's own fd table pointing to the same opened file in the SWOFT. This can be a way for them to communicate (the opened file serves as a "bridge")


#### Single process referencing a file more than once

A single process may have multiple file descriptors (done using dup()) to reference the same file more than once.


#### Multiple SWOFT entries pointing to same file in the Inode table.

This is only possible by calling the ==open() system call== from multiple processes. **Open() system calls always creates a new entry in the SWOFT**. This makes sense when you think about multiple processes reading the same file but at different locations. ie. There can be multiple instances of the opened file that is looking at a different piece of information (different CP) within the same file.


## File Links

#### Hard Links

1. A hard link to a file increases the reference count to the [[File Systems#Inode Table (File Control Block / FCB)|inode table]] entry.
2. A file must have a hard link for us to access it.
3. "." and ".." are special hard links that cannot be created by the user.
4. UNIX-like systems **cannot have a circular reference.**

Note: "." operator also increases the reference count by 1. This implies that whenever a subdirectory is created, it's reference count is 2 because parent points to it and the subdirectory points to itself with ".". This also means that the parent will increase it's reference count by 1 for each sub directory.

If it is'nt obvious, "." refers to itself (like current directory) and ".." refers to the parent.

#### Symbolic Links

1. Symbolic links are files! They follow the characteristics of a file -> have attributes, name and an entry in the inode table.
2. Symbolic links contain text that is automatically interpreted by the system to go to that location. Essentially a shortcut!
3. These links do not add to the reference count of the file they are linking to.
4. Removing the file (hard links) to the destination file will break the symbolic link (it no longer works) but recreating the same file back with the same name and directory will make it work again! 

---

# Directories

**Formal Definition:** Directories are the file system that references (using meta data) to organize files in a path (structured name space - a set of symbols to refer to an object. ie files). 

**Searching for Files:** The file system driver uses the directories to look for files. Since directories are also "files", the system will recursively look for the files starting from the root node.

**Purpose:** Efficiency, User friendly experience, Organization, File naming.

## Permissions on Directories

![[2023-06-02-21-47-40.png]]

The **"x" bit** on a directory indicates whether the user can access the inode information of the files within the directory. Not being able to access this information = cannot open the file.

The **"r" bit** allows us to view the directory's content - the files/directories existing in the current directory.

Note: cannot access a file directly inside a directory with no "x" bit permission granted.

**Modifying and/or accessing directories:**
1. Create/delete a file or sub-directory
2. List a directory
3. Rename a file
4. Search for a file
5. Traverse the file system

---

## Directory Structures

**Single Level**: all files are in the same directory
![[7.png]]

Note: All the files are in the same name space --> must have unique name which makes this system hard to use.


**Two Level**: Allow separate directories for different users.
![[8 1.png]]

Note: Can have different names in different local user directories. Deleting a file will be from the current user's local directory.

**Tree Structured:** Only one path to reach each file.
![[9 1.png]]

Note: As the tree grows, the full path name can be super long --> not user friendly. Since there are many "levels" of directories, the tree structured system also introduces the idea of the "working directory" - our current directory.

**absolute path:** path name begins at the root
**relative path:** path begins from working directory.


## Acyclic Structures

![[22.png]]

Symbolic and hard links can refer to the same file but with different names. Files are only removed if the reference count (number of hard links) falls to 0.


## Issues with Cyclical Structures

![[23.png]]

Cycles can exist due to symbolic or hard links. This can potentially cause an infinite loop! This can be resolved by limiting the number of directories traversed when searching.

The real issue is in **Self Referencing.**

Recall that a file/directory (and all subsequent files) are only deleted if the reference count > 0. Self-referencing nodes will not allow itself to be deleted even if the parent's hard link is broken.

![[24.png]]

Hence, we are stuck with inaccessible files in the system that piles up like garbage. This is usually resolved with other garbage collection protocols.


---
