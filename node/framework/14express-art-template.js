const express = require('express');
const path = require('path');
const app = express();

//告诉express框架使用什么样的模板引擎渲染什么样的后缀文件
//1.模板后缀  2.使用的模板引擎
app.engine('art', require('express-art-template'));

//告诉express框架模板存放的位置
app.set('views', path.join(__dirname, 'views'));

//告诉express框架模板的默认后缀
app.set('view engine', 'art');

app.get('/index', (req, res) => {
    //1拼接模板路径
    //2.拼接模板后缀
    //3哪个模板和哪个数据进行拼接
    //4将拼接结果响应给客户端
    res.render('index', {
        meg: '我是meg'
    })
});

app.listen(3000);
console.log('服务器启动成功');