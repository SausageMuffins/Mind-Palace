---
tags: CV
date: 13-05-2023
type: 
 Note
 Complete
summary: Experimenting with different methods to match two images.
---

#### Main Idea
The main idea is to use the six built in comparison methods by openCV to look for a match in the two images.

#### Methods
```python
Methods = ["cv2.TM_CCOEFF", "cv2.TM_CCOEFF_NORMED", "cv2.TM_CCORR", "cv2.TM_CCORR_NORMED", "cv2.TM_SQDIFF", "cv2.TM_SQDIFF_NORMED"]
```

We can make use of python's built in method called **eval** to evaluate a string as a method. This is very useful to go through every method and see which method works the best in identifying images.

#### Drawing Rectangles on Matching Images

It will be the best to loop through every method in Methods for the following code.

****
```python
for m in Methods:
    # Create a copy of the image
    full_copy = full.copy()
    
    # Get the method
    method = eval(m)
        
    # Template Matching
    res = cv2.matchTemplate(full_copy, face, method) # result
    # obtain points to draw a rectangle on the face.
    min_value, max_value, min_loc, max_loc = cv2.minMaxLoc(res)
    
    # Obtain Top Left Point of Rectangle
    # Account for the two sqdiff methods - flipped max/min
    if method in [cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED]:
        top_left = min_loc
    else:
        top_left = max_loc
        
    # Obtain Bottom Right Point of Rectangle
    # get the height and width of the face image
    height, width, channels = face.shape 
    bottom_right = (top_left[0] + width, top_left[1] + height)
    
    # draw the rectangle
    cv2.rectangle(full_copy, top_left, bottom_right, (0,0,255), thickness=10)
        
    # Plot and show the images
    plt.subplot(121) # 1 row, 2 columns, 1st subplot
    plt.imshow(res) # plot the heat map
    
    plt.subplot(122) # 1 row, 2 columns, 2nd subplot
    plt.imshow(full_copy) # plot the image with the rectangle
    plt.title("TEMPLATE DETECTION")
    plt.suptitle(m) # title using the method name.
    
    plt.show() # show all the plots.
    print("\n")
    print("\n")
```

**Results:**
![[Pasted image 20230513152046.png]]
![[Pasted image 20230513152050.png]]
![[Pasted image 20230513152059.png]]
![[Pasted image 20230513152107.png]]
![[Pasted image 20230513152111.png]]
![[Pasted image 20230513152115.png]]

## Conclusion

We can see that not all methods work as well or as expected. For Object Detection in template matching, it is best that we see can compare all methods!