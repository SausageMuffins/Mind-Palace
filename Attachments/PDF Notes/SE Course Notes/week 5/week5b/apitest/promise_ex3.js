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

// catch then re-reject
function reject_again(reason) {
    console.log(`re-reject: ${reason}`);
    return new Promise((resolve, reject) => {
        reject(reason);
    })
}

// catch then done
function done(reason) {
    // console.log(`handling: ${reason}, resolved.`);
    return new Promise((resolve, reject) => {
        resolve(reason);
    })
}

let counter = asyncCounter();

counter
    .then( incr, reject_again )
    .then( incr, reject_again )
    .then( incr, reject_again )
    .then( incr, reject_again )
    .catch( (reason) => {console.log(`rejected: ${reason}.`); return 0;})
    .then( incr, reject_again )

/*
  0
  1
  2
  re-reject: limit reached 
  rejected: limit reached.
  0
 */