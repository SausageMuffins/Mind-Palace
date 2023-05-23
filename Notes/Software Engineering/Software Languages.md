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


#### [[Software Languages#Diagrams|Diagrams]]

Using many diagrams (UML, State machine etc) for documentation and display relations.

**Mainly for modelling and showing relationships between classes/sub-systems**: [[Software Development Process#Design the system|Documentation in the Design Stage]]

---

## Use Cases

In a system, there can be multiple players - administrators, customers, maintenance engineers etc. The main concept here is to ==describe all of the ways a system can be used by the various players.== (as a high level idea)

This can be done with the **Use Case Document**
| Components of Use Case Document | Description                                 |
| ------------------------------- | ------------------------------------------- |
| Name                            | Should be self-explanatory for the use case |
| Objective                       | The goal of the use case                    |
| Actor                           | Which player does it involved - **pay attention to the player's context**              |
| Constraints                     | Rules and limitations                       |
| Flow                                | What the system does when the player interacts with it                                             |

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



