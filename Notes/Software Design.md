---
tags: SE
date: 19-05-2023
type: 
 Note
 Incomplete
summary: Notes on deciding on a software design
---

## Rational Model

**Inputs:**
1. Data for software system and Desired Data (output)
2. ==Utility Function== - how good the design is (performance of algorithm, accuracy of the system or even the financial cost of the system)
3. Constraints
4. Design Tree of Decisions

![[Pasted image 20230519094932.png]]


---

## Complexity
As time goes, the software design can become increasingly complex and have many features. Because of this, we need to consider how to resolve the complexity of our software so that the project can be done within the allocated time / budget.

The concepts below help us to work with complex projects.

---

#### Decomposition
Break down the problem into smaller and simpler problems to deal with. This is very similar to the divide and conquer principle - the difference is that this is related to software design and not about code.

==Coupling:== dependencies between functions or sub systems.

**We want to minimize coupling**. The implication of reducing dependencies makes our software modular, easier to implement and even better security. More importantly, in the implementation stage, it can minimize synchronization issues.

==Cohesion:== group functions/modules together according to a central theme (eg: gps, database etc)

**We want to maximize cohesion.** The implication of grouping similar functions together can help us with modularity, reusability and clarity. High cohesion establish the subsystems well and reduce ambiguity.

---

#### Abstraction
We hide the details and only show the main idea of the design. A good way to demonstrate abstraction in software design is to use ==implement an interface between sub-systems==. Your project mates should only need to deal with the general idea/key aspects of your sub-system.

Defining Interfaces:
Think of it as a design plan/blueprint. The idea is to not decide how it is implemented, but to design what must be implemented.

Consider the entities in the system and the subsystems.

---

#### Hierarchy
INHERITANCE