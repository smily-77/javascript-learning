const { Article } = require('../../model/article');
//导入分页模块
const pagination = require('mongoose-sex-page');
module.exports = async(req, res) => {
    //接收客户端传递过来的页码
    const page = req.query.page;
    //从数据库中查询数据
    let result1 = await pagination(Article).page(page).size(2).display(5).find().populate('author').exec();
    let str = JSON.stringify(result1);
    let obj = JSON.parse(str)
        //res.send(result);
        //渲染模板并传递数据
    res.render('home/default.art', {
        result: obj
    });
}