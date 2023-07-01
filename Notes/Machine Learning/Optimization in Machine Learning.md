---
tags: ML
date: 06-06-2023
type: 
 Note
 Complete
summary: The optimization algorithm to improve models
---

## Overview

The main idea here for all the optimization algorithms is that we want to move in the opposite direction of the gradient such that we decrease the calculated loss. 

The loss functions can come in many forms but the main objective is the same: ==minimize the loss!==


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

**We can make use of the hinge loss function** ^7abcf5

1. Initialize the weights - $\theta, \theta_0 = 0$
2. Randomly select a data point.
3. Compute hypothesis $h(x; \theta,\theta_0)$ using hinge loss.
4. Check if $h(x^{(t)}; \theta,\theta_0) \leq 1$
	1. update $\theta$ -> $\theta^{(k+1)} = \theta^{(k)} + n_k y^{(t)}x^{(t)}$
	2. update $\theta_0$ -> $\theta_0^{(k+1)} = \theta_0^{(k)} + n_k y^{(t)}$
5. Repeat steps 2 to 4 until iterations are met.

Note: $n_k = 1/k$ where k can be the number of iterations. (depends on context)



## [[Support Vector Machines]]









---

## [[Linear Regression]]

#### Stochastic Algorithm

1. Initialize the weights - $\theta, \theta_0 = 0$
2. Randomly select a data point.
3. Compute $f(x; \theta,\theta_0)$.
4. Update
	1. $\theta^{(k+1)} = \theta^{(k)} + n_k(y^{(t)} - (\theta \cdot x^{(t)}+\theta_0))x^{(t)}$
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
2. Update $V^*_{i+1} \forall \ Vs.$
	1. $V^*_{i+1} = max_a\sum_{s'}(T(s,a,s')[R(s,a,s') + \gamma V_i^*(s')])$
	2. note that the sum here is to account for noise! 
3. Repeat until convergence (guaranteed because of gamma)


#### Q-Value Iteration
1. Start with $Q_0^*(s,a) =0$ for all states and available actions.
2. Update $Q^*_{i+1}$ for all Qs.
	1. $Q^*_{i+1} = \sum_{s'}T(s,a,s')[R(s,a,s') + \gamma V^*(s')]'$
	2. 
3. Repeat until convergence (guaranteed because of gamma)


#### Policy Iteration
1. Evaluate: find all values with the current policy
$$V^{\pi_i}_{k+1}(s) = T(s, \pi_i(s),s')[R(s,\pi_i(s), s') +\gamma V_k^{\pi_i}(s')]\ \forall \ s'$$

2. Improve: Correct the policy (one-step look-ahead)
$$\pi_{i+1} = argmax_a(T(s,a,s')[R(s,a,s')+ \gamma V^{\pi_i}(s'))$$


#### Q-Learning
1. Collect a sample with it's immediate reward $R(s,a,s')$
2. Update Q-value according to this new sample

$$Q_{new}(s,a) = (1-\alpha)Q_{old}(s,a) + \alpha[R(s,a,s') + \gamma \ max_{a'}Q_{old}(s',a')]$$
$$||$$
$$Q_{new}(s,a) = Q_{old}(s,a) + \alpha[R(s,a,s') + \gamma \ max_{a'}Q_{old}(s',a') - Q_{old}(s,a)]$$

A good thing to note here that $[R(s,a,s') + \gamma \ max_{a'}Q(s',a') - Q(s,a)]$ is also known as the [[Markov Decision Process#Temporal Difference Error (TDE)|temporal difference error]] or simply another "loss function".