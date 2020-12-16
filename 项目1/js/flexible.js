(function flexible(window, document) {
    //获取的html元素
    var docEl = document.documentElement
        //dpr物理像素比
    var dpr = window.devicePixelRatio || 1

    // adjust body font size  设置body字体大小
    function setBodyFontSize() {
        //如果页面中有body元素，
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px'
        } else {
            //如果页面中没有body元素，则等着页面的dom元素都加载完毕再去设置body的字体大小
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
    setBodyFontSize();

    // set 1rem = viewWidth / 10  设置html元素的文字大小
    function setRemUnit() {
        var rem = docEl.clientWidth / 10
        docEl.style.fontSize = rem + 'px'
    }

    setRemUnit()

    // reset rem unit on page resize   当我们的页面大小变化时，重新设置rem的大小
    window.addEventListener('resize', setRemUnit)
        //pageshow是重新加载页面触发事件
    window.addEventListener('pageshow', function(e) {
        //e.persisted  返回的是true就是说如果这个页面是从缓存取过来的页面，也需要从新计算一下rem的大小；
        if (e.persisted) {
            setRemUnit()
        }
    })

    // detect 0.5px supports  解决有些移动端不支持0.5像素的写法
    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
}(window, document))