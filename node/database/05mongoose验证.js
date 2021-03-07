//引入mongoose第三方模块 用来操作数据库
const mongoose = require('mongoose');
//数据库连接
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    //连接成功
    .then(() => console.log('数据库连接成功'))
    //连接失败
    .catch(err => console.log(err, '数据库连接失败'))

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, '请传入文章标题'],
        minlength: [2, '文章标题长度不能小于2'],
        maxlength: [5, '文章标题长度不能大于5'],
        //去除字符串两边的空格
        trim: true
    },
    age: {
        type: Number,
        min: [18, '年龄不能小于18'],
        max: [100, '年龄不能大于100']
    },
    publishDate: {
        type: Date,
        default: Date.now //如果没有输入时间则默认当前时间
    },
    category: {
        type: String,
        //枚举 列举出当前字段可以拥有的值
        enum: {
            values: ['html', 'css', 'javascript', 'node.js'],
            message: '分类名称要在一定范围内'
        }
    },
    author: {
        type: String,
        validate: {
            validator: v => {
                //返回布尔值
                //true验证成功
                //false验证失败
                //v要验证的值
                return v && v.length > 4
            },
            //自定义错误信息
            message: '传入的值不符合验证规则'
        }

    }
});

const Post = mongoose.model('Post', postSchema);
Post.create({ title: 'a', age: 423, category: 'java', author: 'd1d' })
    .then(result => console.log(result))
    .catch(error => {
        //获取错误信息对象
        const err = error.errors;
        //循坏错误信息对象
        for (var attr in err) {
            console.log(err[attr]['message']);
        }
    })