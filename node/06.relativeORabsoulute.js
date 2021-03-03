const fs = require('fs');
const path = require('path');

console.log(__dirname);
console.log(path.join(__dirname, 'hello.js'));

fs.readFile(path.join(__dirname, 'hello.js'), 'utf8', (err, doc) => {
    console.log(err);
    console.log(doc);
})