import fetch from 'node-fetch';
import { promises } from 'node:fs';


var args = process.argv;
if (args.length > 2) {
    var input = args[2];
    let apiPromise = fetch(`https://postman-echo.com/get?x=${input}`);
    apiPromise
        .then((response) => response.text())
        .then((text) => promises.writeFile('api_result.txt', text))
        .then((res) => { 
            console.log('The file has been saved!'); 
            return res;
        })
        .catch((err) => console.log(err));
} else {
    console.log("USAGE: node api_fs_call_back_3rd_attempt input");
}