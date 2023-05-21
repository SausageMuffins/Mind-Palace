---
tags: MOC, ML
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
FROM #ML
WHERE contains(type, "Incomplete")
SORT date asc
```

---

## Complete Notes

```dataview
TABLE summary as Summary
FROM #ML
WHERE contains(type, "Complete")
SORT date asc
```


---

## Concepts

#### Supervised Learning
1. [[Linear Classification]]
	1. [[Perceptron Algorithm]]

