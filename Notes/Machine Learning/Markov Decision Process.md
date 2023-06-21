---
tags: ML
date: 12-06-2023
type: 
 Note
 Complete
summary: MDP is a reinforcement learning type of ML. This form of learning is slightly different from unsupervised learning as it the agent (computer) is learning from interactions with it's environment (rewards).
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
| s           | a state                    |
| a           | an action                  |
| T(s, a, s') | a transition function = P(s'\|s, a) |
| R(s, a, s') | a reward function: immediate rewards for **moving** from s to s' - can be the value of the grid s'                  |
| $\gamma$            |a discount factor for rewards -> make sure our process is time bounded                                     |


Each decision process can also take in a start and end state.

---

## Our End Goal

Using the Transition and Reward Function, we want to determine the optimal policy. **==The idea here is to work backwards and calculate the optimal value from the end state first!==**

When we find the optimal policy, the Optimal value and Optimal Q-Function will naturally fall in place.

#### Optimal Policy $(\pi^*(s))$
The optimal "strategy" or **mapping** of what actions to take at each state such that we reach the optimal value (highest reward). Think dictionary.

#### Optimal Value $(V^*(s))$
The long term expected utility of state s. This "long term utility" is an estimate! It's not the same as the immediate reward.

#### Optimal Q-value $(Q^*(s,a))$
The immediate reward of moving to the next state R(s,a,s') + the optimal value of the next state s'. There can be multiple Q values because of the different possible action an agent can take at state s, but the optimal Q value is one that follows the optimal policy. 

In other words, the optimal Q value is also the best long term expected reward for taking an action a.

---

## Arriving at End-Goal

**Main Idea:** Guess and check on the same spot until we get an optimal value. That is, we pretend to take every single possible action and see if taking that action improves my current optimal values (v and q). This will naturally impact our optimal policy after v and q converges.

There are three main ways to arrive at our end goal --> getting optimal policy, values and Q-values.
![[Optimization in Machine Learning#Markov Decision Process]]


**==Explanation:==**
We need to first define our Optimal Q-Function $Q^*(s,a)$ mathematically. Keep in mind that our $Q^*(s,a)$  is the best cumulative reward if we take that particular action.

#### Value Iteration (DP Approach)

![[38XJQZuS.svg]]

Key Idea: 

1. Identify all the possible actions
2. Update my new optimal value for state s by calculating all new values if we take an action from my current state (formula). **may need to account for noise (moving left or right)**
3. Use that new optimal value to calculate Q(s',a) for all the actions.
4. Take the largest Q to be the optimal value for the CURRENT state s.

Step 3:

$$Q^*(s,a) = T(s,a,s')[R(s, a, s') + \gamma V^*(s')]\ \forall s'\ from\ s$$

Step 4: Take the largest Q value (largest expected reward if we were to take that action) to be the optimal value for the current state.
$$V^*(s) = max_a(Q^*(s,a))$$

We essentially repeat this until we reach back to the start. This is highly related to Dynamic Programming top down and bottom up approaches.


**How is updating optimal value related to the optimal policy?**

The optimal value is chosen by adding the immediate reward of the current state and the optimal value of the next state. Moving to this next state should be the **best action** out of all the possible actions from the current state s.

Therefore, when we define optimal policy to be the best action to choose from current state, then it is obvious that the best action would be the mapping for the current state in the optimal policy.

$$\pi ^*(s) = arg\ max_aQ^*(s,a)$$


---

#### Q-Value Iteration (DP Approach)

Main Idea: we guess and check by moving in all possible direction from state s and update my current Q value with the largest Q value that I get from each action.

We simply just substitute $V^*(s)$ into the optimal Q-Value equation.

$$Q^*(s,a) = \sum_{a'}T(s,a,s')[R(s, a, s') + \gamma max_a(Q^*(s',a')]\ $$

We end up deriving the update equation for the Q-value of the current state:

$$Q^*_{i+1}(s,a) = \sum_{a'}T(s,a,s')[R(s,a,s') + \gamma max_a(Q_i^*(s',a'))]$$

The i in this case represents the iteration --> each iteration is supposed to dive 1 layer deeper.

Naturally, we can obtain the optimal value from best action with the optimal Q-values.

$$\pi ^*(s) = arg\ max_aQ^*(s,a)$$

---

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

### Q-Learning

The main difference between Q-value iteration an Q-learning is that **learning does not have the assumption of knowing the transition probabilities and rewards.** This makes Q-learning much more applicable to real life scenarios as we often do not know the rewards + transition probabilities. 

This method is follows the main principle of [[Optimization in Machine Learning]]: minimize loss by moving in the opposite direction of the gradient.

#### Temporal Difference Error (TDE)

**TDE main idea:** Keep interacting with the environment and getting more samples (information) about the transition probability and rewards. Using these samples, we calculate a loss against our current estimate!

##### TDE Thought Process:

1. We start off with a new sample from interacting with the environment. In doing so, we gained new information the immediate reward for following policy $\pi$.

$$sample = R(s,\pi(s),s') + \gamma \ V_i^\pi(s)$$

2. We calculate the error. Think: I have new information at my current time step. Hence, I can have a better estimate now.

$$TDE = sample - V^\pi(s)$$

3. Let's say I want to update my new estimate. Then I would have to "correct the error" incrementally (implies a learning rate).

$$V^\pi(s)= V^\pi(s) + \alpha\ (sample - V^\pi(s))$$

We can see that this makes sense because if our alpha = 1, then we are completely wiping our previous knowledge ($V^\pi(s)$) and replacing it with our new found information (sample).

==The issue here is that we assume that each sample is representative of the environment.==

Finally, we arrive at our Q-learning equation: we really just replaced the optimal value with the optimal "next step value" that is my Q-value.

$$sample = R(s,a,s') + \gamma \ max_a'Q^*(s',a')$$

$$TD\ Error = [R(s,a,s') + \gamma \ max_{a'}Q_{old}(s',a')] - Q(s,a)$$

After we found the "loss", we want to move in the opposite direction to minimize this loss.

$$Q_{new}(s,a) = Q_{old}(s,a) + \alpha \ TD\ Error$$

Alternative form: just expand the equation and group Q old together.

$$Q_{new}(s,a) = (1-\alpha)Q_{old}(s,a) - \alpha[R(s,a,s') + \gamma \ max_{a'}Q(s',a')]$$