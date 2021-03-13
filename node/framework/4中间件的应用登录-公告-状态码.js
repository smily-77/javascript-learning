const express = require('express');
const app = express();

/* //网站公告
app.use((req, res, next) => {
    res.send('当前网站正在维护......');
}) */

app.use('/admin', (req, res, next) => {
    let silogin = false;
    //如果用户登录
    if (silogin) {
        //请求向下执行
        next();
    } else {
        //如果用户没有登录 直接对客服端做出响应
        res.send('您还没有登录，不能访问当前界面');
    }
});

app.get('/admin', (req, res) => {
    res.send('您已经登录，可以访问当前界面');
});

app.use((req, res, next) => {
    res.status(404).send('当前访问页面不存在');
    //status设置状态码

})

app.listen(3000);
console.log('服务器启动成功');