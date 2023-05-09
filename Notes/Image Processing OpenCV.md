---
tags: CV
date: 09-05-2023
type: 
 Note
 Incomplete
summary: Introduction to the image processing using OpenCV
---


## Colour Mapping
Human vision is closer to HSL and HSV colour spaces (an alternative model to represent colours). See image below from [wikipedia](https://en.wikipedia.org/wiki/HSL_and_HSV).

![[Hsl-hsv_models.svg.png]]

```python
# using cvtColor to convert to HSL or HSV color space.
img = cv2.imread("DATA//00-puppy.jpg")

# Converting to HSV
img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# Converting to HLS
img = cv2.cvtColor(img, cv2.COLOR_BGR2HLS)
```

## Manipulating Multiple Images

#### Overlaying
This technique combined with [[Image Processing OpenCV#Blending|Blending]] will help use to "combine" images. We simply change the elements in the array of image 1 to reflect the elements of image 2. Here, we use a similar (previously learnt) concept of [[Numpy#Matrices|Slicing Matrices]]

```python
largeImage = img
smallImage = cv2.resize(img2, (600,600))

x_offset = 0
y_offset = 0

x_end = x_offset+smallImage.shape[1] # numpy thinks that the vertical axis as the x axis.
y_end = y_offset+smallImage.shape[0] # the horizontal axis is the y axis.

largeImage[y_offset:y_end, x_offset:x_end] = smallImage # laying the small image on top of the larger image - "replacing the pixels in the numpy array"
```

#### Masking
This concept is very important for [[#Blending Images of Same Size]]. This block serves as a stepping point before we learn about blending images.

Main Idea: 
1. Create the mask by [[Numpy#Grayscale Images|grayscaling]] the image.
2. Inverse the colour of the mask.
3. Combine it with two white backgrounds using **bitwise_or operator** to obtain the inverse mask with 3 colour channels.
4. Apply colour of original image to the mask

```python
# Creating a Mask
mask = cv2.cvtColor(img2, cv2.COLOR_RGB2GRAY)
mask_inv = cv2.bitwise_not(mask) # inverse colors
# plt.imshow(mask_inv, cmap="gray")

# cv2 will remove all other color channels - this means we need to add them back to make it compatible with other functions!

# Convert Mask to have 3 channels
white_background = np.full(img2.shape, 255, dtype=np.uint8) # create a white background with the same size of shape of the mask.

# converting inverse mask to have 3 color channels
background = cv2.bitwise_or(white_background, white_background, mask=mask_inv) 
#plt.imshow(background)

# apply the color of the original to the mask
foreground = cv2.bitwise_or(img2, img2, mask=mask_inv)
#plt.imshow(foreground)
```

#### Blending Images of Same Size
Open CV allows us to combine images together using a weighted formula.

$$Pixel = \alpha*SRC1 + \beta* SRC2 + \gamma$$

**Drawback:** Both images must be the same size!

```python
# make both images same size
img1 = cv2.resize(img, (1200,1200))
img2 = cv2.resize(img2, (1200,1200))

blended = cv2.addWeighted(src1=img, alpha=1, src2=img2, beta=0.1, gamma=0) 
# alpha, beta and gamma are constants <1 that computes the value of the new pixel for the new image.
# new_pixel = alpha* pixel from source1) + beta*(pixel from source2) + gamma
```

#### Blending Images of Different Sizes
Hence, we have to utilize both the concepts of Overlaying and Masking to blend both images.

General Algorithm:
1. Establish the Region of Interest
2. Obtain the [[Image Processing OpenCV#Masking|Mask]]
3. Merge the Mask and the ROI using a **bitwise_or operator** to obtain the final ROI
5. [[Image Processing OpenCV#Overlaying|Overlay]] the final ROI onto the original Image.

```python
# Region of Interest (ROI) (Bottom right corner)
x_offset = img1.shape[1] - img2.shape[1]
y_offset = img1.shape[0] - img2.shape[0] 

roi = img1[y_offset:img1.shape[0], x_offset:img1.shape[1]]

# Creating a Mask
mask = cv2.cvtColor(img2, cv2.COLOR_RGB2GRAY)
mask_inv = cv2.bitwise_not(mask) # inverse colors
# plt.imshow(mask_inv, cmap="gray")

# cv2 will remove all other color channels - this means we need to add them back to make it compatible with other functions!

# Convert Mask to have 3 channels
white_background = np.full(img2.shape, 255, dtype=np.uint8) # create a white background with the same size of shape of the mask.

# converting inverse mask to have 3 color channels
background = cv2.bitwise_or(white_background, white_background, mask=mask_inv) 
#plt.imshow(background)

# apply the color of the original to the mask
foreground = cv2.bitwise_or(img2, img2, mask=mask_inv)
#plt.imshow(foreground)

final_roi = cv2.bitwise_or(roi, foreground) # merge both the foreground and the roi
#plt.imshow(final_roi)

img1[y_offset:y_offset+roi.shape[0], x_offset:x_offset+roi.shape[1]] = final_roi
plt.imshow(img1)
```

## Final Results.

**Original:**
![[Pasted image 20230509225449.png]]
![[Pasted image 20230509225505.png]]

**Final Result:**

Notes: the second image "DO NOT COPY" was resized to be 600 by 600 pixels.

![[Pasted image 20230509225354.png]]