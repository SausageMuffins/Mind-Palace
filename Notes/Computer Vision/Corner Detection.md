---
tags: CV
date: 13-05-2023
type: 
 Note
 Complete
summary: Document algorithms to detect corners using OpenCV
---

#### Harris Corner Detection
This is mainly for a sharp corner. The general intuition for this algorithm is to look for drastic changes in all directions for an image.

Details can be found [here](https://docs.opencv.org/3.4/dc/d0d/tutorial_py_features_harris.html).

**Converting elements to floats**: The Harris Corner Detection algorithm requires the elements to be in float form.
```python
# read images
flat_chess = cv2.imread("DATA/flat_chessboard.png")
real_chess = cv2.imread("DATA/real_chessboard.jpg")

flat_chess = cv2.cvtColor(flat_chess, cv2.COLOR_BGR2RGB)
real_chess = cv2.cvtColor(real_chess, cv2.COLOR_BGR2)

# haris corner detection needs floating point values.
gray = np.float32(gray_flat_chess)
gray2 = np.float32(gray_real_chess
```

**OpenCV cornerHarris method:**
```python
# haris corner detection algorithm
dst = cv2.cornerHarris(src=gray, blockSize=2, ksize=3, k=0.04)
dst2 = cv2.cornerHarris(src=gray2, blockSize=2, ksize=3, k=0.06)
# blockSize: size of neighborhood considered for corner detection
# ksize: size of kernel for sobel operators
# k: harris detector free parameter in the equation

# whenever my value in the destination image is greater than 1% of the maximum value in the destination image, I'm going to mark that point in the original image as red.
flat_chess[dst>0.01*dst.max()] = [255, 0, 0] # good detection
real_chess[dst2>0.01*dst2.max()] = [255, 0, 0] # poor detection on real chessboard
```

**Results:**
Flat Chess Board

![[Pasted image 20230513171544.png]]

Real Chess Board:

![[Pasted image 20230513171613.png]]

We can clearly see that the real chess board struggled with detecting corners as there are perspectives/more complicated pieces on the board.

The corners by the edge of the image for the real chess are also not detected - a flaw which we can work around by adding edges to the image.

---

#### Shi-Tomasi Corner Detection
Based on Harris Corner Detection with a slight alteration. The main difference is the selection criteria. This algorithm usually performs better than Harris Corner Detection

**openCV method for Shi-Tomasi Corner Detection:**
```python
# goodFeaturesToTrack(image, maxCorners, qualityLevel, minDistance)
corner = cv2.goodFeaturesToTrack(gray_flat_chess, 40, 0.01, 10)
corner2 = cv2.goodFeaturesToTrack(gray_real_chess, 90, 0.01, 10)
# maxCorners: maximum (best) number of corners to return
# qualityLevel: minimum accepted quality of image corners
# minDistance: minimum possible Euclidean distance between the returned corners
```

| Arguments    | Description                                |
| ------------ | ------------------------------------------ |
| maxCorners   | maximum (best) number of corners to return |
| qualityLevel | minimum accepted quality of image corners  |
|      minDistance        |   minimum possible Euclidean distance between the returned corners|

**Need to Convert to Integers**
```python
corners = np.int0(corner)
corner2 = np.int0(corner2)
```

**Marking corners on actual image**
```python
for i in corners:
    x,y = i.ravel() # ravel() flattens the array
    cv2.circle(flat_chess, (x,y), 3, (255,0,0), -1) # draw a circle on the corner points

for j in corner2:
    x,y = j.ravel()
    cv2.circle(real_chess, (x,y), 3, (255,0,0), -1) # draw a circle on the corner points
```

**Upside:**
- We can choose how many corners (and the best ones) to detect.

**Downside:**
- Does not automatically mark the corners for you.


**Results:**
Flat Chess - Performed well as expected

![[Pasted image 20230513173255.png]]

Real Chess - Performed slightly better than Harris Corner Detection

![[Pasted image 20230513173415.png]]
