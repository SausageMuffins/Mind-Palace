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

## End Goal - Explanation

We have to first define a function that help us to compute the distance of a point to the decision boundary. 

$$\gamma^{(t)}(\theta, \theta_0) = \frac{y^{(t)}\cdot h(\theta, \theta_0; x^{(t)})}{||\theta||}$$

Note: this "gamma" function is really just computing the distance of **one point, t,** to the boundary. 

Now, we want to maximize the distance of the points closest to the boundary (hence the min of gamma for a points)!  $$max (min \ \gamma^{(t)}(\theta, \theta_0) \ \forall \ t )$$
To do this, we draw two more "boundaries" called ==margin boundaries==. These margin boundaries are parallel to our decision boundary and are of equal distances from the decision boundary. (see the left image)

![[Pasted image 20230622123235.png]]

We can see that the distances from the decision boundary to the margin boundary is $\frac{1}{||\theta||}$. To achieve our goal of  $max (min \ \gamma^{(t)}(\theta, \theta_0) \ \forall \ t )$, we will have to push these boundaries as far as possible. Hence, ==minimize $||\theta||$==. Side Note: Minimizing theta is also known as the **primal problem.** **==Constrained==** by the fact that ALL points must be classified correctly!

The result would be the figure on the right! **==The points that are exactly on the margin boundaries are our support vectors!==** With this goal in mind, we set up the primal problem.

## Primal Problem

To obtain the end goal mentioned in the previous section, we need to solve the primal problem.

**Primal Problem Criterion:**
1. $minimize\ ||\theta||^2$
2. Constraint:    $y^{(t)} \cdot h(\theta,\theta_0; x^{(t)})$


## Dual Problem / Lagrangian

The primal problem becomes a "dual problem" when we combine the constraints and the original problem (maximizing our margin). The function that combines the objective function and constraint(s) is called the [[Support Vector Machines#Understanding the Lagrangian and Lagrange Multipliers (pre-requisite to formulating the dual problem)|Lagrangian]].

$$L(\theta, \alpha) = \frac{1}{2} ||\theta||^2 + \sum_{t=1}^{N} \alpha_t [1- y^{(t)}\cdot h(\theta,\theta_0;x^{(t)})]$$

Some Pointers to understand the Lagrangian:
1. our objective = $\frac{1}{2} ||\theta||^2$
2. our constraint = $[1- y^{(t)}\cdot h(\theta,\theta_0;x^{(t)})]$ --> every data point should be correctly classified while allowing a margin of at least 1.

Constraint = 0 if whatever the inside the bracket $\ge$ 0. Constraint < 0 if our constraint 

---

#### Understanding the Lagrangian and Lagrange Multipliers (pre-requisite to formulating the dual problem)

Lagrange multipliers $\alpha$ are ways to scale the correction depending on how wrong the classification is. They are either 0 or >0 such that alpha is 0 if the point is correctly classified (not on the margin line) and >0 if the point is on the margin. ==In essence, $\alpha>0$ if and only if the point is a support vector (on the margin line).== 

Why is this so? Reason: We want the boundary points to have the most influence on the margin border. That's why they are called support vectors and this alpha helps to shift the borders.

---





---

## Thoughts

Recall in [[Perceptron Algorithm]] that the way theta is corrected is by adding $y^{(t)} x^{(t)}$ for every mistake made. With reference to this concept, we can express theta in a similar way in terms of $\alpha$ - the number of mistakes made. There is one difference in that $\alpha$ is no longer an integer because a margin does not need to be an integer! 
