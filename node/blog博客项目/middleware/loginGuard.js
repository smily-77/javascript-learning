const guard = (req, res, next) => {
    //判断用户访问的是否是登录界面
    //判断用户的登录状态
    //如果用户是登录的 将请求放行
    //如果用户不是登录的 将请求重定向到登录界面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');

    } else {
        //如果用户是登录状态而且是一个普通用户
        if (req.session.role == 'normal') {
            //跳转到文章页面
            return res.redirect('/home')
        }
        next();
    }
}
module.exports = guard;