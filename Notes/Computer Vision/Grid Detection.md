---
tags: CV
date: 14-05-2023
type: 
 Note
 Complete
summary: Detecting Grids using OpenCV
---

#### Chessboard Grid
When we expect the grids to look something like a chess board.

We can use two methods:
1. **cv2.findChessBoardCorners(img, gridSize)** - should return a boolean and array.
2. **cv2.drawChessBoardCorners(img, gridSize, corners, found)**

```python
found, corners = cv2.findChessboardCorners(flat_chess, (7,7)) # (7,7) is the size of the grid.

# RETURN VALUES
# found: boolean value of whether a corner was found or not.
# corners: array of corners

cv2.drawChessboardCorners(flat_chess, (7,7), corners, found)
plt.imshow(flat_chess) # all the corners will be connected.
```

![[Pasted image 20230514131805.png]]

---

#### Dots Grid
When we expect a grid of dots. Very similar to the chessboard grid.

We also use the same draw chessboard function to draw on the image.

```python
found, corners = cv2.findCirclesGrid(dots, (10,10), cv2.CALIB_CB_SYMMETRIC_GRID)

cv2.drawChessboardCorners(dots, (10,10), corners, found)
plt.imshow(dots)
```

![[Pasted image 20230514131730.png]]

---

#### Use Cases
- Camera calibrations
- Extension of knowledge to finding corners.