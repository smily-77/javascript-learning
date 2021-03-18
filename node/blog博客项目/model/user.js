//引入mongoose模块
const mongoose = require('mongoose');
const admin = require('../route/admin');
//引入bcrypt模块
const bcrypt = require('bcrypt');
//引入joi模块进行用户信息验证
const joi = require('joi');
//创建集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        maxlength: 20,
        minlength: 2
    },
    email: {
        type: String,
        require: true,
        //保证邮箱的唯一性
        unique: true
    },
    password: {
        type: String,
        require: true

    },
    //admin：超级管理员
    //normal:普通用户
    role: {
        type: String,
        require: true
    },
    //0：启用  1：禁用
    state: {
        type: Number,
        default: 0
    }
});

//使用集合规则创建集合
const User = mongoose.model('User', userSchema);

async function createUse() {
    const salt = await bcrypt.genSalt(10);
    const result = await bcrypt.hash('123456', salt)
        //测试 向集合中添加数据
    const user = await User.create({
        username: 'zjw',
        email: '1677465766@qq.com',
        password: result,
        role: 'admin',
        state: 0
    })
}
//createUse();

//用户信息验证函数
function validateUser(user) {
    //创建信息验证规则
    const schema = {
        username: joi.string().min(2).max(20).required().error(new Error('用户名不规范')),
        email: joi.string().email().required().error(new Error('邮箱格式不规范')),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不规范')),
        role: joi.string().valid('normal', 'admin').required().error(new Error('角色格式不规范')),
        state: joi.number().valid(0, 1).required().error(new Error('状态格式不正确')),
    };
    //实施验证
    return joi.validate(user, schema);
}





//将用户集合作为模块成员进行导出
module.exports = { User, validateUser }