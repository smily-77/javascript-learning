//引入http模块
const http = require('http');
//引入模板引擎
const template = require('art-template');
//引入path进行字符串拼接
const path = require('path');

//引入serve-static模块，进行静态页面的处理
const serveStatic = require('serve-static');

//引入日期处理模块
const dateformat = require('dateformat');
//向模板中导入变量  处理日期格式的方法
template.defaults.imports.dateformat = dateformat;

//实现静态访问服务
const serve = serveStatic(path.join(__dirname, 'public'));

//获取模板的根目录
template.defaults.root = path.join(__dirname, 'views');


//导入路由文件
const router = require('./router/index');
//导入连接数据库
require('./model/connect');

//创建网站服务器
const app = http.createServer();

//当客户访问服务器端的时候
app.on('request', (req, res) => {
    router(req, res, () => {})
    serve(req, res, () => {})
});

app.listen(80);
console.log('服务器启动成功');