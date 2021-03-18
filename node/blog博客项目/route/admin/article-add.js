//引入formidable模块 解析表单（post get 文件上传）
const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');
const article = require('./article');
module.exports = (req, res) => {
    //引入表单解析对象
    const form = new formidable.IncomingForm();
    //配置文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'upload');
    //保留上传文件的后缀
    form.keepExtensions = true;
    //解析表单
    form.parse(req, async(err, fields, files) => {
        //1.err错误对象 如果表单解析失败 err里面存储错误信息 如果解析成功err将会
        //2.fields对象类型 保存普通表单数据
        //3.files 对象类型 保存了和上传文件相关的数据
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1], //将绝对地址用public进行分割
            content: fields.content,
        });
        //将页面定向到文章列表页面
        res.redirect('/admin/article');

    })

}