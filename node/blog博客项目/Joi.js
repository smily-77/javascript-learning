//引入joi模块
const joi = require('joi');
//设置验证规则
const schema = {
    username: joi.string().min(3).max(5).required().error(new Error('username验证不通过')),
    birth: joi.number().min(1999).max(2020).error(new Error('birth验证通过')),
}

//使用集合规则进行验证
async function run() {
    try {
        await joi.validate({ username: 'abb', birth: 2019 }, schema)
    } catch (ex) {
        console.log(ex.message);
        return;
    }
    console.log('验证成功');
};
run();