---
tags: Programming 
date: 03-05-2023
type: 
 Note
 Incomplete
summary: Contains all information about Numpy Arrays in Python
---

## Initializing Arrays From Scratch
#### NP zeros and ones


## Handling Images
In general, images are just matrices, each pixel in an element in that matrix.

Numpy arrays can handle image resolution with shape.

```py
# example of a 720x1280 pixel colored image.
array = np.zeros(shape=(720,1280, 3)) # 3 color channel
```

#### Greyscale Images
Every element in the matrix contains a value from 0 to 1. (normalized by dividing 255)

0: White
1: Black

#### Colour Images
A colour will have a combination of Red, Green and Blue.

Each colour have various intensities of R,G,B ranging from 0 to 255.



