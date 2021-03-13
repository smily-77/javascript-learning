const express = require('express');
const app = express();

app.get('/index/:id/:name/:age', (req, res) => {
    res.send(req.params);
});



app.listen(3000);
console.log('服务器启动成功');