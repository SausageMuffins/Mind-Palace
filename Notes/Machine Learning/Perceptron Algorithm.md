---
tags: ML
date: 21-05-2023
type: 
 Note
 Complete
summary: An algorithm to learn from mistakes.
---

## General Idea

Instead of randomly guessing for a classifier like the learning method in [[Linear Classification]], it can be more efficient to learn from wrong predictions by the classifier. We can do this by identifying a misclassified data point and correcting $\theta$ with the following equation below.

$$y^{(t)} \ne h(x^{(t)};\theta^{(k)}) $$

## Update Formulas

Once we have identified the misclassified data point from above, we have to adjust $\theta$ and possibly $\theta_0$ with the following formulas

$$\theta^{(k+1)} = \theta^{(k)} + y^{(t)}x^{(t)}$$
$$\theta_0^{(k+1)} = \theta_0^{(k)} + y^{(t)}$$

## Result

After many iterations, the boundary (a linear line) will adjust itself and ==converge==. At this point, we can conclude that the data set is [[Linear Classification#Linearly Separable Definition|Linearly separable]]. 

---

## Thoughts
1. We should consider how many iterations the algorithm will take as it may not terminate if the data set is not linearly separable.