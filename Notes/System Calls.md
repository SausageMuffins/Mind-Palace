---
tags: CE
date: 29-05-2023
type: 
 Note
 Incomplete
summary: More information about requesting fro services (software perspective)
---

## Software Service Requests

Software (ie. applications, programs or processes) will have to make a system call to request for resources. This system call will trap the computer system and handle this request. 

==There will be a SVC delay== which temporarily pauses the current process to handle the request.

These requests link up directly with the hardware interrupts. I would imagine the system would be much more efficient if we are only interrupted by hardware when we want it to (system call).

**Thought Process:**
1. Software Request
2. Kernel handles the request - ie ask from hardware to fulfil the request
3. **Return to Software** - because we don't want to freeze the system for one mere request.
4. Hardware interrupt once it is ready to fulfil the request - send data to RAM
5. CPU retrieves the relevant data from RAM for the software.