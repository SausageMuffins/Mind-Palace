---
tags: CE
date: 23-05-2023
type: 
 Note
 Incomplete
summary: Details on the hardware and software interrupts and the way they are handled.
---
## Overview

There are mainly two types of interrupts, the hardware initiated (power button) and the software initiated which are also known as traps. The handling of the interrupts are always in kernel mode. 

**==Hardware Interrupts are Asynchronous but system calls are not.==**

**Traps:** a form of interrupt from user programs (software) due to a request/error.****

==An interrupt with a lower priority cannot be interrupted to prevent re-entrancy problems.== That said, the kernel can choose which interrupt to handle first (if there are multiple interrupts).

High level overview:

![[Pasted image 20230523103653.png]]

---

## System to Handle Interrupts

**Vectored Systems** uses an Interrupt Vector points from the device to the address of the appropriate routine.

**Poll Systems** routinely scan/poll the devices to know which device made a request.

**Interrupt Vectors VS Polling**

| Interrupt Vectors   | Polling             |
| ------------------- | ------------------- |
| For complex systems | For simpler systems |
| Many devices        | Less devices        |
| Can handle high interrupt rates                    |      Can handle lower interrupt rates               |



---

## General Procedure for **Hardware Interrupts**

1. I/O device sends data to the device controller to make an interrupt request. (input)
2. Save the states of the current program/process. (store registers and program counter)
3. Transfer control to the interrupt handler based on the device controller.
4. Complete the interrupt request, clear request and restore the states.

![[9.png]]

The input data is stored in the RAM - will wait for a program/process/application to request for it (system call). For example, the ``input`` keyword of python. ==When the hardware interrupts the CPU, there is usually an IRQ delay==.

---

## Linking up with [[System Calls]]

1. Software Request for [[OS Services and UI|OS Service]]
2. [[Computer Systems#Kernel|Kernel]] handles the request - ie ask from hardware to fulfil the request
3. **Return to Software** - because we don't want to freeze the system for one mere request.
4. [[Interrupts#General Procedure for **Hardware Interrupts**|Hardware Interrupt]] once it is ready to fulfil the request - send data to RAM
5. CPU retrieves the relevant data from RAM and pass to software.