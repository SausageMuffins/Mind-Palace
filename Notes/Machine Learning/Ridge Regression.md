---
tags: ML
date: 07-06-2023
type: 
 Note
 Complete
summary: Introducing a penalty (regularizer) to a standard linear regression to generalize the model.
---

## Overview

Ridge regression is essentially the introducing a penalty (regularizer) to a standard [[Linear Regression|linear regression]] to generalize the model. The main idea here is to avoid overfitting to the training data. By adding a penalizing term, we are also reducing **structural** and **estimation errors**.

---

#### Structural Errors

Structural errors occur when we underfit a model. For example, we model a dataset to be linear where in reality it is non-linear. This causes high bias as there are not enough parameters to define the dataset well.

#### Estimation Errors

Estimation errors occur when we overfit the model to the training data. This also means that we obtain a high variance in the test data as there are too many parameters that are closely fit to the training data.

#### Balancing Structural and Estimation Errors

Structural and Estimation errors have an inverse relationship. Increasing the bias on a model will decrease structural errors as it makes the model more generalizable but at the risk/cost of higher structural errors. 

On the other hand, decreasing bias or increasing the number of parameters to consider will make the model more well-defined at the cost of higher variance in the testing data set (estimation error).

The ideal case is to have a balance of both -> minimizes both errors. To do that, we need to use Ridge Regression to introduce a penalty to the weights. (assuming we have high variance)

---

## Optimization

![[Gradient Descent#Ridge Regression]]

---

## Exact Solution

$$\hat{\theta} = (X^TX + n\lambda I)^{-1}(X^T\vec{y})$$


---

## Thoughts:

- While exact solutions may exist, it is often not always the best idea to straight away use the exact solution. This applies to [[Linear Regression]] as well. The reason for this is that a practical solution has to be solvable in a reasonable amount of time! If it takes too long to achieve the exact solution through [[Gradient Descent]], then we don't really have a practical solution. 