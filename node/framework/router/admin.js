//引入express框架
const express = require('express');
//创建路由对象
const admin = express.Router();
//创建二级路由
admin.get('/index', (req, res) => {
    res.send('博客管理页面');
});

module.exports = admin;