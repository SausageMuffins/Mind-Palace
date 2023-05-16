---
tags: MOC, SE
date: 03-05-2023
type: 
 Overview
 Active
summary: 
---
## Needs Attention
- [ ] [[Software Development Process#Analysis|Analyse]] the requirements and have a set of open questions for the clients.

## Incomplete Notes
```dataview
TABLE summary as Summary
FROM #SE 
WHERE contains(type, "Incomplete")
SORT date asc
```

---

## Concepts
```dataview
LIST 
FROM #SE 
WHERE contains(type, "Complete")
SORT file.date asc
```
