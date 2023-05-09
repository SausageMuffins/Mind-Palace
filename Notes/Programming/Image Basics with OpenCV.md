---
tags: CV
date: 03-05-2023
type: 
 Note
 Complete
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


## Placing Items On Images
This segment shows us how to put shapes, texts and polygons on an image. This is useful for Computer Vision later on when we try to track objects.
```python
# create blank image
blank_img = np.zeros(shape=(512,512,3), dtype=np.int16)

# drawing a rectangle - pt1 and pt2 are the top left and right corner respectively.
cv2.rectangle(blank_img, (200,200), (300,300), color=(0,255,0), thickness=10)

# drawing a circle
cv2.circle(blank_img, center=(100,100), color=(0,0,255), radius=40, thickness=-1) # thickness = -1 fills the shape.

# drawing a line
cv2.line(blank_img, pt1, pt2, color=(255,0,0), thickness=10)

# drawing a polygon
vertices = np.array([ [50,300], [100,200], [400,350], [200,400]], dtype=np.int32) # establishing vertices
vertices.reshape((-1,1,2)) # reshape to fit the colour channels (this must be done to make the vertices acceptable for cv2)

cv2.polylines(blank_img, [vertices], isClosed=True, color=(255,255,255), thickness = 10)


# writing text on the image.
font = cv2.FONT_HERSHEY_SIMPLEX # assign a font
cv2.putText(blank_img, text="Texted!", org=(10,500), fontFace = font, fontScale = 4, color=(255,255,255), thickness=10)

plt.imshow(blank_img)
```
Output:

![[Pasted image 20230506183348.png]]


## Drawing on Images

#### Clicking to Add Shapes
Use Case: We want to draw a circle or any shape on an image when we click on it.

**Important Methods**:
- cv2.namedWindow: This creates the window for the image
- cv2.setMouseCallback: This listens for an input from the mouse (eg: mouse click)

Note: the two aforementioned method must have matching window names!

```python
# Function to take in the mouse's input/parameters.
# all the arguments are filled in using the setMouseCallback method.
# event is what the mouse did.
# x and y are the coordinates.

def draw_circle(event, x, y, flags, param): 
	# LEFT CLICK EVENT
    if event == cv2.EVENT_LBUTTONDOWN:
        cv2.circle(img, (x,y), radius=50, color=(255,255,255), thickness=-1) # draw a circle on the img at location x, y.

	# RIGHT CLICK EVENT
    elif event == cv2.EVENT_RBUTTONDOWN: 
        cv2.circle(img, (x,y), radius=50, color=(0,0,255), thickness=-1) # draw a red circle on the img at location x, y.
        
cv2.namedWindow(winname="Drawing") # create a window to display.
cv2.setMouseCallback("Drawing", draw_circle) # listen for mouse input.


# Showing Image with OpenCV 
img = np.zeros(shape=(512,512,3), dtype = np.int8)  # Create a blank image.
while True:
    cv2.imshow("Drawing", img)
    
    if cv2.waitKey(20) & 0xFF==27: # listen for esc key press.
        break # Exit image.
    
cv2.destroyAllWindows()
```