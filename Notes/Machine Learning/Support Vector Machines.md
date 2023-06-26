---
tags: ML
date: 22-06-2023
type: 
 Note
 Incomplete
summary: 
---

## Overview

SVMs as a high level overview, is just a [[Linear Classification]] model to make it more generalizable to a new data set that we have not encountered. In a similar manner to [[Ridge Regression]], we introduce a regularizer (lambda) to make the model more generalized.

In the classification context, a more "general model" would naturally mean that we maximize our margin - that is, to maximize room for error. Imagine maximizing the "distance" of our points that are the closest to the boundary. These points are essentially the "support vectors" in SVM models.

---

## Regularization on Linear Classifiers

Recall the empirical risk in the classic linear classifiers/regression:

$$R_n(\theta, \theta_0) = \frac{1}{n}\sum_{t=1}^{n}Loss(y^{(t)}\ \cdot \ h(\theta,\theta_0;x^{(t)}))$$

We want to introduce a regularization term $\lambda$ to place a bias on $\theta$.

$$R_n(\theta, \theta_0) = \frac{\lambda}{2}||\theta||^2 + \frac{1}{n}\sum_{t=1}^{n}Loss(y^{(t)}\ \cdot \ h(\theta,\theta_0;x^{(t)}))$$

The idea is simple: ==make it generalizable== with that lambda

---

## End Goal: Maximize Margin

To even calculate the margin in the first place, we have to find the distance of the point to the boundary line. Here, a function is defined (gamma) to calculate the distance of a point to the boundary/hyperplane. 

$$\gamma^{(t)}(\theta, \theta_0) = \frac{y^{(t)}\cdot h(\theta, \theta_0; x^{(t)})}{||\theta||}$$

Now imagine the closest points to the boundary line / hyperplane. We want to maximize our margin which also meant maximizing (points with the smallest distances to the boundary line).

$$max (min \ \gamma^{(t)}(\theta, \theta_0) \ \forall \ t )$$

The image below helps us to visualize the "maximizing" of the margin. (left graph) The margin boundary lines can be +-1 as seen in the image as well.

![[Pasted image 20230622123235.png]]


To achieve our goal of  $max (min \ \gamma^{(t)}(\theta, \theta_0) \ \forall \ t )$, we will have to push these boundaries as far as possible. Hence, ==minimize== $||\theta||$ because that would maximize our gamma (distance from boundary line to the points closest to it). Side Note: Minimizing theta is also known as the **primal problem.** Think primal = primitive = original problem!

==Constrained== by the fact that ALL points must be classified correctly!

---

## Primal Problem

To obtain the end goal mentioned in the previous section, we need to solve the primal problem.

**Primal Problem Criterion:**
1. $minimize\ ||\theta||^2$
2. Constraint:    $y^{(t)} \cdot h(\theta,\theta_0; x^{(t)})$

To make it easier to solve the problem, we can change the way we express the problem --> turning it into a ==dual problem== which takes into account the constraint - all points are still classified correctly!

----

## Dual Problem

