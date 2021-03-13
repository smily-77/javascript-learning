const template = require('art-template');
const path = require('path');

const views = path.join(__dirname, 'views', '03.art');
const html = template(views, {
    users: [{
        name: '李四',
        age: 20,
        sex: '男'
    }, {
        name: '李狗蛋',
        age: 12,
        sex: '男'
    }, {
        name: '小舞',
        age: 24,
        sex: '女'
    }]
});
console.log(html);