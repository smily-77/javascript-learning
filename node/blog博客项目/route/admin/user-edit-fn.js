//引入bcrypt进行密码加密处理
const bcrypt = require('bcrypt');

//
//引入用户集合
const { User, validateUser } = require('../../model/user');

module.exports = async(req, res, next) => {

    try {
        await validateUser(req.body);
    } catch (e) {
        //验证没有通过 重定向用户添加页面
        // return res.redirect(`/admin/user-edit?message=${e.message}`)
        //next()只能传递一个参数，而且是字符串类型
        //JSON.stringify()将对象类型转化为字符串类型
        return next(JSON.stringify({ path: '/admin/user-edit', message: e.message }))
    }

    //通过查找邮箱判断用户是否存在
    let user = await User.findOne({ email: req.body.email });
    //如果存在 则重定向到添加界面
    if (user) {
        /*   return res.redirect(`/admin/user-edit?message=邮箱已被占用`) */
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱已被占用' }))
    }
    //如果邮箱不存在 对密码进行加秘处理
    //生成随机加密字符串
    const salt = await bcrypt.genSalt(10);
    //加密
    const password = await bcrypt.hash(req.body.password, salt);
    //将用户输入的密码用加密的密码替代
    req.body.password = password;
    //将用户信息加入到数据库中
    await User.create(req.body);
    //将页面重定向到用户列表界面
    res.redirect('/admin/user');


}