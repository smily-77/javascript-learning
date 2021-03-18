//引入文章信息模板
const { Article } = require('../../model/article');
const { User } = require('../../model/user');
//引入数据分页模板
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    //接收客户端传递过来的页码
    const page = req.query.page;
    //标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    //page 指定当前页
    //size 指定每页显示的数据条数
    //display 向客户端要显示的页码数量
    //exec 向数据库中发送请求
    //查询所有文章数据
    let articles = await pagination(Article).find().page(page).size(1).display(3).populate('author').exec();

    let str = JSON.stringify(articles);
    let result = JSON.parse(str);

    /*  res.send(articles); */

    // 渲染文章列表页面模板 
    res.render('admin/article.art', {
        articles: result
    });
}