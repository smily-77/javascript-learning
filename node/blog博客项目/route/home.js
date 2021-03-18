//引入express框架
const express = require('express');
//创建路由对象
const home = express.Router();
//博客首页展示页面
home.get('/', require('./home/index'));
//博客文章详情展示页面
home.get('/article', require('./home/article'));
//文章评论
home.post('/comment', require('./home/comment'));
//将路由对象作为模块成员进行导出
module.exports = home;