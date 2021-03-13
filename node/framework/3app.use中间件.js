//引入express框架
const express = require('express');

//启动服务器
const app = express();
//引入express框架


//接收所有请求的中间件
app.use((req, res, next) => {
    console.log('app.use中间件请求');
    next();

});

//当客户访问/list时候走当前中间件
app.use('/list', (req, res, next) => {
    console.log('app.use /list中间件');
    next();
});


app.get('/request', (req, res) => {
    res.send('/request');

})



//监听端口
app.listen(3000);
console.log('服务器启动成功');