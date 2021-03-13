//引入express框架
const express = require('express');
//创建服务器
const app = express();

const home = require('./router/home');
const admin = require('./router/admin');

//为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

app.listen(3000);
console.log('服务器启动成功');