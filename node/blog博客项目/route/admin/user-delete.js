const { User } = require("../../model/user");

module.exports = async(req, res) => {

    // res.send(req.query.id)
    //根据id删除选中的数据
    await User.findOneAndDelete({ _id: req.query.id });
    //重定向到用户列表页面
    res.redirect('/admin/user');

}