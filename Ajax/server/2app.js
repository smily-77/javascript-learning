//引入express框架
const express = require('express');
//引入path模板
const path = require('path');
const formidable = require('formidable');
//开启服务器
const app = express();

//处理静态资源
app.use(express.static(path.join(__dirname, 'public')));

//邮箱地址验证
app.get('/verifyEmailAdress', (req, res) => {
    //获取客户端传递过来的邮箱
    const email = req.query.email;
    //判断客户邮箱是否注册
    if (email == '1677465766@qq.com') {
        //邮箱已经注册 返回400状态码 并提示邮箱已经注册
        res.status(400).send({ message: '邮箱已经注册' });
    } else {
        res.send({ message: '邮箱可用' })
    }

});


//输入文字提示
app.get('/searchAutoPrompt', (req, res) => {
    //获取用户输入的文字
    const key = req.query.key;
    //提示文字列表
    const list = [
        '黑马程序员',
        '黑马程序员官网',
        '黑马程序员顺义校区',
        '黑马程序员学院报名系统',
        '传智播客',
        '传智博客前端与移动端开发',
        '传智播客大数据',
        '传智播客python',
        '传智播客java',
        '传智播客c++',
        '传智播客怎么样'
    ];
    var result = list.filter(item => item.includes(key));
    res.send(result);
});


// 获取省份
app.get('/province', (req, res) => {
    res.json([{
        id: '001',
        name: '黑龙江省'
    }, {
        id: '002',
        name: '四川省'
    }, {
        id: '003',
        name: '河北省'
    }, {
        id: '004',
        name: '江苏省'
    }]);
});

// 根据省份id获取城市
app.get('/cities', (req, res) => {
    // 获取省份id
    const id = req.query.id;
    // 城市信息
    const cities = {
            '001': [{
                id: '300',
                name: '哈尔滨市'
            }, {
                id: '301',
                name: '齐齐哈尔市'
            }, {
                id: '302',
                name: '牡丹江市'
            }, {
                id: '303',
                name: '佳木斯市'
            }],
            '002': [{
                id: '400',
                name: '成都市'
            }, {
                id: '401',
                name: '绵阳市'
            }, {
                id: '402',
                name: '德阳市'
            }, {
                id: '403',
                name: '攀枝花市'
            }],
            '003': [{
                id: '500',
                name: '石家庄市'
            }, {
                id: '501',
                name: '唐山市'
            }, {
                id: '502',
                name: '秦皇岛市'
            }, {
                id: '503',
                name: '邯郸市'
            }],
            '004': [{
                id: '600',
                name: '常州市'
            }, {
                id: '601',
                name: '徐州市'
            }, {
                id: '602',
                name: '南京市'
            }, {
                id: '603',
                name: '淮安市'
            }]
        }
        // 响应
    res.send(cities[id]);
});

// 根据城市id获取县城
app.get('/areas', (req, res) => {
    // 获取城市id
    const id = req.query.id;
    // 县城信息
    const areas = {
        '300': [{
            id: '20',
            name: '道里区',
        }, {
            id: '21',
            name: '南岗区'
        }, {
            id: '22',
            name: '平房区',
        }, {
            id: '23',
            name: '松北区'
        }],
        '301': [{
            id: '30',
            name: '龙沙区'
        }, {
            id: '31',
            name: '铁锋区'
        }, {
            id: '32',
            name: '富拉尔基区'
        }]
    };
    // 响应
    res.send(areas[id] || []);
});



//FormData的使用
app.post('/formdata', (req, res) => {
    //创建formidable表单解析对象
    var form = new formidable.IncomingForm();
    //解析客户端传递过来的FormData对象
    form.parse(req, (err, fields, files) => {
        res.send(fields)
    })
});




//上传二进制文件
app.post('/upload', (req, res) => {
    //创建formidable解析对象
    var form = new formidable.IncomingForm();
    //配置上传文件的默认存放地址
    form.uploadDir = path.join(__dirname, 'public', 'upload');
    //默认带后缀名
    form.keepExtension = true;
    //解析对象
    form.parse(req, (err, fields, files) => {
        //将客户端响应过来的地址响应到客户端
        res.send({
            path: files.attrName.path.split('public')[1]
        })
    })

})















app.listen(3000);
console.log("服务器启动成功");