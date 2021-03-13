const express = require('express');
const path = require('path');
const app = express();

app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');

app.locals.users = [{
    name: '李四',
    age: 23,
    hobbies: ['唱歌', '跳舞', '敲代码']
}, {
    name: '张阿生',
    age: 24,
    hobbies: ['敲代码', '吃饭', '睡觉']
}]


app.get('/index', (req, res) => {
    res.render('index', {
        msg: 'index页面'
    })
});

app.get('/list', (req, res) => {
    res.render('list', {
        msg: 'list页面'
    });
});



app.listen(3000);
console.log('服务器启动成功');