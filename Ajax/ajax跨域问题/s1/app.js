// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
// 向其他服务器端请求数据的模块
const request = require('request');
// 创建web服务器
const app = express();
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));


//服务端实现跨域资源共享
app.get('/first', (req, res) => {
    request('http://localhost:3001/access', (err, response, body) => {
        res.send(body)
    })
});



app.get('/base', (req, res) => {
    res.send({ name: 'zhangss', age: 23 })
});


app.post('/base', (req, res) => {
    setTimeout(() => {
        res.send({ name: 'zhangss', age: 23 })
    }, 2000)

});


//restful api风格
//获取用户列表信息路由
app.get('/users', (req, res) => {
    res.send('当前是用户列表信息页面路由')
});

//获取某一个用户信息路由
app.get('/users/:id', (req, res) => {
    var id = req.params.id;
    res.send(`当前是获取id为${id}的用户列表信息`);
});

//修改某用户信息路由
app.put('/users/:id', (req, res) => {
    var id = req.params.id;
    res.send(`当前是修改用户id为${id}用户信息`)
});

//删除某用户信息路由
app.delete('/users/:id', (req, res) => {
    var id = req.params.id;
    res.send(`当前是删除id用户为${id}的用户信息`)
})


//XML
app.get('/xml', (req, res) => {
    res.header('content-type', 'text/xml');
    res.send('<message><title>消息标题</title><content>消息内容</content></message>');

})







// 监听端口
app.listen(3000);
// 控制台提示输出
console.log('服务器启动成功');