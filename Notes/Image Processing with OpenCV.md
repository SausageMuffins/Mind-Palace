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

---

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

#### Techniques for Blurring
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

---

## Morphing Images
We can use cv2 Morphological Operators to help us further process images.

For comparison, the original image can be found just below this line.
![[Pasted image 20230510153809.png]]


#### Erosion and Dilation
We can add (dilation) or remove (erosion) some of the foreground). This technique is useful for [[Image Processing with OpenCV#Morphological Gradient|Morphological Gradient]] which can then be used for edge detections.

```python
## Erosion and Dilation ## - removing/adding some foreground.
kernel = np.ones(shape=(5,5), dtype=np.uint8) # create a 5x5 matrix of ones
img = load_img() # loading the image.
result = cv2.erode(img, kernel, iterations=3) # erode away the foreground text
result2 = cv2.dilate(img, kernel, iterations=3) # dilate the foreground text
```

**Erosion Result**

![[Pasted image 20230510153642.png]]

**Dilation Result**

![[Pasted image 20230510153708.png]]


#### Opening and Closing
We can also remove noise from the background (opening) and the foreground (closing).

```python
## Opening ## 
# removing background noise.
img = load_img()
white_noise = np.random.randint(low=0, high=2, size=(600,600)) # create a random array of 0s and 1s

# Adding noise to the image.
white_noise = white_noise * 255 # make the array of 0s and 1s into an array of 0s and 255s
noise_img = white_noise + img # add the noise to the image

result1 = cv2.morphologyEx(noise_img, cv2.MORPH_OPEN, kernel) # remove the noise from the background of the image

## Closing ##
# removing foreground noise.
img = load_img()
black_noise = np.random.randint(low=0, high=2, size=(600,600)) # create a random array of 0s and 1s
black_noise *= -255 # make the array of 0s and 1s into an array of 0s and -255s 

# Adding Noise to the image.
black_noise_img = img + black_noise # add the noise to the image - when we add -255 to 255, it becomes 0.
black_noise_img[black_noise_img == -255] = 0 # make all -255 values become 0 because 0 should be the lowest value in the image. 

result2 = cv2.morphologyEx(black_noise_img, cv2.MORPH_CLOSE, kernel) # remove the noise from the foreground of the image
```

**Before and After for Opening**

![[Pasted image 20230510153523.png]]
![[Pasted image 20230510153529.png]]

**Before and After for Closing**

![[Pasted image 20230510153438.png]]
![[Pasted image 20230510153444.png]]

#### Morphological Gradient
The main idea of this technique is to obtain the difference between erosion and dilation of the foreground. In doing so, we can obtain the edge of the foreground.

```python
img = load_img()

gradient = cv2.morphologyEx(img, cv2.MORPH_GRADIENT, kernel) # shows the difference between the erosion and dilation of the image.
```

![[Pasted image 20230510153319.png]]


---

## Image Gradients
Gradients in images are the varying intensities of colours (eg: black and white). This technique is another important method for edge detections.

#### Sobel-Feldman Operators
The operators utilizes the previously learnt concept of [[Image Processing with OpenCV#Kernel Filters|Kernels]] to calculate/approximate change (or in other words, derivatives). We can calculate the derivatives for both the horizontal and vertical components of an image. [Math Details](https://en.wikipedia.org/wiki/Image_gradient#Mathematics)

```python
x = cv2.Sobel(img, cv2.CV_64F, 1, 0, ksize=5) # (image, desired depth, dx, dy, kernelsize) - desired depth is how precise the image is (64 bit float).

y = cv2.Sobel(img, cv2.CV_64F, 0, 1, ksize=5) # (image, desired depth, dx, dy, kernelsize) - desired depth is how precise the image is (64 bit float).
```

**Result for x:**
![[Pasted image 20230510155912.png]]

**Result for y:**
![[Pasted image 20230510155923.png]]

#### Seeing Clearer Gradients

##### [[Image Processing with OpenCV#Blending Images of Same Size|Blending]] Images

```python
blended = cv2.addWeighted(src1=x, alpha=0.5, src2=y, beta=0.5, gamma=0)
```

![[Pasted image 20230510160028.png]]


##### Laplace Operators instead of Sobel Operators
However, these operators make it harder to see the image in general.

```python
result = cv2.Laplacian(img, cv2.CV_64F) # (image, desired depth)
```

![[Pasted image 20230510160143.png]]

##### Previously Learnt Methods
1. [[Image Processing with OpenCV#Image Thresholding|Thresholding]]
2. [[Image Processing with OpenCV#Morphing Images|Morphing]]

## Colour Histograms

We can obtain the histogram for each colour channel of an image. For reference, the original image is this:

**x-axis: colour values 0-255**
**y-axis: frequency (depends on resolution of image)*

![[Pasted image 20230511170211.png]]

**We use cv2.calcHist method to calculate the histograms.**

```python
# 0 is blue channel - opencv is in bgr format
hist_bricks = cv2.calcHist([blue_bricks], channels=[0], mask=None, histSize=[256], ranges=[0,256]) 

# Displaying all channels

color = ('b', 'g', 'r') # tuple of colors

for i,col in enumerate(color): # ploting all the colors for blue bricks
    hist_bricks_all_colors = cv2.calcHist([blue_bricks], channels=[i], mask=None, histSize=[256], ranges=[0,256]) # emumerate gives us the index of the color.
    plt.plot(hist_bricks_all_colors, color=col)
    plt.xlim([0,256]) # set the x axis limit to 0 to 255
    
plt.title("Blue Bricks")
```

**Result:**

Blue Channel

![[Pasted image 20230511170040.png]]

All Colour Channels

![[Pasted image 20230511170120.png]]


We can also apply the same concept to masks:

```python
img = rainbow 

# Creating a Mask
mask = np.zeros(img.shape[:2], dtype=np.uint8)
mask[200:300, 200:300] = 255 # white rectangle

# Masking the rainbow
masked_img = cv2.bitwise_and(img, img, mask=mask)

# for visualization only
show_masked_img = cv2.bitwise_and(show_rainbow, show_rainbow, mask=mask) 


hist_mask_values_red = cv2.calcHist([masked_img], channels=[1], mask=mask, histSize=[256], ranges=[0,256]) # histogram for the green channel of the mask.

plt.plot(hist_mask_values_red)
plt.title("Histogram for Masked Rainbow Image")
```

![[Pasted image 20230511170808.png]]

![[Pasted image 20230511170732.png]]

#### Histogram Equalization

This part is very important for increasing the contrast of an image.

Original Image:

![[Pasted image 20230511171030.png]]

Equalizing Grayscale Images:

```python
equalized = cv2.equalizeHist(gorilla)

hist_gorilla_equalized = cv2.calcHist([equalized], channels=[0], mask=None, histSize=[256], ranges=[0,256])
```

Result:
![[Pasted image 20230511171343.png]]
![[Pasted image 20230511171349.png]]

Equalizing Coloured Images:

We have to apply the concept of [[Image Processing with OpenCV#Colour Mapping|Color Mapping]] to HSV channel here to increase the contrast.

```python
# convert BGR to HSV
hsv = cv2.cvtColor(color_gorilla, cv2.COLOR_BGR2HSV)
# equalize the histogram of the value channel
hsv[:,:,2] = cv2.equalizeHist(hsv[:,:,2])
# convert back to RGB
equalized_color_gorilla = cv2.cvtColor(hsv, cv2.COLOR_HSV2RGB)
```

**Result:**
![[Pasted image 20230511171652.png]]