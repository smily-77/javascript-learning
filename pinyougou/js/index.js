//轮播图
window.addEventListener('load', function() {
    var arrow_l = document.querySelector('.arrow_l');
    var arrow_r = document.querySelector('.arrow_r');
    var focus = document.querySelector('.focus');
    //鼠标经过显示隐藏左右按钮,自动播放轮播图按钮关闭
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);

    })
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            arrow_r.click();
        }, 2000)
    })


    //动态生成小圆圈,有几张图片生成几张小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    var focusWidth = focus.offsetWidth;
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
        //自定义属性
        li.setAttribute('index', i);
        //小圆圈的排他思想，点击哪个圆圈，哪个圆圈变色
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            //点击小圆圈移动图片，ul移动

            var index = this.getAttribute('index');
            //当我们点击某个li,把li的索引号给num
            num = index;
            //当我们点击某个li,把li的索引号给circle
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    //第一张默认实心小圆圈
    ol.children[0].className = 'current';

    //克隆第一张图片放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //鼠标点击右按钮图片移动
    var index = li.getAttribute('index');
    var num = 0; //控制右边按钮图片的移动
    var circle = 0; //控制小圆圈的播放
    var flag = true; //节流阀

    //右边按钮
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false; //关闭节流阀
            //当走到克隆的下一张图片时，快速跳到第一张图片，再移动到第二张图片；
            if (num == ul.children.length - 1) {
                ul.style.left = '0';
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true; //打开节流阀
            });
            circle++;
            //如果circle==4说明走到最克隆的图片了
            if (circle == ol.children.length) {
                circle = 0;
            }

            circleChange();
        }

    })


    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            //当走到第一张图片时，快速跳到克隆的图片，再到第四张；
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle--;
            //如果circle<0说明走到第一张图片了
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }


    })

    function circleChange() {
        //先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //当前小圆圈类名为current
        ol.children[circle].className = 'current';

    }


    //自动播放功能
    var timer = setInterval(function() {
        //手动点击右侧按钮
        arrow_r.click();
    }, 2000)


})
$(function() {
    //当我们点击了li此时不需要执行 页面滚动事件里面的 li 的背景选择添加current
    //节流阀
    var flag = true;

    //1.到达指定区域时导航条的出现和隐藏
    var toolTop = $(".recommend").offset().top;
    toggleTop();

    function toggleTop() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    }
    $(window).scroll(function() {
        toggleTop();
        //3.页面滚动到某个内容区域，左侧电梯导航小li相应添加和删除current类名
        if (flag) {
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
                }

            })
        }
    })

    //2.点击导航条可以滚动到相应内容区域
    $(".fixedtool li").click(function() {
        flag = false;
        console.log($(this).index());
        //每次点击li。需要计算出页面要去往的位置
        //选出对应索引号的内容区域的盒子  计算它的offset（）.top
        var current = $(".floor .w").eq($(this).index()).offset().top;
        //页面滚动效果
        $("body,html").stop().animate({
                scrollTop: current
            }, function() {
                flag = true
            })
            //点击之后，让当前的li 添加current类名，兄弟移除current类名
        $(this).addClass("current").siblings().removeClass();

    })


})