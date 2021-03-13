//引入express框架
const express = require('express');
//创建网站服务器
const app = express();
app.get('/', (req, res) => {
    res.send('hello express')
})
app.get('/list', (req, res) => {
    res.send({ name: '张三', age: '12' })
})

//监听端口
app.listen(3000);
console.log('网站服务器启动成功');