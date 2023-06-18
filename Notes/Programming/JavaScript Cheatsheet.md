---
tags: CheatSheet
date: 09-06-2023
type: Overview
summary: 
---

## Terminology

1. **Callbacks**: functions that are executed after its parent function (usually an asynchronous operation) has completed. ==Callbacks **associated with asynchronous operations** are added to the macro queue whereas callbacks associated with promises are added to micro queue.

2. **Callback Registry**: The place where callbacks are stored. When an event happens (like a user clicking a button), the corresponding callback (function) is looked up in the registry and then invoked.

3. **Frames**: refer to a stack frame which is used to manage function calls and execution context.

4. **Micro and Macro Task Queues**: these are simply queues of tasks to be completed by the computer system. Micro task queue adds promises whereas macro queues adds functions to the queue. ==Micro tasks go first==

5. **Event Loop**: constantly check for tasks in both the micro and macro queues to execute --> prioritizing micro tasks first to ensure promises are fulfilled first. 

6. **API:** stands for [[System Calls#System Calls via API|application programming interface]] and it simply defines the "contract" (rules and protocols for data types, methods etc) for working with another software application.


---
## Basics

### Variables
```js
var a;                          // variable
var b = "init";                 // string
var c = "Hi" + " " + "Joe";     // = "Hi Joe"
var d = 1 + 2 + "3";            // = "33"
var e = [2,3,5,8];              // array
var f = false;                  // boolean
var g = /()/;                   // RegEx
var h = function(){};           // function object
const PI = 3.14;                // constant
var a = 1, b = 2, c = a + b;    // one line
let z = 'zzz';                  // block scope local variable
```

### If - Else
**JS does not have an ELIF !**
```js
if ((age >= 14) && (age < 19)) {        // conditions
status = "Eligible.";               // executed if condition is true
} else {                                // else block is optional
status = "Not eligible.";           // executed if condition is false
}
```

**It does however have switches**
```js
switch (new Date().getDay()) {      // input is current day
case 6:                         // if (day == 6)
	text = "Saturday";          
	break;
case 0:                         // if (day == 0)
	text = "Sunday";
	break;
default:                        // else...
	text = "Whatever";
}
```

### Loops
#### For Loops
```js
for (var i = 0; i < 10; i++) {
document.write(i + ": " + i*3 + "<br />");
}

var sum = 0;
for (var i = 0; i < a.length; i++) {
sum + = a[i];
}               // parsing an array

html = "";
for (var i of custOrder) {
html += "<li>" + i + "</li>";
}

for (var i = 0; i < 10; i++) {
if (i == 5) { break; }          // stops and exits the cycle
document.write(i + ", ");       // last output number is 4
}

for (var i = 0; i < 10; i++) {
if (i == 5) { continue; }       // skips the rest of the cycle
document.write(i + ", ");       // skips 5
}
```

#### While Loops
```js
var i = 1;                      // initialize
while (i < 100) {               // enters the cycle if statement is true
i *= 2;                     // increment to avoid infinite loop
document.write(i + ", ");   // output
}
```

**Do While Loops**
```js
var i = 1;                      // initialize
do {                            // enters cycle at least once
i *= 2;                     // increment to avoid infinite loop
document.write(i + ", ");   // output
} while (i < 100)               // repeats cycle if statement is true at the end
```


### Data Types

**An overview for all data types available in JS**
```js
var age = 18;                           // number type
var name = "Jane";                      // string
var name = {first:"Jane", last:"Doe"};  // object
var truth = false;                      // boolean
var sheets = ["HTML","CSS","JS"];       // array
var a; typeof a;                        // undefined
var a = null;                           // value null
```

#### Strings
```js
var abc = "abcdefghijklmnopqrstuvwxyz";
var esc = 'I don\'t \n know';   // \n new line
var len = abc.length;           // string length

abc.indexOf("lmno");            // find substring, -1 if doesn't contain 
abc.lastIndexOf("lmno");        // last occurance
abc.charAt(2);                  // character at index: "c"

abc.slice(3, 6);       // cuts out "def", negative values count from behind

abc.replace("abc","123");   // find and replace, takes regular expressions
abc.toUpperCase();              // convert to upper case
abc.toLowerCase();              // convert to lower case

abc.concat(" ", str2);          // abc + " " + str2

abc.split(",");            // splitting a string on commas gives an array
abc.split("");             // splitting on characters

128.toString(16);          // number to hex(16), octal (8) or binary (2)
abc.charCodeAt(2);              // character code at index: "c" -> 99
```

#### Numbers
```js
var pi = 3.141;

pi.toFixed(0);          // returns 3
pi.toFixed(2);          // returns 3.14 - for working with money
pi.toPrecision(2)       // returns 3.1
pi.valueOf();           // returns number

Number(true);           // converts to number
Number(new Date())      // number of milliseconds since 1970

parseInt("3 months");   // returns the first number: 3
parseFloat("3.5 days"); // returns 3.5

Number.MAX_VALUE        // largest possible JS number
Number.MIN_VALUE        // smallest possible JS number

Number.NEGATIVE_INFINITY// -Infinity
Number.POSITIVE_INFINITY// Infinity
```

### Dates
```js
var d = new Date();

Date("2017-06-23");                 // date declaration
Date("2017");                       // is set to Jan 01
Date("2017-06-23T12:00:00-09:45");  // date - time YYYY-MM-DDTHH:MM:SSZ
Date("June 23 2017");               // long date format
Date("Jun 23 2017 07:45:00 GMT+0100 (Tokyo Time)"); // time zone

a = d.getDay();     // getting the weekday

getDate();          // day as a number (1-31)
getDay();           // weekday as a number (0-6)
getFullYear();      // four digit year (yyyy)
getHours();         // hour (0-23)
getMilliseconds();  // milliseconds (0-999)
getMinutes();       // minutes (0-59)
getMonth();         // month (0-11)
getSeconds();       // seconds (0-59)
getTime();          // milliseconds since 1970

// Setting the date
d.setDate(d.getDate() + 7); // adds a week to a date

setDate();          // day as a number (1-31)
setFullYear();      // year (optionally month and day)
setHours();         // hour (0-23)
setMilliseconds();  // milliseconds (0-999)
setMinutes();       // minutes (0-59)
setMonth();         // month (0-11)
setSeconds();       // seconds (0-59)
setTime();          // milliseconds since 1970)
```

---
## Math
**Logic**
```js
a * (b + c)         // grouping
!(a == b)           // logical not
a != b              // not equal
typeof a            // type (number, object, function...)
x << 2  x >> 3      // binary shifting
a = b               // assignment
a == b              // equals
a != b              // unequal
a === b             // strict equal
a !== b             // strict unequal
a < b   a > b       // less and greater than
a <= b  a >= b      // less or equal, greater or eq
a += b              // a = a + b (works with - * %...)
a && b              // logical and
a || b              // logical or
```

**Math Library**
```js
var pi = Math.PI;       // 3.141592653589793
Math.round(4.4);        // = 4 - rounded, 4.5 round to 5
Math.ceil(3.14);        // = 4 - rounded up
Math.floor(3.99);       // = 3 - rounded down
Math.abs(-3.14);        // = 3.14 - absolute, positive value

Math.sin(0);            // = 0 - sine
Math.cos(Math.PI);      // OTHERS: tan,atan,asin,acos,

Math.min(0, 3, -2, 2);  // = -2 - the lowest value
Math.max(0, 3, -2, 2);  // = 3 - the highest value

Math.log(1);            // = 0 natural logarithm 
Math.exp(1);            // = 2.7182pow(E,x)
Math.pow(2,8);          // = 256 - 2 to the power of 8
Math.sqrt(49);          // = 7 - square root 

Math.random();          // random number between 0 and 1
Math.floor(Math.random() * 5) + 1;  // random integer, from 1 to 5
```

---
## Global Functions



---
## Errors

### Exceptions


---
## Promises

An object that describes the state of an asynchronous task.

Pending: Initial state -> task is still happening
Fulfilled: Task is completed --> use the **resolve()** callback
Rejected: Task failed --> use the **reject()** callback

Example Code:
```js
const fetchData = () => {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = 'Some data';
      if (data) {
        resolve(data); // Operation succeeded - return data value
      } else {
        reject(new Error('Data not found')); // Operation failed - return error object
      }
    }, 2000); // 2000ms --> 2 seconds
  });
};

fetchData()
  .then((result) => { // fulfilled promise
    console.log('Data:', result); // Executed when the promise is resolved
  })
  .catch((error) => { // rejected promise
    console.log('Error:', error); // Executed when the promise is rejected
  });

```

==Promises allow you to write asynchronous code in a more structured and readable manner, avoiding deeply nested callbacks (known as "callback hell") and facilitating error handling.==

---

