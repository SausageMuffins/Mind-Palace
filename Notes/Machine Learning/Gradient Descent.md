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

---

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