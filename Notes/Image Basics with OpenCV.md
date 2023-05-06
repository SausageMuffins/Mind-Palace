---
tags: CV
date: 03-05-2023
type: 
 Note
 Incomplete
summary: Introduction to the OpenCV library.
---

## Overview

OpenCV is works closely with both [[MatPlotLib|matplotlib]] as well as [[Numpy]]. Consider those as prerequisites before reading this note.

#### Imports
```python
import cv2
import numpy as np
import matplotlib.pyplot as plt
```

#### Reading and Writing Images
```python
img - cv2.imread("FILENAME")
cv2.imwrite("FILENAME", image) # image should be in a numpy array form.
```

#### CV2 Issue
Open CV reads files in BGR channel vs RGB channel like matplotlib. There is a way to convert the channel to RGB.

**Converting BGR to RGB**
```python
fix_img = cv2.cvtColor(IMAGE, cv2.COLOR_BGR2RGB)
```

## Manipulating Images with OpenCV
**Gray-scaling**
```python
img_gray = cv2.imread("FILENAME", cv2.IMREAD_GRAYSCALE)
# Grayscaling removes all other channels 

img_gray.shape
# output = (1300, 1950)
```

**Resizing**
```python
new_img = cv2.resize(fix_img, (1000,400))
```

**Down-scaling**
```python
w_ratio = 0.5
h_ratio = 0.5
# note the strange order of arguments
new_img = cv2.resize(fix_img, (0,0), fix_img, w_ratio, h_ratio)
```

**Flipping Images**
```python
new_img = cv2.flip(fix_img, 0) # flip x axis
new_img = cv2.flip(fix_img, 1) # flip horizontal axis
new_img = cv2.flip(fix_img, -1) # fix both axis
```