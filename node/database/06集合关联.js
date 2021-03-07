//引入mongoose 第三方模块
const mongoose = require('mongoose');
//数据库连接
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, userUnifiedTopology: true })
    //连接成功
    .then(() => console.log('数据库连接成功'))
    //连接失败
    .catch(err => console.log(err, '数据库连接失败'))

//用户集合规则
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        rquired: true
    }

});

//文章集合规则
const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BUser'
    }
});

//用户集合
const BUser = mongoose.model('BUser', userSchema);
//文章集合
const BPost = mongoose.model('BPost', postSchema);

//创建用户
//BUser.create({ name: 'itheima' }).then(result => console.log(result));
//创建文章
//BPost.create({ titile: '123', author: '6044890fe1866e1260bb1653' })
//.then(result => console.log(result));
BPost.find().populate('author').then(result => console.log(result))