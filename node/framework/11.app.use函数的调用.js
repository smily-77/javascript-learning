const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(fn({ a: 2 }));

function fn(obj) {
    return function(req, res, next) {
        if (obj.a == 1) {
            console.log(req.url);
        } else {
            console.log(req.method)
        }
        next();
    }
}



app.listen(3000);
console.log('服务器启动成功');