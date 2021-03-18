//导入bcrypt方法
const bcrypt = require('bcrypt');
//引入用户集合
const { User } = require('../../model/user')
module.exports = async(req, res) => {
    //获取亲求参数
    const { email, password } = req.body;
    //如果邮箱或密码为空，阻止程序向下执行
    /*  if (email.trim().length == 0 || password.trim().length == 0) {
         return res.send('<h4>邮箱和密码不能为空</h4>');
     } */
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', { msg: '邮箱或者密码不能为空' });
    }
    //根据邮箱查找用户信息
    //如果查找到了用户信息，user为一个对象，对象里面存储用户信息
    //如果没有查找到用户信息，user为空
    let user = await User.findOne({ email });
    //如果查找到了用户信息
    if (user) {
        //将查找的密码和用户输入的密码做比对
        //false比对失败
        //true比对成功
        let isEqual = await bcrypt.compare(password, user.password)

        if (isEqual) {
            //将用户名存储在请求对象中
            req.session.username = user.username;
            req.session.role = user.role;

            //app.locals对象，使所有页面都能拿到user的信息
            req.app.locals.userInfo = user;
            //对用户角色进行判断
            if (user.role == 'admin') {
                //重定向到用户列表页面
                res.redirect('/admin/user');

            } else {
                //重定向到博客首页
                res.redirect('/home/')
            }


            //如果比对相同，则登录成功
            //登陆成功后页面重定向  跳转到user页面
            res.redirect('/admin/user');
        } else {
            //如果比对不同，则登录失败
            res.status(400).render('admin/error', { msg: '邮箱或密码错误' })
        }

    } else {
        //如果没有找到用户信息
        res.status(400).render('admin/error', { meg: '邮箱或密码错误' });
    }
}

// module.exports = login;