    //引入用户集合
    const { query } = require('express');
    const { User } = require('../../model/user');
    module.exports = async(req, res) => {

        //标识 标识当前访问的是用户管理页面
        req.app.locals.currentLink = 'user';

        //获取客户端传递过来的当前页面参数
        let page = req.query.page || 1;
        //设置页面显示的数据条数
        let pagesize = 2;
        //获取总的数据条数
        let count = await User.countDocuments({});
        //计算总页面数
        let total = Math.ceil(count / pagesize);
        //页码对应的数据查询的开始位置
        let start = (page - 1) * pagesize;
        //将用户信息从数据库中查询出来
        let users = await User.find({}).limit(pagesize).skip(start);
        res.render('admin/user', {
            users: users,
            page: page,
            total: total
        })
    }