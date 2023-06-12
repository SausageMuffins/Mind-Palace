---
tags: ML
date: 06-06-2023
type: 
 Note
 Complete
summary: A supervised learning method to predict real values.
---

## Overview

Linear regression is a supervised learning model that takes in features and it's associated output. To train the model, we can use stochastic gradient descent or the normal variant to optimize the weights (theta values).

---

## Hypothesis Function (Predicted Value)

$$f(x;\theta, \theta_0) = \theta\cdot x + \theta_0$$

## Loss Function - Mean Squared Error

^070123

$$MSE = \frac{1}{n} \sum_{t=1}^{n}(y^{(t)} -f(x^{(t)};\theta, \theta_0))^2$$

---

## Optimization

To minimize my MSE for the model, we can either iterate through a set number of times for a [[Optimization in Machine Learning]] OR until we reach a acceptable threshold (sufficiently small MSE).

![[Optimization in Machine Learning#Linear Regression]]

---

## Exact Solution

We obtain this solution by solving the partial derivative of the loss function (MSE)

$$\hat{\theta} = (\frac{1}{n}X^TX)^{-1}\frac{1}{n}(X^T\vec{y})$$