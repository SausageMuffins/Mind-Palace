---
tags: CV
date: 13-05-2023
type: 
 Note
 Complete
summary: Detect Edges using Canny Edge Algorithm with OpenCV
---

#### Ways to Improve Edges
1. Smooth Image to reduce noise (blurring) - [[Image Processing with OpenCV#Gaussian Blur|Gaussian Filters]]
2. Find [[Image Processing with OpenCV#Image Gradients|Intensity Gradients]].
3. Apply non-maximum Image Suppression - reduce fake edges
4. Apply double [[Image Processing with OpenCV#Image Thresholding|threshold]] for potential edges.
5. Track edges by hysteresis - filter out weak edges

It is also a good idea to blur high resolution images first before using Canny's algorithm if we want general edges.

Example code:
```python
img = cv2.imread("DATA/sammy_face.jpg") # read image

# Edge Detection

# Median pixel value and Formuls for threshold values.
med = np.median(img)
lower = int(max(0, 0.7*med)) # lower threshold
upper = int(min(255, 1.3*med)) # upper threshold

# Blurring Image
blurred_img = cv2.blur(img, ksize=(5,5)) # ksize = kernel size

# Canny Edge Detection
edges = cv2.Canny(image=blurred_img, threshold1=lower, threshold2=upper+50) 
```

There are no fixed ways to determine