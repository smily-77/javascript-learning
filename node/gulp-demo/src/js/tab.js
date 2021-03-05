var that;
class Tab {
    constructor(id) {
        that = this;
        //获取元素
        this.main = document.querySelector(id);

        this.add = this.main.querySelector('.tabadd');
        //li的父元素
        this.ul = this.main.querySelector('.firstnav ul:first-child');
        //section的父元素
        this.fsection = this.main.querySelector('.tabscon');
        this.init()

    }
    init() {
            this.updateNode();
            //init 初始化操作  让相关元素绑定事件
            this.add.onclick = this.addTab;
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggleTab;
                this.remove[i].onclick = this.removeTab;
                this.spans[i].ondblclick = this.editTab;
                this.sections[i].ondblclick = this.editTab;
            }
        }
        //获取li和section
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
    }




    //1.切换功能
    toggleTab() {
            that.clearClass();
            this.className = 'liactive';
            that.sections[this.index].className = 'conactive';

        }
        //清除li 和sectiion的类
    clearClass() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.sections[i].className = '';
            }
        }
        //2.添加功能
    addTab() {
            that.clearClass();
            var random = Math.random();
            //(1)创建li元素和section元素
            var li = '  <li class="liactive"><span>测试1</span><span class="iconfont icon-guanbi"></span></li>';
            var section = '<section class="conactive">测试' + random + '</section>';
            //（2）把这两个元素追加到父元素里面
            that.ul.insertAdjacentHTML('beforeend', li);
            that.fsection.insertAdjacentHTML('beforeend', section);
            that.init();

        }
        //3.删除功能
    removeTab(e) {
            e.stopPropagation(); //阻止冒泡，防止触发li的点击事件
            var index = this.parentNode.index;
            //根据索引号删除对应的li和section  
            that.lis[index].remove();
            that.sections[index].remove();
            that.init();
            //删除的不是选中状态的li的时候，原来选中状态的li保持不变
            if (document.querySelector('.liactive')) return;

            //删除选中状态li的时候，让它的前一个li处于选定状态
            index--;

            //手动调用点击事件
            that.lis[index] && that.lis[index].click();

        }
        //4.修改功能
    editTab() {
        var str = this.innerHTML;
        // 双击禁止选中文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        //双击的时候添加一个文本框
        this.innerHTML = '<input type="text"/>';
        //为文本框设置默认文字
        var input = this.children[0];
        input.value = str;
        input.select(); //文本框里面的文字处于选中状态
        //离开文本框时把文本框里面的值给span
        input.onblur = function() {
            this.parentNode.innerHTML = this.value;
        };
        //按下回车键也可以把文本框里面的值给span
        input.onkeyup = function(e) { //键盘事件
            if (e.keyCode === 13) {
                //手动调用表单失去焦点事件  
                this.blur();
            }
        }

    }

}
new Tab("#tab")