---
tags: CE
date: 29-05-2023
type: 
 Note
 Complete
summary: Go in depth into the OS and learn about the different services the OS and kernel can provide for the programs.
---

## Features and Services the OS Supports

| Services                         | Description                                                                                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Program Execution               | Load and Run executable programs                                                                                                                             |
| I/O Operations                  | Manage Asynchronous Interrupts from hardware                                                                                                                 |
| File Management                 | Essentially everything that has to do with files. (read, write, create etc)                                                                                  |
| Communication Between Processes | Every process runs in it's own virtual environment (virtual memory concept) and the OS helps to establish communication between the program and other actors |
| Error Detection                                | Detect possible errors and take actions to prevent errors.                                                                                                                                                              |

**Features**

*Resources:* The OS will also account for, manage, and allocate resources.

*Security:* Access to the system resources is controlled (only [[Computer Systems#Kernel|kernel]] have)

---

## Accessing OS

In general, we can access the OS via the ==GUI== or ==CLI== together with ==system calls== to utilize the OS services. 

==GUI: ==Usually the desktop or home screen - use of mouse, keyboard and icons on a screen. Any interaction such as opening a file **will perform a system call**.

==CLI: ==These interfaces usually come in the form or a terminal or command line. It's a more powerful way to access the OS services where the use can type commands to call **system programs**/utilize an OS service.

---
