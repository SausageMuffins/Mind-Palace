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

let counter1 = asyncCounter();

counter1
    .then( incr("c1") )
    .then( incr("c1") )
    .then( incr("c1") )
    .catch( (reason) => console.log(`rejected: ${reason}.`))

let counter2 = asyncCounter();

counter2
    .then( incr("c2") )
    .then( incr("c2") )
    .then( incr("c2") )
    .catch( (reason) => console.log(`rejected: ${reason}.`))


process.nextTick(() => console.log("tick!"));
console.log("main done!")

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