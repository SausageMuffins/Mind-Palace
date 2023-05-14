---
tags: CV
date: 14-05-2023
type: 
 Note
 Complete
summary: Real World Applications using OpenCV - matching features
---

## Overview
There will be three main methods to match features between images.

1. Brute-Force Matching with ORB Descriptors
2. Brute-Force Matching with SIFT Descriptors and Ratio Test
3. FLANN based Matcher

---
## Brute Force Methods

#### **Simple BFMatcher**
This method usually does not work very well. **It is recommended to use the other two methods below.**

```python
# keypoint detector - uses Harry Corner measure
orb = cv2.ORB_create()

kp1, des1 = orb.detectAndCompute(cereal, None) # None is mask
kp2, des2 = orb.detectAndCompute(many_cereal, None)

# brute force matching
bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True) 
matches = bf.match(des1, des2) # match descriptors

# each element in matches is a DMatch object
# the likely the match, the smaller the distance
# hence, so we sort by distance

matches = sorted(matches, key=lambda x: x.distance) # sort matches by distance

# draw the first 25 matches - provide keypoints and matches
cereal_matches = cv2.drawMatches(cereal, kp1, many_cereal, kp2, matches[:25], None, flags=2)

display(cereal_matches) # we can observe that brute force is not 
```

Result:
![[Pasted image 20230514151715.png]]

#### **Using K Nearest Neighbors**
This method is also a brute force method but it can have a much higher accuracy than the simple brute force. We also use a ratio test to find good matches.

```python
sift = cv2.xfeatures2d.SIFT_create() # create a SIFT object

# keypoint and descriptors
kp1, des1 = sift.detectAndCompute(cereal, None)
kp2, des2 = sift.detectAndCompute(many_cereal, None)

bf = cv2.BFMatcher() # brute force

matches = bf.knnMatch(des1, des2, k=2) # 2 nearest neighbours.

# knnMatch takes in two descriptors and returns a list of matches

# matches is a list of lists where each sublist contains two DMatch objects.

# the key idea is to compare the distance of the first DMatch object with the second - the closer the better the match.

good_matches = []

for match1, match2 in matches:
    # ratio test - for similar distances.
    if match1.distance < 0.75 * match2.distance: # similar descriptors.
        good_matches.append([match1])

sift_matches = cv2.drawMatchesKnn(cereal, kp1, many_cereal, kp2, good_matches, None, flags=2) # flags = 0 to see single points.

display(sift_matches)
```

Results:
![[Pasted image 20230514151911.png]]

We can see that it is much better as more points are matching to a Reese's Puffs cereal on the grocery shelf.

---

## Flann Method

This is not a brute force method and it is faster than the brute force methods. The tradeoff is less accuracy (which we can overcome by tweaking the methods/arguments used)

```python
# create a SIFT object - same as the bfm using knnMatch. (k nearest neighbors)
sift = cv2.xfeatures2d.SIFT_create()

# keypoint and descriptors
kp1, des1 = sift.detectAndCompute(cereal, None)
kp2, des2 = sift.detectAndCompute(many_cereal, None)

# FLANN
FLANN_INDEX_KDTREE = 0
index_params = dict(algorithm=FLANN_INDEX_KDTREE, trees=5) # trees is the number of trees to use in the algorithm

search_params = dict(checks=50) # number of times the trees in the index should be recursively traversed

# using flann matcher instead of bfmatcher.
flann = cv2.FlannBasedMatcher(index_params, search_params) 
matches = flann.knnMatch(des1, des2, k=2) # 2 nearest neighbours

# create a mask - turn the first element to 1 if we have a good match
matchesMask = [[0, 0] for i in range(len(matches))] 
# this maske also helps us to display later on.


for i, (match1, match2) in enumerate(matches):
    # ratio test - for similar distances.
    if match1.distance < 0.75 * match2.distance: # similar descriptors.
        matchesMask[i] = [1, 0] # a good match - show

# drawing parameters to alter how we show the matches
draw_params = dict(matchColor=(0, 255, 0), singlePointColor = (255,0,0), matchesMask = matchesMask)

# green for good matches
# red for single points

# drawing matches
flann_matches = cv2.drawMatchesKnn(cereal, kp1, many_cereal, kp2, matches, None, **draw_params)

display(flann_matches)
```

#### Optional
This section is purely to visualize the matches and the single points better.

Drawing Parameters:
```python
draw_params = dict(matchColor=(0, 255, 0), singlePointColor = (255,0,0), matchesMask = matchesMask)

flann_matches = cv2.drawMatchesKnn(cereal, kp1, many_cereal, kp2, matches, None, **draw_params)
```

**Result:**
![[Pasted image 20230514152540.png]]

In this case, the Flann method's accuracy seems to be roughly the same as the brute force k nearest neighbor method. This may not always be the case though.