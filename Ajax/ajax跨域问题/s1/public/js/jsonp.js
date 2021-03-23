function jsonp(options) {
    //myJsonp01243546
    var fnName = 'myJsonp' + Math.random().toString().replace('.', '');
    //不是一个全局函数，想办法变成全局函数
    window[fnName] = options.success;
    //创建一个script标签
    var script = document.createElement('script');
    //存放拼接字符串
    var params = '';
    //拼接传进来的参数
    for (var attr in options.data) {
        params += '&' + attr + '=' + options.data[attr]
    }
    //添加src属性
    script.src = options.url + '?callback=' + fnName + params;
    document.body.appendChild(script);
    //script添加onload属性
    script.onload = function() {
        document.body.removeChild(script);
    }

}