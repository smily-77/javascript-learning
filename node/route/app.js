//1引入系统模块http
const http = require('http');
const url = require('url');
//2.创建网站服务器
const app = http.createServer();

//3.为网站服务器对象添加请求事件
app.on('request', (req, res) => {
    //4.实现路由功能
    //4.1获取请求方式
    const method = req.method.toLowerCase(); //toLowerCase()转化为小写
    //4.2获取请求地址
    const pathname = url.parse(req, url).pathname;

    res.writeHead(200, {
        'content-type': 'text/html;charset=utf-8' //可以显示中文
    });
    if (method == 'get') {
        if (pathname == '/' || pathname == '/index') {
            res.end('欢迎来到首页')
        } else if (pathname == '/list') {
            res.end('欢迎来到列表页')
        } else {
            res.end('您访问的页面不存在')
        }

    } else if (method == 'post') {

    } else {

    }


});
app.listen(3000);
console.log('网站服务器启动成功');