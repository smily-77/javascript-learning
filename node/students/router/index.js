//引入模板引擎
const template = require('art-template');
//引入queryString 进行转化为对象格式
const querystring = require('querystring');

//引入router模块
const getRouter = require('router');
//获取路由对象
const router = getRouter();
//学生信息集合
const Student = require('../model/user');

//呈递学生信息页面
router.get('/add', (req, res) => {
    let html = template('index.art', {});
    res.end(html);
});
//呈递学生信息列表页面
router.get('/list', async(req, res) => {
    //查询学生信息
    let students = await Student.find();
    let html = template('list.art', {
        students: students
    });
    res.end(html);
})

//实现学生信息添加功能
router.post('/add', (req, res) => {
    let formData = '';
    req.on('data', param => {
        formData += param;
    });
    req.on('end', async() => {
        //将获取到的数据添加到数据库中
        await Student.create(querystring.parse(formData));

        //页面重定向
        res.writeHead(301, {
            location: '/list'
        });
        res.end();
    })
})

module.exports = router;