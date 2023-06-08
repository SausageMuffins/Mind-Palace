---
tags: MOC, ML
date: 03-05-2023
type: 
 Overview
 Active
summary: 
---
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
	2. [[Gradient Descent#Linear Regression|Gradient Descent]]
2. [[Linear Regression]]
3. [[Ridge Regression]]

#### Unsupervised Learning
1. [[K-Clustering]]
