import XMLHttpRequest from 'xhr2';
import { writeFile } from 'node:fs';

var xhr = new XMLHttpRequest();
var args = process.argv;
if (args.length > 2) {
    var input = args[2];
    let apiPromise = new Promise( function (resolve, reject) {
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var res = xhr.responseText;
                resolve(res);
            }
        };
        xhr.open('GET', `https://postman-echo.com/get?x=${input}`);
        xhr.send();
    });

    function feedResultToFile(result) {
        return new Promise( function (resolve, reject) {
            writeFile('api_result.txt', result, (err) => {
                if (err) { 
                    reject(err);
                } else {
                    resolve('The file has been saved!');
                } 
            }); 
        });
    }
    apiPromise.then(feedResultToFile).then( (res) => console.log(res)).catch((err) => console.log(err)) ;
} else {
    console.log("USAGE: node api_fs_callback_2nd_attempt input");
}
