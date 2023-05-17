---
tags: SE
date: 15-05-2023
type: 
 Note
 Incomplete
summary: Methodologies and SLDC
---
## Software Development Life Cycle SDLC
The process to develop functional software as quickly as possible with minimum cost.

**The stages below do not necessarily need to have an order.**

---

#### Requirements
1. List down client's needs (functional) and wants (non-functional)
2. What is the context of the software - can help in our analysis

**More on Functionalities:**
Consider what is vital for the software to work - Needs. Everything else can be a non-functional requirements such as performance or a theme of the UI.

**More on context:**
Often, systems have multiple contexts (eg: service aspect and business aspect). Take into account these contexts and do the analysis/design respectively.

For instance, make sure the data is very secure if it's in the business aspect or a very friendly UI for a service aspect.

---

#### Analysis
In this part of SLDC, we want to understand how the requirements work together and how each requirement fit in the system. In the real world, we would need to **clarify and flush out more details** in the requirements.

**Important Questions to think about:**
- [ ] Are there any inconsistencies/contradictions in the requirements?
- [ ] Are there any ambiguity/vagueness to the requirements? 
- [ ] What are the key functional modules - do these fit the contexts (non-functional)?
- [ ] Can we abstract/categorize modules into a subsystem? (**analysis classes**)

The end goal of the analysis: **Domain Model**
1. Clear and well defined requirements/specifications
2. Analysis Classes
3. The relationships and connections between every entity/requirements of the system.

Open Questions that I have:



---

#### Design the system

There are multiple components in a system. We want to minimize overlaps between components so that we can minimize issues with syncing/integrating components later on during the implementation phase.

Naturally, every component/module will communicate with each other. Hence, establish the interactions between components clearly.

**Workflow:**
1. Consider the technology needed: programming language, platforms, devices, os etc
2. Break down the design into easily implemented problems (**implementation units**)

**Outcome:**
- [ ] Clear decomposed subsystem

---

#### Implementation

**Main Tasks:**
- Unit Testing
- System Integrations with other hardware - well integrated subsystems
- Devising the deployment model - deploy on client's server for eg. (How do we make sure the third-party libraries and dependencies are supported.)

---

#### Testing

**Main Tasks:**
- Test Cases (Focused on client's side) - manual and automatic testing
- Analyse test results and improve on the system.

**Testing my never be complete but try to make it as polished as possible.**

Continuous Implementation and Continuous Deployment (CICD)

---

## Methodologies:

#### CATAB
Stands for Code-a-bit-test-a-bit. This methodology is very common but is not suitable for a larger project/system.

---

#### Waterfall

![[sdlc_waterfall_model.jpg]]

A simple straight-forward model to develop software. Each phase should have documentation which serve as an input to the next phase. -> The end point will have a full set of documentation for the system.

**Why would we use this model?**
- Easy and straightforward projects
- Clear and simple planning of project - allows easy control and allocation of work
- Easy to estimate time and costs

**Why would we not use this model?**
- Not realistic -> many phases often overlap each other
- Waste time because of the strict sequential manner
- New requirements may be added or changed later on
- A bug/flaw is discovered late in the phases which can throw the development off track.

---

#### Rapid Prototyping

The idea of constantly building prototypes as quickly as possible and constantly clarifying with the client's requirements.

**The prototypes are not the final systems and are often "thrown away"**

The final system is built after the prototyping/requirements are flushed out.


---

#### Iterative and Incremental Development

Build part of the system and gradually add other sub systems to the software. In every SDLC, we build one sub-system on top of the previous subsystem and ensure it works.

Think of it as a jigsaw puzzle where different parts fall in place. But in finding the "correct piece", we go through the whole SLDC.

---

#### Agile Manifesto

It is slightly different from the previous methodologies where this methodology prioritizes speed. This methodology focuses on finishing as many features as possible in a limited time frame and it is highly collaborative. This methodology can also be iterative and comfortable in revising the entire feature or software.

**Main Characteristics:**
- Individuals and Interactions over processes and tools
- Value software, code and features
- Does not like contracts
- Constant revisions and iterations of the whole system

**Cons:**
- highly stressful
- hard to allocate work