---
tags: Programming 
date: 03-05-2023
type: 
 Note
 Complete
summary: Contains all information about Numpy Arrays in Python
---

## Python Basics
#### Generating Arrays
```python
np.arange(0,10,2) # similar to the range keyword. (inclusive, exclusive, step)
# Returns a new numpy array.

np.zeros(shape=(5,5)) # create floats for elements by default, shape=(row,col) - returns a matrix of (5,5) with elements zeros.

np.ones(shape=(2,4)) 
```

##### Random Arrays
```python
np.random.seed(101) # set a random seed

arr = np.random.randint(0,100,10) # generate random integer array (inclusive, exclusive, number of elements)

arr2 = np.random.randint(0, 100, 10) # generate more random numbers.
```

#### Statistics of Arrays
```python
print(arr.max()) # get max value of a np array
print(arr.argmax()) # get index of max value in np array)

print(arr.min()) # get min value of a np array
print(arr.argmin()) # get index of min value in

print(arr.mean()) # get mean value of a np array
```

#### Reshaping Arrays
```python
arr.reshape((2,5)) # reshape array - make sure the number of elements match
```

#### Matrices
```python
mat = np.arange(0,100).reshape(10,10)

mat[row,col] # obtain an element in a 2D array (matrix)

mat[:,1] # obtain every value in every row but only in column 1

mat[:,1].reshape(1,10) # change to a row
mat[:,1].reshape(10,1) # change to a column

# Slicing Matrices
mat[0:3, 0:4] # get rows from 0 to 3 exclusive, get columns from 0 to 4 exclusive

# Copying Matrices
mynewmat = mat.copy() # np copy method is a deep copy.

mynewmat[0:6,:] = 999 # convert row 0 to 6 exclusive and all the columns in these rows to 999
```

---

## Images and Numpy
In general, images are just matrices, each pixel as an element in a matrix.

```py
# example of a 720x1280 pixel colored image.
array = np.zeros(shape=(720,1280, 3)) # 3 color channel
```

**Import the following libraries to see the images!**
```py
# Important Imports! #
import matplotlib.pyplot as plt
from PIL import Image
```


#### Color Images
A color will have a combination of Red, Green and Blue. Each color have various intensities of R,G,B ranging from 0 to 255.

Referencing an image in python:
```python
# Getting a reference to the image.
pic = Image.open("C:\\Users\\nryan\\OneDrive\\Desktop\\00-puppy.jpg")

pic # display the image.

type(pic) 
# This is still an object of type PIL.JpegImagePlugin.JpegImageFile
```

#### Converting Images to Numpy
```python
# converting to numpy array
pic_arr = np.asanyarray(pic)

print(pic_arr.shape) # resolution of image and the three colour channels
# output: (1300, 1950, 3) 

# Showing Images
plt.imshow(pic_arr) # argument for imshow must be a numpy array.
```

![[Pasted image 20230505185105.png]]

#### Grayscale Images
Every element in the matrix can contain a value from 0 to 1. (normalized by dividing 255)

Grayscaling images in python:
```python
# make a copy to get only the red channel.
copied_red = pic_arr.copy() 
# changing the colour mapping of matplotlib to grayscale image.
plt.imshow(copied_red, cmap="gray") 
```

![[Pasted image 20230505185012.png]]

#### Altering Color Channels
```python
copied_picture = pic_arr.copy() # numpy deep copy
copied_picture[:,:,1] = 0 # set green channel to 0
copied_picture[:,:,2] = 0 # set blue channel to 0

plt.imshow(copied_picture) # only have values in red channel.
```

![[Pasted image 20230505184957.png]]
