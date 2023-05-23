---
tags: SE
date: 19-05-2023
type: 
 Note
 Complete
summary: Notes on deciding on a software design and the software equation
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

Similar to the idea of inheritance where a subsystem have characteristics subset to another system. Alternatively, we can also consider different parts of the subsystem as one part of a larger system.

When we make relations and connections like this using a hierarchy, we can group them together and make the project clearer and easier to assign work.

---

## Software Equation

The model is to assess the effort needed to complete a project.

$$Effort= (\frac{Size}{Productivity \cdot Time^{4/3}})^3 \cdot B$$

| Variable     | Description                                                           |
| ------------ | --------------------------------------------------------------------- |
| Effort       | The amount of effort needed in effort-months.                         |
| Size         | The number of lines of code (LOC)                                     |
| Productivity | Initial constant value (see table below)                              |
| Time         | The amount of time required to complete the project (months or years) |
| Special Skills (B)             | Also related to the size of project                                                                       |

#### Productivity Table
| Productivity Value | Description                 |
| ------------------ | --------------------------- |
| 2000               | Real time embedded software |
| 10000              | Telecommunication software  |
| 12000              | Scientific Software         |
| 28000                   | Business System Application                             |

#### B Table

![[Pasted image 20230521214904.png]]

#### Extra Notes
1. Be careful when calculating the effort value. eg: if break is taken, the value of the time should decrease.
2. We can calculate the number of developers needed for the project by dividing the effort value found in the equation by the time frame that we have.

---