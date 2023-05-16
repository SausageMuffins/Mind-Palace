---
tags: CV
date: 14-05-2023
type: 
 Note
 Incomplete
summary: Document what the algorithm does and its use cases.
---

## Use Cases
- Segment different objects in the foreground of an image so that the computer does not see the objects as one big object.

## General Intuition
Transforms images like a topological map.

Brightness of an image (close to 255) is a "peak" whereas the darkness (close to 0) is a "valley". The algorithm labels each "valley" or local minima with different labels (like water flowing down a ridge).

When the labels (water) start to meet each other, they start to merge just like real water. **To avoid this,** the algorithm creates "barriers" to segment the edge boundaries.

## Syntax with OpenCV
