//导入express框架
const express = require('express');
//引入express-session模块
const session = require('express-session');

//创建路由模块
const admin = express.Router();


//渲染登录界面
admin.get('/login', require('./admin/loginPage'));

//实现登录功能
admin.post('/login', require('./admin/login'));

// 实现退出功能
admin.get('/logout', require('./admin/logout'));

//创建用户编辑信息路由
admin.get('/user-edit', require('./admin/user-edit'));

//处理新增用户功能
admin.post('/user-edit', require('./admin/user-edit-fn'));

//进入用户界面
admin.get('/user', require('./admin/userPage'));

//修改
admin.post('/user-modify', require('./admin/user-modify'));

//建立删除用户路由
admin.get('/delete', require('./admin/user-delete'));

//建立文章列表路由
admin.get('/article', require('./admin/article'));

//建立文章编辑路由
admin.get('/article-edit', require('./admin/article-edit'));

//建立文章添加页面路由
admin.post('/article-add', require('./admin/article-add'))


//将路由对象作为模块成员进行导出
module.exports = admin;