// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
// 接收post请求参数
const formidable = require('formidable');
// 实现session功能
var session = require('express-session');
// 创建web服务器
const app = express();
// 接收post请求参数

// 实现session功能
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));


//实现cors跨域资源共享
/* app.use((req, res, next) => {
    //1.谁可以访问
    res.header('Access-Control-Allow-Origin', '*');
    //2.通过上面方式访问
    res.header('Access-Control-Allow-Methods', 'post,get');
    next();
}) */

app.get('/test', (req, res) => {
    const result = 'fn({name: "张三"})';
    res.send(result);
});

app.get('/better', (req, res) => {
    //获取传递客户端传递过来的函数名
    /* const callback = req.query.callback;
    var data = JSON.stringify({ name: 'zhanggg' })
    const result = callback + '(' + data + ')';
    res.send(result); */
    //上面的简单方法
    res.jsonp({ name: 'lisi', age: 23 });
})


app.get('/access', (req, res) => {
    res.send('ok')
})



//实现cors跨域资源共享
app.use((req, res, next) => {
    //1.谁可以访问
    // * 代表允许所有的客户端访问
    //注意  ：如果跨域请求种涉及到 cookie信息的传递，值不可以为 * 号 ，比如为具体的域名信息
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    //2.通过上面方式访问
    res.header('Access-Control-Allow-Methods', 'post,get');
    //3.跨越请求时允许携带cookie信息
    res.header('Access-Control-Allow-Credentials', true);
    next();
})



//登录
app.post('/login', (req, res) => {
    //创建表单解析对象
    var form = formidable.IncomingForm();
    //解析表单
    form.parse(req, (err, fields, file) => {
        const { username, password } = fields;
        //密码比对
        if (username == 'zjw' && password == '123456') {
            //设置session 
            req.session.isLogin = true;
            res.send({ message: '登录成功' });
        } else {
            res.send({ message: '登录失败，用户名或密码错误' })
        }
    })
});

//检测登录状态
app.get('/checkLogin', (req, res) => {
    if (req.session.isLogin) {
        res.send({ message: '处于登录状态' });
    } else {
        res.send({ message: '没有登录' })
    }
})




// 监听端口
app.listen(3001);
// 控制台提示输出
console.log('服务器启动成功');