const template = require('art-template');
const path = require('path');
const dateFormat = require('dateFormat');

//导入模板变量
template.defaults.imports.dateFormat = dateFormat;

//设置模板的根目录
template.defaults.root = path.join(__dirname, 'views');

//设置模板默认后缀
template.defaults.extname = '.art';

const html = template('06', {
    time: new Date()
});
console.log(html);