---
tags: CV
date: 11-05-2023
type: 
 Note
 Complete
summary: Introduction to the video processing using OpenCV
---

## Accessing Cameras
Main Idea: Have an object to capture the video (cap) which can capture frame by frame.

**Key Methods:**
- cv2.VideoCapture - obtain the frame (image)
- cv2.VideoWriter - record the frames

```python
import cv2
cap = cv2.VideoCapture(0) # Using default camera/webcam to capture video feed.

width = cap.get(cv2.CAP_PROP_FRAME_WIDTH) # Width of the frames in the video feed
height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT) # Height of the frames in the video feed

# note that width and height are floats, so convert them to ints.
width = int(width)
height = int(height)

# write the video to a file
# cv2.VideoWriter("filename", codec, fps, (width, height))

writer = cv2.VideoWriter("TestVideo.mp4", cv2.VideoWriter_fourcc(*"DIVX"), 20, (width, height))
# cv2.VideoWriter_fourcc(*"DIVX") is the codec used to encode the video - DIVX is popular for windows.
# use "XVID" for linux and mac.

# display image #
while(True):
    ret, frame = cap.read() # read the frame from the video feed
    # gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY) # convert the frame to grayscale
    
    writer.write(frame) # write the frame to the video file
    
    cv2.imshow("frame", frame) # display the grayscale frame
    
    if cv2.waitKey(1) & 0xFF==ord("q"): # list for q press.
        break

cap.release() # release the video feed
writer.release() # release the video writer
cv2.destroyAllWindows() # destroy all windows
```

Remember to release all video capture or video writers! After that, destroy all windows.

## Reading a Video

**key methods:**
- cv2.VideoCapture("FILE NAME/LOCATION")
- cap.isOpened() - tell us if the video can be played.
- time.sleep() - slow down the video to be played at a human speed.

```python
import cv2
import time # import python built in time to slow the video down.

cap = cv2.VideoCapture("TestVideo.mp4") # read the video file

if cap.isOpened() == False: # check if the file can be found.
    print("Error opening the video file.")
    
while cap.isOpened(): # while the video is playing
    ret, frame = cap.read() # read the frame
    
    if ret == True: # the video is still playing
        
        # WRITER AT 30 FPS
        time.sleep(1/30) # sleep for 1/20th of a second to simulate 20fps. -- 1/fps
        
        cv2.imshow("frame", frame) # display the frame
        
        if cv2.waitKey(1) & 0xFF == ord("q"): # listen for q press to exit
            break
    
    else: # no more frames - end of video
        break

cap.release()
cv2.destroyAllWindows()
```

---

## Drawing on Videos
In this section, we build on our previously learnt concepts of [[Image Basics with OpenCV#Drawing on Images|Drawing Shapes]] on images. For a video, we can treat a single frame as an image.

General Algorithm:
1. Declare global variables (to be used for drawing shapes in real time)
2. Define function to draw shape
3. Connect to callbacks (use case: mouse)
4. Display Live Capture

Global Variables
```python
import cv2
import time

# Global Variables
pt1 = (0, 0)
pt2 = (0, 0)
top_left_clicked = False # indicate if the top left corner of the rectangle has been clicked
bottom_right_clicked = False # indicate if the bottom right corner of the rectangle has been clicked
```

Rectangle Function
```python
# Drawing Rectangle Function
def draw_rectangle(event, x, y, flags, param):
    global pt1, pt2, top_left_clicked, bottom_right_clicked
    
    if event == cv2.EVENT_LBUTTONDOWN: # if left mouse button is clicked
        if top_left_clicked and bottom_right_clicked: # rectangle has been drawn
            # reset
            pt1 = (0, 0)
            pt2 = (0, 0)
            top_left_clicked = False 
            bottom_right_clicked = False
        # first point (top left)
        if not top_left_clicked:
            pt1 = (x, y)
            top_left_clicked = True
        # second point (bottom right)
        elif not bottom_right_clicked:
            pt2 = (x, y)
            bottom_right_clicked = True

```

Connect to callback
```python
# Connect to the callback
cap = cv2.VideoCapture("TestVideo.mp4") # read the video file
# cap = cv2.VideoCapture(0) # Using default camera/webcam to capture video feed.
cv2.namedWindow("Test") # create a window
cv2.setMouseCallback("Test", draw_rectangle) # connect to the mouse inputs.

if cap.isOpened() == False: # check if the file can be found.
    print("Error Opening File")
```

Real Time Video Capture
```python
# Real Time Drawing
while True:
    ret, frame = cap.read()
    
    if ret == False: # check if there is a frame to read
        break
    
    # Check if can draw rectangle
    if top_left_clicked == True:
        cv2.circle(frame, center=pt1, radius=3, color=(0,0,244), thickness=-1) # visual marker for top left corner of rectangle
    
    if top_left_clicked and bottom_right_clicked: # if both corners have been clicked
        cv2.rectangle(frame, pt1, pt2, (0, 0, 255), thickness=5) # draw the rectangle
    
    time.sleep(1/30) # slow down the frames
    cv2.imshow("Test", frame)
    
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release() # remember to release capture
cv2.destroyAllWindows()
```