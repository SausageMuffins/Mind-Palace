import { writeFile } from 'node:fs';

function asyncCounter()  {
    var count = 0;
    return new Promise( (resolve, reject) => {
        resolve(count);
    });
}

function incr(id) {
    return function (count) {
        console.log(`${id}:${count}`);
        return new Promise((resolve, reject) => {
            if (count > 1) {
                reject("limit reached");
            } else {
                resolve(++count);
            }
        }); 
    };
}

let counter3 = asyncCounter();

counter3
    .then( incr("c3") )
    .then( incr("c3") )
    .then( incr("c3") )
    .catch( (reason) => console.log(`rejected: ${reason}.`))

let counter4 = asyncCounter();

writeFile('dummyfile.txt', "dummy", (err) => {
    if (err) throw err;
    console.log('The file has been saved!')
    counter4
        .then( incr("c4") )
        .then( incr("c4") )
        .then( incr("c4") )
        .catch( (reason) => console.log(`rejected: ${reason}.`));
}); 

process.nextTick(() => console.log("tick!"));





/*
c1:0
c2:0
c1:1
c2:1
c1:2
c2:2
rejected: limit reached.
rejected: limit reached.
tick!
*/