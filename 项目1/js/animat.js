function animate(obj, target, callBack) {

    clearInterval(obj.timer); // 清除上一次的定时器
    obj.timer = setInterval(function() {
        var step = (target - obj.offsetLeft) / 30; //缓慢动画每次移动的步长
        step = step > 0 ? Math.ceil(step) : Math.floor(step); //step>0向上取整数，step<0像下取整数，
        //使移动数达到target整数

        if (obj.offsetLeft == target) {
            clearInterval(obj.timer); // 动画结束，本质是定时器结束
            //如果有回调函数调用回调函数，回调函数写在定时器结束里
            /* if (callBack) {
                callBack();
            } */
            callBack && callBack();
        }
        obj.style.left = obj.offsetLeft + step + 'px';

    }, 15)
}