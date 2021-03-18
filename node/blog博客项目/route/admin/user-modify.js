const { User } = require('../../model/user');
const bcrypt = require('bcrypt');
module.exports = async(req, res, next) => {
    //接收客户端传递过来的请求参数
    const id = req.query.id;
    //即将要修改的用户id
    const { username, password, email, role, state } = req.body;
    //通过id在数据库中查找信息
    let user = await User.findOne({ _id: id });
    //密码比对
    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (isValid) {
        //密码比对成功
        //将用户信息更新
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state,
        });
        //重定向到用户列表页面
        res.redirect('/admin/user');

    } else {

        let obj = { path: '/admin/user-edit', message: '密码错误,无法进行修改', id: id };
        next(JSON.stringify(obj));
    }



}