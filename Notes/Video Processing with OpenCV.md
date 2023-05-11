---
tags: CV
date: 11-05-2023
type: 
 Note
 Incomplete
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