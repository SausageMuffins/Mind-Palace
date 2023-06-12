---
tags: ML
date: 08-06-2023
type: 
 Note
 Complete
summary: 
---

## Overview

K-Means Clustering is a type of unsupervised learning in ML. The main idea here is that we are quite literally clustering data and repositioning our cluster such that it's the best fit for the data set.

The "means" in the K-means refers to averaging the data; that is, finding the centroid.

*How is this related to our understanding of machine learning?* 

Often, data doesn't come with a label/actual output. Identifying patterns is a crucial skill that humans can do and clustering can help a computer to do that too!

**Key Terms**:

1. **Clusters**: Groups of similar data points.
2. **Centroids**: Centroid is the center of the cluster. Every data point can be allocated to each of the clusters by reducing the in-cluster sum of squares.
3. **Medoids:** Medoids are also the center of the cluster but they are actual data points!
4. **WCSS**: Within-Cluster Sum of Square, it helps to find the variance or the spread of the objects in the same cluster.

---
## Metrics for Optimization

For K-clustering we will use two different training loss functions:

**Cosine Similarity**: The angle between two vectors (a measure of similarity)
$$cos(x,y) = \frac{x^T y}{||x||\ ||y||}$$

**Euclidean Distance**: The distance between two vectors
$$d = \sqrt{{(x_2 - x_1)^2 + (y_2 - y_1)^2}}$$

---
## Optimization

We have to do two things here to perform k means clustering! 

**Optimize Clusters + Representatives**:

![[Optimization in Machine Learning#K-Clustering]]


The main goal is to reach a **Voronoi Diagram** and **Convergence.**

![[Pasted image 20230610202925.png]]

![[Pasted image 20230610202940.png]]

==Ideally, our centroids and clusters do not change (much) after a certain point.== --> Training loss decreases until a somewhat steady state.

---
## Implementation - K-means Clustering

**High Level Glance:**
1. Initialize k points as "centroids" randomly within the space of our data.
2. Assign each observation (points) to the cluster that has the closest centroid based on a certain distance metric (usually Euclidean distance).
3. Update the centroids to be the new mean value of all of the data points in a cluster.
4. Repeat steps 2 and 3 until the centroids do not change significantly, or you reach a set number of iterations.

**Python Code:**

==K-Centroids==
```python
import numpy as np
import matplotlib.pyplot as plt

# Function to initialize centroids
def initialize_centroids(points, k):
    # Copy points to a new variable
    centroids = points.copy()

    # Shuffle the data points
    np.random.shuffle(centroids)

    # Return the first k data points
    return centroids[:k]

# Function to get closest centroid for each data point
def closest_centroid(points, centroids):
    closest = []
    for point in points:
        # Calculate the distance between the point and each centroid
        distances = np.sqrt(((point - centroids) ** 2).sum(axis=1))
        # Append the index of the closest centroid
        closest.append(np.argmin(distances))
    return np.array(closest)

# Function to move the centroids
def move_centroids(points, closest, centroids):
    new_centroids = []

    # For each centroid
    for i in range(centroids.shape[0]):
        # If there are points that are closest to the centroid
        if points[closest == i].size > 0:
            # Move centroid to the mean of those points
            new_centroids.append(points[closest == i].mean(axis=0))
        else:
            # Keep the old centroid
            new_centroids.append(centroids[i])
    return np.array(new_centroids)

# Running k-means
k = 3
# Initialize centroids
centroids = initialize_centroids(points, k)

# For 10 iterations
for _ in range(10):
    # Get the closest centroid for each point
    closest = closest_centroid(points, centroids)
    # Move centroids
    centroids = move_centroids(points, closest, centroids)
```

==K-Medoids==

```python
import numpy as np
import matplotlib.pyplot as plt

# Function to initialize medoids
def initialize_medoids(points, k):
    # Copy points
    medoids = points.copy()

    # Shuffle the data points
    np.random.shuffle(medoids)

    # Return the first k data points
    return medoids[:k]

# Function to assign each point to closest medoid
def assign_to_closest(points, medoids):
    closest = []
    
    for point in points:
        # Calculate the distance between the point and each medoid
        # Subtract medoid coordinates from point coordinates
        difference = point - medoids

        # Square the difference
        squared_difference = difference ** 2

        # Sum the squared difference across coordinates (for euclidean distance)
        distances = np.sum(squared_difference, axis=1)

        # Apply square root to the sum to get the euclidean distance
        distances = np.sqrt(distances)

        # Append the index of the closest medoid
        closest.append(np.argmin(distances))
    
    return np.array(closest)

# Function to update the medoids
def update_medoids(points, closest, medoids):
    new_medoids = []

    for i in range(medoids.shape[0]):
        # If there are points that are closest to the medoid
        if points[closest == i].size > 0:
            # Compute distances matrix
            # Compute difference between points
            differences = points[closest == i][:, np.newaxis] - points[closest == i]

            # Square the differences
            squared_differences = differences ** 2

            # Sum the squared differences to get squared distances
            squared_distances = np.sum(squared_differences, axis=2)

            # Apply square root to the sum to get the euclidean distances
            distances = np.sqrt(squared_distances)

            # Sum the distances along the first axis (rows in the distance matrix)
            total_distances = np.sum(distances, axis=0)

            # Choose data point with minimal total distance as new medoid
            new_medoids.append(points[closest == i][np.argmin(total_distances)])
        else:
            # Keep the old medoid if no points are closest to it
            new_medoids.append(medoids[i])

    return np.array(new_medoids)

# Running k-medoids
k = 3
# Initialize medoids
medoids = initialize_medoids(points, k)

# For 10 iterations
for _ in range(10):
    # Get the closest medoid for each point
    closest = assign_to_closest(points, medoids)
    # Update medoids
    medoids = update_medoids(points, closest, medoids)

```

---

**Visual Understanding**:
Imagine a dataset with values scattered across a two-dimensional graph, where the x and y-axis represent the features of the data. The initialization of k points would seem like just randomly scattering some different color points across this graph.

After attributing each data point to its nearest color and recalculating the color point (centroid) to be the average of all of its attributed points, the centroid changes its position in the graph. You repeat

---