//引入express框架
const express = require('express');
//创建路由对象
const home = express.Router();
//创建二及路由
home.get('/', (req, res) => {
    res.send('博客首页');
});
//将路由对象作为模块成员进行导出
module.exports = home;