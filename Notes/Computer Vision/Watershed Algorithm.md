---
tags: CV
date: 14-05-2023
type: 
 Note
 Complete
summary: Document what the algorithm does and its use cases.
---

## Use Cases
- Segment different objects in the foreground of an image so that the computer does not see the objects as one big object.

## General Intuition
Transforms images like a topological map.

Brightness of an image (close to 255) is a "peak" whereas the darkness (close to 0) is a "valley". The algorithm labels each "valley" or local minima with different labels (like water flowing down a ridge).

When the labels (water) start to meet each other, they start to merge just like real water. **To avoid this,** the algorithm creates "barriers" to segment the edge boundaries.

## Using OpenCV

The general steps to follow:
1. Prepare Image by blurring and grey scaling
2. Threshold image with Otsu's method
3. Distance Transform the image to obtain sure foreground
4. Establish unknown region
5. Establish markers
6. Apply Watershed method from openCV.
7. Draw Contours to show foreground.

```python
###### Watershed Algorithm ######
image = cv2.imread("DATA/pennies.jpg")

# 1. Prepare Image - blur and gray scale
image = cv2.medianBlur(image, 35) # blur image
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) # convert to gray scale

# 2. Threshold - inverse binary threshold and otsu's method *otsu's method works very well with the watershed algorithm
ret, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV+cv2.THRESH_OTSU) # foreground becomes white and background becomes black

# Noise Removal - morphological opening (can be optional for simple images)
# kernel = np.ones((3,3), np.uint8) # create a kernel
# opening = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel, iterations=2) # apply the kernel to the image

# 3. Distance Transform - the further away the pixels are from the background, the brighter they are - to detect the confirm foreground
dist_transform = cv2.distanceTransform(thresh, cv2.DIST_L2, 5) # 5 is the size of the kernel
display(dist_transform)

# Threshold - to obtain the cfm foreground
ret, cfm_fg = cv2.threshold(dist_transform, 0.7*dist_transform.max(), 255, 0) # foreground becomes white and background becomes black

# 4. Unknown Region - the pixels that we are not sure if they are foreground or background
cfm_fg = np.uint8(cfm_fg) # convert to uint8
unknown = cv2.subtract(thresh, cfm_fg) # subtract the foreground from the threshold image

# 5. Marker Labelling - label the background and foreground
ret, markers = cv2.connectedComponents(cfm_fg) # label the foreground
markers = markers + 1 # add 1 to the background - make the sure background 1, not 0 so that we can mark the unknown region as 0
markers[unknown==255] = 0 # mark the unknown region as 0

# 6. Watershed Algorithm
markers = cv2.watershed(image, markers) # apply the watershed algorithm

# 7. Find Contours
contours, hierarchy = cv2.findContours(markers.copy(), cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)

for i in range(len(contours)):
    if hierarchy[0][i][3] == -1: # last element of the hierarchy array is the external contour
        cv2.drawContours(sep_coins, contours, i, (255, 0, 0), 10) # draw the external contour

```

#### Results of different stages:

**Blurring and Grey Scaling**

![[Pasted image 20230517122034.png]]

**Thresholding using Binary Inverse and Otsu's method**

![[Pasted image 20230517122056.png]]

**Distance Transforming**

![[Pasted image 20230517122110.png]]

**Establishing the confirmed foreground**

![[Pasted image 20230517122136.png]]

**Establishing the unknown areas**

![[Pasted image 20230517122151.png]]

**Establishing Markers**

![[Pasted image 20230517122247.png]]

Watershed Algorithm and drawing the contours

![[Pasted image 20230517122310.png]]

---
## Custom Seeding Watershed Algorithm