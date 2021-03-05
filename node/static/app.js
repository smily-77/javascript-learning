//1引入系统模块http
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime');
//2.创建网站服务器
const app = http.createServer();



//3.为网站服务器对象添加请求事件
app.on('request', (req, res) => {
    res.writeHead(200, {
        'content-type': 'text/html;charset=utf8' //  指定内容编码 可以显示中文
    });
    //获取用户请求路径
    let pathname = url.parse(req.url).pathname;
    pathname = pathname == '/' ? '/default.html' : pathname;

    //将用户的请求路径转换为实际的服务器硬盘路径  __dirname获取当前目录的绝对路径
    let realPath = path.join(__dirname, 'public' + pathname);

    //获取文件类型
    let type = mime.getType(realPath);

    //读取文件
    fs.readFile(realPath, (error, result) => {
        //如果文件读取失败
        if (error != null) {
            res.writeHead(404, {
                'content-type': 'text/html;charset=utf8' //  指定内容编码 可以显示中文
            });
            res.end('文件读取失败');
            return;
        }
        res.writeHead(200, {
            'content-type': type //提供文件类型
        })
        res.end(result)
    });

});
app.listen(3000);
console.log('网站服务器启动成功');