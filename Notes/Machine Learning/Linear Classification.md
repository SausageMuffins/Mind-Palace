---
tags: ML
date: 21-05-2023
type: Note Complete
summary: A supervised learning method for ML that classifies objects into two
  categories using a classifier function.
---

## General Idea

We random choose or generate $h$ from a set of classifiers $H$ and check if the classifier is a good fit for our data set. We choose the $h$ with the lowest error out of all the classifiers that we have checked or when $h$'s error is 0.

This is a linear classifier because the decision boundary (hyper plane) is linear.

---

## Formal Classifier Definition

**Without Offset:**

$$h(x;\theta) = sign(\theta_1x_1\ +\ ...\ +\ \theta_d x_d) = sign(\theta \cdot x)$$

| Sign Value | Argument Passed                   |
| ---------- | --------------------------------- |
| +1         | $\theta \cdot x \ge 0$ |
|   -1         |     $\theta \cdot x  < 1$                               |


**With Offset**:

$$h(x;\theta, \theta_0) = sign(\theta \cdot x + \theta_0)$$

| Sign Value | Argument Passed                   |
| ---------- | --------------------------------- |
| +1         | $\theta \cdot x + \theta_0 \ge 0$ |
|   -1         |     $\theta \cdot x + \theta_0 < 1$                               |



==**Intuition**:== **Given a set of features (x) and weights (theta), the classifier will produce either a +1 or a -1 based on the dot product of the weight and the features.==**

We can see treat the theta as a normal vector from the line (the direction is where all of the +1 are classified).

![[Pasted image 20230521161907.png]]

This predicted +1 or -1 from the classifier (h) is compared with the actual value y to **obtain the percentage of error ($\varepsilon$).**

$$\varepsilon_n(\theta) = \frac{1}{n}\sum_{t=1}^{n}[[y(t) \ne h(x^{(t)};\theta)]] = \frac{1}{n}\sum_{t=1}^{n}[[y(t)(\theta \cdot x^{(t)}\le 0)]]$$

*Note: The error function square brackets work by returning 1 if the condition is true. 0 otherwise.* The square brackets in the error function context checks if the predicted value is wrong.

---

## Linearly Separable Definition

**Through the origin:** There exist a parameter vector $\theta$ such that all of the points are correctly classified - $y^{(t)}(\theta \cdot x^{(t)}) > 0$.

![[Pasted image 20230521160836.png]]

A data set can also be linearly separable without cutting through the origin.

---

## Optimization

![[Optimization in Machine Learning#Linear Classification]]



---

## Thoughts

1. The linear classifier can potentially run forever as there is no guarantee we can find a classifier with a percentage error of 0. - assuming we don't set a fixed number of iterations.
2. This form of machine learning isn't really "learning" as it's reliant on luck and does not improve with "mistakes" like a human would. A better way of "learning" that can improve on this learning method is the [[Perceptron Algorithm]].