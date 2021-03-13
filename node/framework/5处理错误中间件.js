const express = require('express');
const app = express();

const fs = require('fs');

app.get('/index', (req, res, next) => {
    // throw new Error('服务器没有连接');
    //res.send('程序正常执行');

    //异步代码错误处理中间件
    fs.readFile('./2中间件.js', 'utf8', (err, result) => {
        if (err != null) {
            next(err);
        } else {
            res.send(result);
        }
    })
});

// app.use((err, req, res, next) => {
//     res.status(500).send(err.message);
// });


app.listen(3000);
console.log('服务器启动成功');