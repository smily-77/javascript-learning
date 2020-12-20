window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    var w = focus.offsetWidth;
    //利用定时器自动播放轮播图图片
    var index = 0;
    var timer = setInterval(function() {
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all .5s';
        ul.style.transform = 'translateX(' + translatex + 'PX)';

    }, 2000);
    //等着过渡完成之后，再去判断 监听过渡完成事件 transitionend
    ul.addEventListener('transitionend', function() {
        if (index >= 3) {
            index = 0;
            //去掉过渡效果 让ul快速跳到目标位置
            ul.style.transition = 'none';
            //利用最新的索引号乘以宽度滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';

        }
        //小圆点跟随变化
        //把ol里面li带有current类名的选出来去掉类名
        ol.querySelector('.current').classList.remove('current');
        //让当前索引号的li加上current
        ol.children[index].classList.add('current');

    });

    //手指拖动轮播图
    //触摸元素手指初始坐标
    var startX = 0;
    var moveX = 0;
    var flag = false;
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        //手指触摸时停止定时器
        clearInterval(timer);
    });


    //移动·手指，计算手指滑动的距离，并移动盒子
    ul.addEventListener('touchmove', function(e) {
        //计算距离
        moveX = e.targetTouches[0].pageX - startX;
        //移动盒子
        var translatex = -index * w + moveX;
        //手指拖动的时候不需要过渡效果；
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        e.preventDefault();
        flag = true;
    });

    
    //手指离开 根据移动距离去判断是回弹还是播放上一张下一张
    ul.addEventListener('touchend', function(e) {
        if (flag) {
            if (Math.abs(moveX) > 50) {
                if (moveX > 0) {
                    index--;
                } else {
                    index++;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                var translatex = -index * w;
                ul.style.transition = 'all .1s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
        }
        //手指离开开启定时器
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'PX)';

        }, 2000);

    });

    var goback = document.querySelector('.goback');
    var nav = document.querySelector('.nav');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav.offsetTop) {
            goback.style.display = 'block';
        } else {
            goback.style.display = 'none';
        }
    });

    goback.addEventListener('click', function() {
        window.scroll(0, 0);
    });

})