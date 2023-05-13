---
tags: CV
date: 13-05-2023
type: 
 Note
 Incomplete
summary: Contains various concepts and techniques from OpenCV Library for Object Detection
---

## Overview
Object Detection can be a vary large topic and be built upon to form more complex methods/concepts. Hence, this note will serve as a mini MOC and have a bird's eye view for Object Detection using OpenCV.

## [[Template Matching]]
The very base case/general idea for object detection is to match two identical images together. This is also known as template matching. We probably will not use this as much sadly.

## General Detection Methods
- [[Corner Detection]]
- [[Edge Detection]]
- [[Grid Detection]]

## [[Contour Detection]]
This allows us to separate the foreground and background of an image. Additionally, it also allows us to detect contours (external and internal).

A similar concept would be Watershed Algorithm which also allows us to segment images into foreground and background.

## [[Feature Matching]]
This is an advanced method of Object Detection where we look for similar characteristics/features of two different images. 

This section also helps us to detect faces and eyes in images.