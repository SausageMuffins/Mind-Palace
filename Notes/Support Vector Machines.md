---
tags: ML
date: 22-06-2023
type: 
 Note
 Incomplete
summary: 
---

## Overview

SVMs as a high level overview is just a [[Linear Classification]] model but we introduce a regularizer just like in [[Ridge Regression]]. Again, the main point of regularizing our model is to make it more generalizable to a new data set that we have not encountered.

In the classification context, a more "general model" would naturally mean that we maximize our margin - that is, to maximize room for error. Imagine maximizing the "distance" of our points that are the closest to the boundary. These points are essentially the "support vectors" in SVM models.

---

## Regularization on Linear Classifiers

Recall the empirical risk in the classic linear classifiers/regression:

$$R_n(\theta, \theta_0) = \frac{1}{n}\sum_{t=1}^{n}Loss(y^{(t)}\ \cdot \ h(\theta,\theta_0;x^{(t)}))$$

We want to introduce a regularization term $\lambda$ to place a bias on $\theta$.

$$R_n(\theta, \theta_0) = \frac{\lambda}{2}||\theta||^2 + \frac{1}{n}\sum_{t=1}^{n}Loss(y^{(t)}\ \cdot \ h(\theta,\theta_0;x^{(t)}))$$

The idea is simple: ==make it generalizable== with that lambda

---

## Optimizations

We have to first define a function that help us to compute the distance of a point to the decision boundary. 

$$\gamma^{(t)}(\theta, \theta_0) = \frac{y^{(t)}\cdot h(\theta, \theta_0; x^{(t)})}{||\theta||}$$

Note: this "gamma" function is really just computing the distance of **one point, t,** to the boundary. 

Now, we want to maximize the distance of the points closest to the boundary!  $$max (min \ \gamma^{(t)}(\theta, \theta_0) \ \forall \ t )$$
To do this, we draw two more "boundaries" called ==margin boundaries==. These margin boundaries are parallel to our decision boundary and are of equal distances from the decision boundary. (see the left image)

![[Pasted image 20230622123235.png]]

We can see that the distances from the decision boundary to the margin boundary is $\frac{1}{||\theta||}$. To achieve our goal of  $max (min \ \gamma^{(t)}(\theta, \theta_0) \ \forall \ t )$, we will have to push these boundaries as far as possible. Hence, ==minimize $||\theta||$==. Side Note: Minimizing theta is also known as the **primal problem.**

The result would be the figure on the right! **==The points that are exactly on the margin boundaries are our support vectors!==**

