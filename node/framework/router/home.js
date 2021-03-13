//引入express框架
const express = require('express');
//创建路由对象
const home = express.Router();
//创建二级路由
home.get('/index', (req, res) => {
    res.send('博客首页');
})

module.exports = home;