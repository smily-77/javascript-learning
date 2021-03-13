//引入express框架
const express = require('express');
const path = require('path');
//引入body-parser模块处理post请求参数
const bodyParser = require('body-parser');
//引入express-session模块
const session = require('express-session');
//创建服务器
const app = express();

//用什么样的模板引擎渲染什么样的后缀文件
app.engine('art', require('express-art-template'));
//设置模板文件的默认路径
app.set('views', path.join(__dirname, 'views'));
//设置模块文件的默认后缀名
app.set('view engine', 'art');

//拦截所有请求
//1.extended:false  方法内部使用queryString模块处理请求参数
//2.extended:true  方法内部使用第三方模块qs处理请求参数格式
app.use(bodyParser.urlencoded({ extended: false }));

//配置session环境
app.use(session({
    secret: 'secret key',
    resave: false, //添加 resave 选项
    saveUninitialized: true, //添加 saveUninitialized 选项
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }

}));

//连接数据库
require('./model/connect');

//测试创建数据库
/* require('./model/user') */


//引入路由模块
const admin = require('./route/admin');
const home = require('./route/home');

//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

//拦截请求 判断用户请求状态
app.use('/admin', require('./middleware/loginGuard'));



//为路由模块匹配请求路径
app.use('/home', home);
app.use('/admin', admin);





app.listen(80);
console.log('服务器启动成功');