The primal problem becomes a "dual problem" when we combine the constraints and the original problem (maximizing our margin). The function that combines the objective function and constraint(s) is called the [[Support Vector Machines#Understanding the Lagrangian and Lagrange Multipliers (pre-requisite to formulating the dual problem)|Lagrangian]]. 

**Note:** The dual problem is not special to SVMs! The way we update theta for the [[Perceptron Algorithm]] is also a dual problem (objective + constraint)

Firstly, we construct the dual problem as a Lagrangian (a fancy name for a function of a constrained problem).

$$L(\theta, \alpha) = \frac{1}{2} ||\theta||^2 + \sum_{t=1}^{N} \alpha_t [1- y^{(t)}\cdot h(\theta,\theta_0;x^{(t)})]$$

Some Pointers to understand the Lagrangian:
1. our objective = $\frac{1}{2} ||\theta||^2$
2. our constraint = $[1- y^{(t)}\cdot h(\theta,\theta_0;x^{(t)})]$ --> every data point should be correctly classified while allowing a margin of at least 1.
3. every $\alpha \ge 0$

Constraint (inside the bracket) $\le$ 0  ==satisfied== ===> our alpha = 0

Constraint (inside the bracket) $>$ 0  ==not satisfied== ===> our alpha > 0


## Solving the Dual Problem

Since our end goal is to minimize theta, we can partially differentiate the lagrangian with respect to theta. 

$$min_\theta\ L(\theta, \alpha) = \theta - \sum_{t=1}^{n}\alpha_t\ x^{(t)} y^{(t)} = 0$$
$$\theta = \sum_{t=1}^{n}\alpha_t\ x^{(t)} y^{(t)}$$

$$Substitute \ back\ into\ L(\theta,\alpha)$$

$$L(\theta,\alpha) = \sum_{t=1}^{n}\alpha_t - \frac{1}{2} \sum_{t=1}^{n}\sum_{t'=1}^{n}\alpha_t\ \alpha_t'\  y^{(t)}y^{(t')}(x^{(t)}x^{(t')})\ \ \forall \ \alpha\ge0,\ t > 0$$

Now that we have an expression fully on alphas and the points, we maximize this function with respect to alpha to find our alpha values ==for each point==! This is because the lagrange multipliers (alphas) help us to ensure our constraints are valid/active!

Again, lagrange multipliers only kick into play (>0) if and only if the points are misclassified / fall below the margin boundary lines. --> the value of the constraint inside the square bracket is positive.

As a bonus, we derived the **==complementary slackness as well!==**

$$\hat{\alpha} = 0 : y(\hat{\theta}\cdot x+\theta_0) > 1$$
$$\hat{\alpha} > 0 : y(\hat{\theta}\cdot x+\theta_0) = 1$$


$$s.t.\ \ \hat{\theta} = \sum_{t'=1}^{n}\hat{\alpha}_{t'}\ x^{(t')} y^{(t')}$$


#### Obtaining the offset $\hat{\theta}_0$

Using the fact that our lagrange multiplier is only >0 for all support vectors, we can update our theta_0 accordingly by substituting theta hat into the hypothesis!

$$y^{(t)}(\hat{\theta}\cdot x^{(t)} +\hat{\theta}_0) = y^{(t)}(\sum_{t'=1}^{n}\hat{\alpha}_{t'}\ y^{(t')}x^{(t')}\cdot x^{(t)} +\hat{\theta}_0)$$

Multiply both sides with $y^{(t)}$ to get $(y^{(t)})^2 = 1$ since y is either 1 or -1. Rearrange to get theta_0

$$\hat{\theta}_0 = y^{(t)} - (\sum_{t'=1}^{n}\hat{\alpha}_{t'}\ y^{(t')}x^{(t')}\cdot x^{(t)})$$

**==There can be errors still and the a good way to overcome this is to just take the median of all the theta_0 estimates.==**

---

## Dealing with anomalies / errors

In a scenario where there are errors, an actual point can really mess up the margin borders (making it really tiny) - see the right image below. To truly make the SVM generalizable, we **must allow errors**.

![[Pasted image 20230626223636.png]]


To account for these extreme anomalies, we accept errors and use a ==soft margin== instead of a hard margin. Basically, we are adding another variable to "tolerate" mistakes. Specifically, this "tolerance" is just another cost that we include in our [[Support Vector Machines#Primal Problem|primal problem]].

$$New \ Primal \ Problem = min \ \frac{\lambda}{2}||\theta||^2  + \sum_{t=1}^{n}\xi_t$$

Here, we can see that $\xi$ (psi) is the "tolerance" or the cost. Hence, we minimize not only theta, but also psi.

In fact, we literally treat psi as a loss function using the [[Optimization in Machine Learning#^7abcf5|hinge loss function]]. 

$$min \ \frac{\lambda}{2}||\theta||^2  + \sum_{t=1}^{n}Loss_h(y^{(t)}\cdot h(\theta,\theta_0;x)) $$

$$s.t.  Loss_h(y^{(t)}\cdot h(\theta,\theta_0;x)) = max(0,\ 1-y^{(t)}\cdot h(\theta,\theta_0;x))$$

This makes sense because if we anyhow set a boundary line that wrongly misclassifies everything, the hinge loss also heavily punishes it. At the same time, if we set a good boundary line, then it is a matter of choosing the best margin borders that **minimizes our hinge loss** --> minimize wrongly classified/extreme values.

#### Errors effects on lagrange multipliers

Because we are willing to accept errors, the alpha values can get huge (constraint of correctly classifying points are correct is not satisfied). We naturally have to limit the max that alpha can become.

that is, $0 \le \alpha \le \frac{1}{\lambda},\ \  \sum_{t=1}^{n}\alpha_t y^{(t)} = 0$ 

again, recall that lambda is the "regularization term". The more we want to generalize the model, the smaller alpha must become because alpha is the term that forces the model to abide by the constraint. ie. if we want our model to be more generalizable, we want force (to a less extent) our model to follow the constraint.


As such, our **==complementary slackness==** now need to account for margin violations.


$$\hat{\alpha} = 0 : y(\hat{\theta}\cdot x+\theta_0) \ge 1$$
$$0 \le \alpha \le \frac{1}{\lambda}: y(\hat{\theta}\cdot x+\theta_0) = 1$$
$$\hat{\alpha} = \frac{1}{\lambda} : y(\hat{\theta}\cdot x+\theta_0) \le 1$$

$$s.t.\ \ \hat{\theta} = \sum_{t'=1}^{n}\hat{\alpha}_{t'}\ x^{(t')} y^{(t')}$$

Using these alpha values, we can find the value for theta_0! (ps. can use median but depends on context)




---

## Thoughts

Recall in [[Perceptron Algorithm]] that the way theta is corrected is by adding $y^{(t)} x^{(t)}$ for every mistake made. With reference to this concept, we can express theta in a similar way in terms of $\alpha$ - the number of mistakes made. There is one difference in that $\alpha$ is no longer an integer because a margin does not need to be an integer! 



#### Understanding the Lagrangian and Lagrange Multipliers (pre-requisite to formulating the dual problem)

Lagrange multipliers $\alpha$ are ways to scale the correction depending on how wrong the classification is. They are either 0 or >0 such that alpha is 0 if the point is correctly classified (not on the margin line) and >0 if the point is on the margin. ==In essence, $\alpha>0$ if and only if the point is a support vector (on the margin line).== 

Why is this so? Reason: We want the boundary points to have the most influence on the margin border. That's why they are called support vectors and this alpha helps to shift the borders.