//引入express框架
const express = require('express');
//创建网站服务器
const app = express();
//引入body-parser第三方模块
const bodyParser = require('body-parser');

//拦截所有请求
//extended:false 方法内部使用querystring模块处理请求参数
//extended:true方法内部使用第三方模块qs处理请求参数格式
app.use(bodyParser.urlencoded({ extended: false }));
//接受请求
app.post('/add', (req, res) => {
    //接收请求参数
    res.send(req.body);
});


app.listen(3000);
console.log('服务器启动成功');