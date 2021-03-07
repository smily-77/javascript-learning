// 引入mongoose第三方模块 用来操作数据库
const mongoose = require('mongoose');
// 数据库连接
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    // 连接成功
    .then(() => console.log('数据库连接成功'))
    // 连接失败
    .catch(err => console.log(err, '数据库连接失败'));

// 创建集合规则
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    hobbies: [String]
});

// 使用规则创建集合
const User = mongoose.model('User', userSchema);

//查询
// 查询用户集合中的所有文档
//User.find().then(result => console.log(result));

// 通过_id字段查找文档
//User.find({ _id: '5c09f236aeb04b22f8460967' }).then(result => console.log(result))

//返回一条文档 默认返回当前集合中的第一条文档
/* User.findOne().then(result => console.log(result)); */
/* User.find({ name: '李四' }).then(result => console.log(result)) */

//查询用户集合中年龄大于20 小于40的文档
//User.find({ age: { $gt: 20, $lt: 40 } }).then(result => console.log(result))

//查询用户集合中兴趣中有敲代码的集合
//User.find({ hobbies: { $in: ['敲代码'] } }).then(result => console.log(result))

//选择查询文档里面的name ,email文档  默认带上了 _id
//User.find().select('name email').then(result => console.log(result))
//如果不想带上id则在上述语句中加 -_id
//User.find().select('name email -_id').then(result => console.log(result))

//根据年龄字段进行升序排列
//User.find().sort('age').then(result => console.log(result))
//根据年龄字段进行降序排列
//User.find().sort('-age').then(result => console.log(result))

//skip 跳过多少条数据 limit 限制查询数量
//User.find().skip(2).limit(2).then(result => console.log(result))


//删除
//查询一条文档并且删除 返回删除的文档  
//如果满足条件的有多条文档 则删除满足条件第一个文档
//User.findOneAndDelete({ _id: '5c09f2d9aeb04b22f846096b' }).then(result => console.log(result))

//删除多条文档 默认删除全部 返回一个对象
//User.deleteMany({}).then(result => console.log(result));


//更新
//更新集合中的文档（更新一个）
//User.updateOne({ name: '李四' }, { name: '李皮蛋' }).then(result => console.log(result))

//更新集合中的文档（更新多个）
User.updateMany({}, { age: 56 }).then(result => console.log(result))