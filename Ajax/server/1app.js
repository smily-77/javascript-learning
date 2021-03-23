// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
//获取post请求方式的参数的模块
const bodyParser = require('body-parser');
//读取文件的模块
const fs = require('fs');

// 创建web服务器
const app = express();

app.use(bodyParser.urlencoded());


// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));

// 对应01,09
app.get('/first', (req, res) => {
    res.send('Hello, Ajax');
});

//09
app.post('/first', (req, res) => {
    res.send('Hello, Ajax.post');
});

// 对应02html文件
app.get('/responseData', (req, res) => {
    res.send({ "name": "zs", "age": 10 });
});

app.post('/responseData', (req, res) => {
    res.send({ "name": "zs", "age": 10 });
});

//对应03文件
app.get('/get', (req, res) => {
    res.send(req.query)
});

// 对应04html文件
app.post('/post', (req, res) => {
    res.send(req.body);
});

//对应05文件
app.post('/json', (req, res) => {
    res.send(req.body)
});

//对应06文件
app.get('/server', (req, res) => {
    res.send('hello ajax')
});

//文件7
app.get('/error', (req, res) => {
    res.send('ok')
});

//文件08
app.get('/cache', (req, res) => {
    fs.readFile('./file1.txt', (err, result) => {
        res.send(result);
    });
});

// 监听端口
app.listen(3000);
// 控制台提示输出
console.log('服务器启动成功');