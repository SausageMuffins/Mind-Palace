---
tags: ML
date: 06-06-2023
type: 
 Note
 Complete
summary: The optimization algorithm to improve models
---

## Overview

This algorithm is literally just finding the global minimum point in a hyperplane. The main idea is to move in the opposite direction of the gradient to go to the steepest point. 

**==WE JUST WANT TO MINIMIZE LOSS IN EVERY CASE!==**

---

# Supervised Learning

## [[Linear Classification]]

#### Normal Algorithm

1. Initialize the weights - $\theta, \theta_0$
2. Compute hypothesis $h(x; \theta,\theta_0)$
3. Check if $h(x^{(t)}; \theta,\theta_0) \ne y^{(t)}$
	1. update $\theta$ -> $\theta^{(k+1)} = \theta^{(k)} + y^{(t)}x^{(t)}$
	2. update $\theta_0$ -> $\theta_0^{(k+1)} = \theta_0^{(k)} + y^{(t)}$
4. Repeat steps 1 to 3 until iterations are met.


#### Stochastic Algorithm

**We can make use of the hinge loss function**

1. Initialize the weights - $\theta, \theta_0 = 0$
2. Randomly select a data point.
3. Compute hypothesis $h(x; \theta,\theta_0)$ using hinge loss.
4. Check if $h(x^{(t)}; \theta,\theta_0) \leq 1$
	1. update $\theta$ -> $\theta^{(k+1)} = \theta^{(k)} + n_k y^{(t)}x^{(t)}$
	2. update $\theta_0$ -> $\theta_0^{(k+1)} = \theta_0^{(k)} + n_k y^{(t)}$
5. Repeat steps 2 to 4 until iterations are met.

Note: $n_k = 1/k$ where k can be the number of iterations. (depends on context)

---

## [[Linear Regression]]

#### Stochastic Algorithm

1. Initialize the weights - $\theta, \theta_0 = 0$
2. Randomly select a data point.
3. Compute $f(x; \theta,\theta_0)$.
4. Update
	1. $\theta^{(k+1)} = \theta_0^{(k+1)} + n_k(y^{(t)} - f(x^{(t)};\theta,\theta_0))x^{(t)}$
5. Repeat steps 2 to 4 until iterations are met.

Note:
- $n_k = 1/k$ where k can be the number of iterations. (depends on context)
- We do our optimization for every single data point unlike the linear classification where we only update when we get the prediction wrong.

---

## [[Ridge Regression]]

#### Stochastic Algorithm

1. Initialize the weights - $\theta, \theta_0 = 0$
2. Randomly select a data point.
3. Compute $f(x; \theta,\theta_0)$.
4. Update
	1. $\theta^{(k+1)} = (1-\lambda n_k)\theta^{(k)} + n_k(y^{(t)} - f(x^{(t)};\theta,\theta_0))x^{(t)}$
5. Repeat steps 2 to 4 until iterations are met.

Note:
- $n_k = 1/k$ where k can be the number of iterations. (depends on context)
- We do our optimization for every single data point unlike the linear classification where we only update when we get the prediction wrong.


----

# Unsupervised Learning

## [[K-Clustering]]

#### Coordinate Descent

1. Initialize the cluster centroids by randomly selecting k data points as initial centroids.
2. Optimize clusters and ==centroids/medoids==:
	1. Clusters: Select the set of points that are closest to it
	2. Centroids / Medoids: Readjust the centroid to the center of the cluster.
3. Check for convergence criteria, such as the change in centroid positions or the number of iterations, to determine if the algorithm has reached a stable solution.
4. Repeat from step 2 until convergence/max number of iterations.


----

# Reinforcement Learning

## [[Markov Decision Process]]

#### Value Iteration
1. Start with $V^*(s) =0$ for all states.
2. At any state $V^*_i$, find the next action that maximizes the $V^*_{i+1}$.
	1. $V^*_{i}$