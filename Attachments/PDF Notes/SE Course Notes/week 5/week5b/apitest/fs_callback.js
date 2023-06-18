import { writeFile } from 'node:fs';
const txt = "hello";
writeFile('save.txt', txt, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
}); 