//引入express框架
const express = require('express');
const path = require('path');
//引入body-parser模块处理post请求参数
const bodyParser = require('body-parser');
//引入express-session模块
const session = require('express-session');
//引入dateformate  规范日期格式
const dateFormat = require('dateformat');
//导入art-tempale模板引擎
const template = require('art-template');
//读取配置信息
const morgan = require('morgan');
//引入config模块 判断开发环境 读取配置信息
const config = require('config');

//创建服务器
const app = express();
//导入模板变量
template.defaults.imports.dateFormat = dateFormat;



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
    saveUninitialized: false, //添加 saveUninitialized 选项
    //设置过期时间
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }

}));

//连接数据库
require('./model/connect');

//测试创建数据库
/* require('./model/user') */

if (process.env.NODE_ENV == 'development') {
    //当前是开发环境
    console.log('当前是开发环境');
    //在开发环境中 将客户端发送到服务器的请求信息打印到控制台中
    app.use(morgan('dev'));

} else {
    console.log('当前是生产环境');
}

//

console.log(config.get('title'));


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


//捕获错误
app.use((err, req, res, next) => {
    //将字符串类型变为对象类型
    const result = JSON.parse(err);
    // res.redirect(`${result.path}?message=${result.message}`)
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr])
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`)


})


app.listen(80);
console.log('服务器启动成功');