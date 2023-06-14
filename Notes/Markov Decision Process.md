---
tags: ML
date: 12-06-2023
type: 
 Note
 Incomplete
summary: 
---

## Overview

MDP is a reinforcement learning type of ML. This form of learning is slightly different from unsupervised learning as it the agent (computer) is learning from interactions with it's environment (rewards).

**Markov:** can be interpreted as states. For MDP, the states are directly observable which may not be true for other Markov Chains.

**Decision:** quite simply the idea of taking an action. For MDP, this decision is only made in the current state. ie: an independent choice.

**Process:** implies that we have an end goal to reach.

Combining all three terms together, it starts to make more sense. At each state (**Markov**), we are trying to take an optimal action (**decision**) to reach an end goal. This would be a **process** of continually refining this decision making process.

**Our goal here for this process is to maximize the reward!**


Useful Terms for MDP:

| Terms       | Description                         |
| ----------- | ----------------------------------- |
| s           | a set of states                     |
| a           | a set of actions                    |
| T(s, a, s') | a transition function = P(s'\|s, a) |
| R(s, a, s') | a reward function                   |
| $\gamma$            |a discount factor for rewards -> make sure our process is time bounded                                     |


Each decision process can also take in a start and end state.

---

## Our End Goal

Using the Transition and Reward Function, we want to determine the optimal policy. **==The idea here is to work backwards and calculate the optimal value from the end state first!==**

When we find the optimal policy, the Optimal value and Optimal Q-Function will naturally fall in place.

#### Optimal Policy $(\pi^*(s))$
The optimal "strategy" or **mapping** of what actions to take at each state such that we reach the optimal value (highest reward). Think dictionary.

#### Optimal Value $(V^*(s))$
The cumulative highest reward of the current state only.

#### Optimal Q-Function$(Q^*(s,a))$
The expected best reward if we were to take an action a at any particular state s using the optimal policy. This means the best cumulative (expected) rewards of both the current state + the reward of the next (possible) states following the optimal policy.

---

## Arriving at End-Goal

There are three main ways to arrive at our end goal --> getting optimal policy, values and Q-values.
![[Optimization in Machine Learning#Markov Decision Process]]


**==Explanation:==**
We need to first define our Optimal Q-Function $Q^*(s,a)$ mathematically. Keep in mind that our $Q^*(s,a)$  is the best cumulative reward if we take that particular action.

#### Value Iteration (More of a Top-Down Approach)

![[38XJQZuS.svg]]

Key Idea: 

1. Identify all the possible actions
2. Determine the Optimal value for that next state s' if we take that action from s (this is possibly where the recursion takes place - DP: Bottom up/Top down)
3. Use that optimal value to calculate Q(s',a) for all the actions
4. Take the largest Q to be the optimal value for the CURRENT state s.

Step 3:

$$Q^*(s,a) = T(s,a,s')[R(s, a, s') + \gamma V^*(s')]\ \forall a\ from\ s$$

Step 4: Take the largest Q value (largest expected reward if we were to take that action) to be the optimal value for the current state.
$$V^*(s) = max_a(Q^*(s,a))$$

We essentially repeat this until we reach back to the start. This is highly related to Dynamic Programming top down and bottom up approaches.


**How is updating optimal value related to the optimal policy?**

The optimal value is chosen by adding the immediate reward of the current state and the optimal value of the next state. Moving to this next state should be the **best action** out of all the possible actions from the current state s.

Therefore, when we define optimal policy to be the best action to choose from current state, then it is obvious that the best action would be the mapping for the current state in the optimal policy.

$$\pi ^*(s) = arg\ max_aQ^*(s,a)$$


#### Q-Value Iteration (More of a Bottom-up Approach)
We have seen from the value iteration that getting the optimal policy and optimal value seems to rely on the Optimal Q-value. This begs the question: *Can we just directly calculate optimal Q-Value?*

We simply just substitute $V^*(s)$ into the optimal Q-Value equation.

$$Q^*(s,a) = T(s,a,s')[R(s, a, s') + \gamma max_a(Q^*(s',a')]\ \forall a\ from\ s$$

We end up deriving the update equation for the next Q-value:

$$Q^*_{i+1} = T(s,a,s')[R(s,a,s') + \gamma max_a(Q_i^*(s',a'))]\ \forall a$$

The i+1 in this case can be interpreted as moving backwards to the start even though it's +1. Might be a bit confusing but the +1 is simply to show that we are updating the next Q value.

Naturally, we can obtain the optimal value from after we get the optimal Q-values.

$$\pi ^*(s) = arg\ max_aQ^*(s,a)$$

#### Policy Iteration
Since we can get Q straight away, is there a way to get the policy straight away? Lol keep looking for short cuts!

Answer: Somewhat --> we can guess and check to improve along the way until convergence.

**General Algorithm**
1. **Initialize Policy**: Start with a random policy, which is a mapping from states to actions.
2. **Policy Evaluation**: Calculate the value function for the current policy. This is done by solving the Bellman equation for the current policy.
3. **Policy Improvement**: Update the policy by making it greedy with respect to the current value function. This means, for each state, choose the action that maximizes the expected value of the next state.
4. **Check if Policy is Stable**: Compare the updated policy with the old policy. If the policy is stable (i.e., it's not changing anymore), then it's the optimal policy and you can stop. Otherwise, go back to the Policy Evaluation step and repeat the process with the updated policy.
5. **Optimal Policy**: Once the policy is stable, it's the optimal policy.

Under some conditions, policy iteration can actually converge much faster!

---