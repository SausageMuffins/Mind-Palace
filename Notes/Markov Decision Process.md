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

Using the Transition and Reward Function, we want to determine the optimal policy. When we find the optimal policy, the Optimal value and Optimal Q-Function will naturally fall in place.

#### Optimal Policy $(\pi^*(s))$
The optimal "strategy" or **==mapping==** of what actions to take at each state such that we reach the optimal value (highest reward). Think dictionary.


#### Optimal Value $(V^*(s))$
The cumulative highest reward of the current state only.

#### Optimal Q-Function$(Q^*(s,a))$
The expected best reward if we were to take an action a at any particular state s using the optimal policy. This means the best cumulative (expected) rewards of both the current state + the reward of the next (possible) states following the optimal policy.

---

## Arriving at End-Goal

We need to first define our Optimal Q-Function $Q^*(s,a)$ mathematically. Keep in mind that our $Q^*(s,a)$  is the best cumulative reward if we take that particular action. (following the optimal policy)

$Q^*(s,a) = $