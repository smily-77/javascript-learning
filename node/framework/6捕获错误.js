const express = require('express');
const fs = require('fs');
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);

const app = express();

app.get('/index', async(req, res, next) => {
    try {
        await readFile('./demo.js');
    } catch (ex) {
        next(ex);
    }
});

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
})



app.listen(3000);
console.log('服务器启动成功');