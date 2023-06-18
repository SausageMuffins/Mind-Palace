import fetch from 'node-fetch';
import { promises } from 'node:fs';


var args = process.argv;
if (args.length > 2) {
    var input    = args[2];
    let response = await fetch(`https://postman-echo.com/get?x=${input}`);
    let text     = await response.text();
    let res      = await promises.writeFile('api_result.txt', text);
    console.log('The file has been saved!');
} else {
    console.log("USAGE: node index.js input");
}