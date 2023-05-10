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
This technique combined with [[Image Processing with OpenCV#Blending|Blending]] will help use to "combine" images. We simply change the elements in the array of image 1 to reflect the elements of image 2. Here, we use a similar (previously learnt) concept of [[Numpy#Matrices|Slicing Matrices]]

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
2. Obtain the [[Image Processing with OpenCV#Masking|Mask]]
3. Merge the Mask and the ROI using a **bitwise_or operator** to obtain the final ROI
5. [[Image Processing with OpenCV#Overlaying|Overlay]] the final ROI onto the original Image.

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

#### Final Results.

**Original:**
![[Pasted image 20230509225449.png]]

![[Pasted image 20230509225505.png]]

**Final Result:**

Notes: the second image "DO NOT COPY" was resized to be 600 by 600 pixels.

![[Pasted image 20230509225354.png]]

## Image Thresholding
An important technique for image segmentation: to make an image/object easier to analyse and process by the machine.

The most straightforward way is to use the threshold method of cv2.
```python
ret, thresh1 = cv2.threshold(img, 160, 255, cv2.THRESH_BINARY)

# cv2.threshold(img, threshold value, max value, method to threshold)
```

However, this is often not sufficient since the quality of the processed image decreases.

Instead we can use the **adaptive threshold** method.
```python
# average values out then make it black and white using THRESH_BINARY.
th2 = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 13, 10) 

# using another method to average out values.
th2 = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 13, 10)
```

We can further improve the quality using the [[Image Processing with OpenCV#Blending Images of Same Size|blending]] technique we learnt. 

Blending the first method of thresholding together with the adaptive thresholding.

```python
blended = cv2.addWeighted(src1=thresh1, src2=th2, beta=0.4, alpha=0.6, gamma=0) # use the technique of blending to get higher quality.
```

#### Final Results
Original Image:
![[Pasted image 20230510122133.png]]

Final Output:
![[Pasted image 20230510122150.png]]

## Blurring and Smoothing
This technique works in conjunction with edge detection algorithm to reduce noise in an image for easier processing.

#### Gamma Correction
Make an image brighter or darker.
```python
# Gamma Correction #
gamma = 3 # gamma value > 1 = darker image, gamma value < 1 = brighter image

result = np.power(img, gamma) # raise each pixel to the power of gamma
```

#### Kernel Filters
**Image Kernels:** a matrix used to apply effects onto an image. 

Main Idea: combine a block of pixels in the original image into 1 using matrix multiplication with weights. An idea similar to [[Image Processing with OpenCV#Blending Images of Different Sizes|blending Images]].

```python
## Convenient Functions ##
def load_img(): # load my images
    img = cv2.imread("DATA//bricks.jpg").astype(np.float32)/255 
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    return img

def display_img(img): # display my images at a larger scale
    fig = plt.figure(figsize=(12,10))
    ax = fig.add_subplot(111)
    ax.imshow(img)

def placingText():
    img = load_img() # load the image
    font = cv2.FONT_HERSHEY_COMPLEX # font type
    cv2.putText(img, text="bricks", org=(10,600), fontFace=font, fontScale=10, color=(255,0,0), thickness=6) # put text on the image
```

#### Techniques
##### Averaging
```python
kernel = np.ones(shape=(5,5), dtype=np.float32)/25 # create a matrix (kernel) to blue image.
destination = cv2.filter2D(img, -1, kernel) # (image, desired depth, kernel) - this method applies the kernel (filter) to the image.
```

##### OpenCV Built-in Blurring Kernel
```python
result = cv2.blur(img, ksize=(10,10)) # cv2's default blurring kernel - makes things convenient
```

##### Gaussian Blur
```python
result = cv2.GaussianBlur(img, ksize=(5,5), sigmaX=30) # (image, kernel size, sigmaX) - sigmaX is the standard deviation in the x direction.
```

##### Median Blur
This technique is also good for smoothing Images.
```python
result = cv2.medianBlur(img, 5) # (image, kernel size)
```

##### Bilateral Filter
```python
blur = cv2.bilateralFilter(img, 9, 75, 75) # default values
```