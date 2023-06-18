function asyncCounter()  {
    var count = 0;
    return new Promise( (resolve, reject) => {
        console.log("executor fired");
        resolve(count);
    });
}

/*
function incr(count) {
    console.log(count);
    return ++count;
}
*/

function incr(count) {
    console.log(count);
    return new Promise( (resolve, reject) => {
        console.log(count);
        resolve(++count);
    });
}

let counter = asyncCounter();


counter
    .then( incr )
    .then( incr )
    .then( incr )

console.log("main ended");
/*
  0
  1
  2 
 */