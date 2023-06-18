function asyncCounter()  {
    var count = 0;
    return new Promise( (resolve, reject) => {
        resolve(count);
    });
}

function incr(count) {
    console.log(count);
    return new Promise((resolve, reject) => {
        if (count > 1) {
            reject("limit reached");
        } else {
            resolve(++count);
        }
    }); 
}

let counter = asyncCounter();

counter
    .then( incr )
    .then( incr )
    .then( incr )
    .then( incr )
    .catch( (reason) => console.log(`rejected: ${reason}.`))

/*
  0
  1
  2 
  rejected: limit reached.
 */