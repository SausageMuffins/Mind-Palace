---
tags: 
date:
type: 
 Note
 Incomplete
summary: 
---

#### Main Methods Used
cv2.findContours(image, contours we want, method used)

Image:

![[Pasted image 20230514134227.png]]

```python
img = cv2.imread("DATA/internal_external.png", 0)

plt.imshow(img, cmap="gray")

contour, hierarchy = cv2.findContours(img, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)

# cv2.RETR_CCOMP: extract all internal and external contours and organizes them into a two-level hierarchy.

# cv2.CHAIN_APPROX_SIMPLE: compresses horizontal, vertical, and diagonal segments and leaves only their end points.
```

#### Getting External and Internal Contours
```python
external_contours = np.zeros(img.shape)
internal_contours = np.zeros(img.shape)

for i in range (len(contour)):
    # External Contours
    # look at the last column of each row: -1 = external contour
    if hierarchy[0][i][3] == -1: 
        cv2.drawContours(external_contours, contour, i, 255, -1)
    
    # Internal Contours
    if hierarchy[0][i][3] != -1: 
        cv2.drawContours(internal_contours, contour, i, 255, -1)
        
    # hierarchy organizes internal contours: just change the value of the last element to 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, etc.

plt.imshow(external_contours, cmap="gray") # draw the background
plt.imshow(internal_contours, cmap="gray") # draw the internal contours
```

Internal Contours:

![[Pasted image 20230514134210.png]]

External Contours:

![[Pasted image 20230514134306.png]]