---
tags: MOC, CE
date: 03-05-2023
type: 
 Overview
 Active
summary: 
---
## Needs Attention
- [ ] Default Task

## Incomplete Notes
```dataview
TABLE summary as Summary
FROM #CE
WHERE contains(type, "Incomplete")
SORT date asc
```

---

## Complete Notes
```dataview
TABLE summary as Summary
FROM #CE
WHERE contains(type, "Complete")
SORT date asc
```

---

## Concepts
- [[Computer Systems]]
	- Memory Hierarchy
	- Kernel
	- Programs
	- Interrupts

