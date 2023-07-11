---
tags: SE
date:10-07-2023
type: 
 Note
 Incomplete
summary: 
---

# Definitions

| Term | Definition |
| ------- | ------- |
| Test   | an act to exercise software in test cases - to find faults, to build confidence (correct behaviours) |



---

# Tests

![[Pasted image 20230710141854.png]]

**Test Oracle:** usually another program that verifies the output of another program.

## Types of Testing

**Specification-Based Testing:** Black box, functional and behavioural testing
- [[Tests in Software Engineering#Test Cases|test cases]] are purely based on specifications - input and output are derived from the specifications
- goal to build confidence
- repeatable and each test case --> 1 use case

**Code-Based Testing:** White box testing
- finding ways to break the code (faults)
- usually would require internal knowledge of how the code works (eg: algorithms, structures etc)

---

## Test Cases

![[Pasted image 20230710142258.png]]

Mandatory information:
- Test Case ID - identify the exact test case for a scenario
- Description
- Precondition and Postcondition
- Inputs for program
- Outputs (expected) after running the program
- Log

Extra information:
- User ID - indicate which user is involved IF the test case is derived from a user requirement.

---

## Levels of Testing

| Abstraction Level          | Testing             |
| -------------------------- | ------------------- |
| Requirement Specifications | System Testing      |
| Preliminary Design         | Integration Testing - test related units & sub-components of the system |
| Detailed Design                           | Unit Testing - test singular (smallest) units                     |


### Unit Tests: testing at the smallest unit of code

Examples of a unit: Functions, Classes, Modules, UI Components etc.
Note: *Assumptions on input* must be from the specifications laid out at the start!


---

#### **Specification-based unit tests**

---

##### Boundary Value Testing: mainly for numerical / ordinal inputs

Considerations: focus on the boundary 
1. input range
2. valid ranges

**Assumptions**: to be able to starting writing test cases
1. programming language used is strongly typed
2. error is caused by one of the inputs but not both

Example:
1. find average of all of the input parameters for a function
2. fix all except one parameter as the average value
3. find extreme input values (lowest or highest possible) and it's expected output.
4. repeat step 2 to 3 until all parameters have it's respective test case

*What if my first assumption does not hold? ie. not strongly typed programming language*

We include inputs that results in an invalid value. This is also known as **robust boundary value testing.**

*what if **both** assumptions do not hold?*

Write extra test cases. This is also known as **robust worst boundary value testing.** - this is not ideal as they produce quite a lot of redundant test cases! To resolve this issue, we can use Equivalence Class Testing

---

##### Equivalence Class Testing: Mainly for categorical values

Pick different points and consider the expected output - valid / invalid. The main idea is to partition/categorise values that belong to certain categories

If we feel that there is a lack of points for certain categories (eg: valid outputs), we can just add them from the boundary value testing.

Number of test cases = permutations of number of categories

Example:

Test cases that have 3 different parameters and the number of partitions in each test case. (4, 5 and 2 partitions respectively)
Number of test cases = 4 x 5 x 2 = 40 

**Disadvantage:**
This is difficult if the input is very complex (results in many partitions) - eg: arrays - duplicates, empty, negatives and more.

To work around this disadvantage, we can utilize **decision table testing.**

---

##### Decision Table Testing

This form of testing is best used as a "last resort" - boundary values not very applicable and the input is too complex or dependent on each other.

Example: Dates - have to deal with leap years and varying days.

From the Equivalence Testing, we look at the possible different categories and plot them out in the table together with their actions. We do this to eliminate redundant and useless test cases.

Equivalence class for each input
● M1 = {month: month has 30 days}
● M2 = {month: month has 31 days except December}
● M3 = {month: month is December}
● M4 = {month: month is February}
● D1 = {day: 1 <= day <= 27
● D2 = {day: day = 28}
● D3 = {day: day = 29}
● D4 = {day: day = 30}
● D5 = {day: day = 31}
● Y1 = {year: year is a leap year}
● Y2 = {year: year is a common year}

![[Pasted image 20230711170518.png]]

![[Pasted image 20230711170545.png]]


We can see that we reduce from 40 test cases to 22. This is important as continual testing being reduced by half will speed up deploying and other stuff by a lot!


---

# Using Javascript to test

## Jest


---

