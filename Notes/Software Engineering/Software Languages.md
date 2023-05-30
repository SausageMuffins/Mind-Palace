---
tags: SE
date: 22-05-2023
type: 
 Note
 Incomplete
summary: Choice of language for communicating everything software related.
---

## Spectrums

#### Natural Language

The general English/comprehensible language. This is the highest level of the various programming languages that cannot be executed by the machine. 

**Mainly for communicating requirements**: [[Software Development Process#Requirements|Establishing Requirements Stage]]

#### Programming Languages

The higher higher levels of programming languages like python or C for machines to carry out tasks. These level of programming language must be precise.

**Mainly for machines to execute instructions (code)**: [[Software Development Process#Implementation|Implementation Stage]]


#### Diagrams

Using many diagrams (UML, State machine etc) for documentation and display relations.

**Mainly for modelling and showing relationships between classes/sub-systems**: [[Software Development Process#Design the system|Documentation in the Design Stage]]

Types:
1. [[Software Languages#Use Case Diagrams|Use case diagrams]]
2. Sequence Diagrams
3. Class Diagrams



---

## Use Cases

In a system, there can be multiple players - administrators, customers, maintenance engineers etc. The main concept here is to ==describe all of the ways a system can be used by the various players.== (as a high level idea)

This can be done with the **Use Case Document**

| Components of Use Case Document | Description                                 |
| ------------------------------- | ------------------------------------------- |
| Name                            | Should be self-explanatory for the use case |
| Objective                       | The goal of the use case                    |
| Actor                           | Which player (human) does it involved - **pay attention to the player's context**              |
| Constraints                     | Rules and limitations                       |
| Flow                                | What the system does when the player interacts with it                                             |

#### More on Actors

Questions to consider to determine the actors:
- Who/what is/are the target of the system?
- Who/what changes the data of the system?
- Who/what interacts with the interface of the system?

==Another machine can also be the actor.== eg: Printers or sub-systems.

#### More on Constraints

Each constraint should also define the pre-condition, post-condition and the invariants. 

Pre and Post conditions must be user observable states

| Constraint Definitions | Descriptions                                                |
| ---------------------- | ----------------------------------------------------------- |
| Pre-Conditions         | A state that must happen before the use case   |
| Post-Conditions        | A state that is **true** once the use case is completed |
| Invariants                       | States/Variables that are **always true** throughout the use case - eg: valid customer ID                                                          |

#### More on Flows

| Types of Flows   | Description                         |
| ---------------- | ----------------------------------- |
| Basic Flow       | Most common (normal) pathway        |
| Alternative Flow | Less common (special/edge cases) pathway |
| Exception Flow                 |     An pathway to handle various errors                                 |


#### Use Case Diagrams

Diagrams are another way to show the interactions of the primary and secondary players.

Information to capture in the use case diagram:
1. The use cases - usually a verb (action)
2. Pre-condition (what precedes the use case)
3. Relationships between use cases (linked to point 1)

![[Pasted image 20230523161922.png]]

==The use case should only cover the key features of the app== - the extra details will be covered in the sequence diagram. 

---

## Misuse Cases

Note that misuse case diagrams are technically also use cases but are not expected/wanted.

For example: Hacking, Loop-holes, DDOS.

Consider use cases to fight back the misuse cases (attacks).

![[Pasted image 20230523170310.png]]

---

## Sequences

Sequences go into detail of a use case. They are typically represented with sequence diagrams to see the sequence of actions needed by the user.

The two main characteristics that show sequences are ==component and message symbols==

There can also be **==alternatives==** to represent alternative use cases in our sequence diagrams. They are essentially just IF and ELSE statements.

#### Sequence Diagrams

| Component Symbols       | Description                    |
| ------------- | -------------------------- |
| **Lifelines** | Represent objects or roles |
|     **Activation Box**          |        Represent time needed to complete task                    |


| Message Symbols | Description                                     |
| --------------- | ----------------------------------------------- |
| Solid Arrows    | Sending ==synchronous== messages to another object |
| Stick Arrows                 | Sending ==asynchronous== messages to another object                                                 |

**Sending should precede receiving.**

![[Pasted image 20230529135125.png]]

Example Sequence Diagram:

![[Pasted image 20230529134734.png]]


#### Additional Concepts

**Time-out Messages:** 
These messages are only sent after waiting for a period of time. For example, we can wait for the callee to pick up for 1 min. If we don't receive a response after 1 min, we should hang-up (this hanging up is the time-out message to the switch)

**Parallel Messages:**
These messages are self-explanatory - when we want to do more than 1 thing at the same time.

![[Pasted image 20230529140008.png]]

---

## Class Diagrams

The classic UML Diagrams.

To describe how a class diagram relates to another, we use the arrows below:

![[Pasted image 20230529144056.png]]


Some explanations for not so straightforward terms:

- Aggregation: "part-of"
- Association: could be bi or uni-directional (relationship between two classes)

![[Pasted image 20230529144408.png]]

**==Always read from the side with no numbers first==**

