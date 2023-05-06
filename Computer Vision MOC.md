---
tags: MOC
date: 03-05-2023
type: 
 Overview
 SideProject
summary: 
---

## Needs Attention
- [ ] Default Task

## Incomplete Notes
```dataview
TABLE summary as Summary
FROM #CV
WHERE contains(type, "Incomplete")
SORT date asc
```

---

## Overview
Getting Help:
1. Check Course Notebook
2. Stack Overflow
3. Check FAQ
4. QA Forum

## Concepts
- [[Numpy]]
- [[Image Basics with OpenCV]]
- [[Image Processing with OpenCV]]
- [[Video Processing with OpenCV]]
- [[Object Detection]]
- [[Object Tracking]]
- [[Deep Learning with Computer Vision]]


## Setup

We would have to set up the environment first
```bash
cd C:\Users\nryan\OneDrive - Singapore University of Technology and Design\Programming\Computer Vision with Python Course

conda activate python-cvcourse

jupyter-lab
```

The block of code in anaconda prompt should get you going.

## Using VS Code

I prefer using VS code and anaconda's environment to work with code.

However, we have to install a few libraries later on.

#### Install OpenCV
Put the code into conda prompt.
```bash
conda install -c conda-forge opencv
```
