const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');
module.exports = async(req, res) => {
    //接收客户端传递过来的文章id值
    const id = req.query.id;
    //根据id值查询文章的详细信息
    let article = await Article.findOne({ _id: id }).populate('author');
    //res.send(article)
    let str = JSON.stringify(article);
    let result = JSON.parse(str);

    //根据id查询文章的评论信息
    let comments = await Comment.find({ aid: id }).populate('uid');
    let cstr = JSON.stringify(comments);
    let rcomments = JSON.parse(cstr);

    res.render('home/article', {
        article: result,
        comments: rcomments,
    });
}