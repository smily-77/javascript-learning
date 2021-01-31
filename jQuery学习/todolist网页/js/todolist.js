$(function() {
    //1.按下回车 把完整数据 存储到本地存储里面
    //存储的数据格式 var todolist=[{title:"xxx",done:"false"}]
    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) { //判断是不是按下了回车键
            if ($(this).val() === "") {
                alert("请输入");
            } else {
                //先读取本地存储原来的数据
                var local = getDate();

                //把local数组进行数据更新 把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });
                //把local数组  存储给本地存储
                saveDate(local);
                //2.todolist 本地存储数据渲染加载页面
                load();
            }
        }
    });
    //3.todolist  删除操作
    $("ol,ul").on("click", "a", function() {
        //先获取本地数据
        var data = getDate();
        //修改数据
        var index = $(this).attr("id"); //获取自定义索引号
        data.splice(index, 1); //从索引号index开始删除，删除一个元素
        //保存到本地数据
        saveDate(data);
        //重新渲染页面
        load();
    })


    //4.todolist 正在进行和已完成选项操作
    $("ol,ul").on("click", "input", function() {
        //先获取本地存储的数据
        var data = getDate();
        //修改数据
        var index = $(this).siblings("a").attr("id"); //获取兄弟a的索引号  attr()获取自定义属性
        data[index].done = $(this).prop("checked"); //prop()获取固有属性
        //保存到本地存储
        saveDate(data);
        //重新渲染界面
        load();
    })





    //读取本地存储原来的数据
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            //本地存储里面的数据是字符串格式的，需要转换对象格式
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    //保存本地存储数据
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    //渲染本地存储数据
    function load() {
        var data = getDate();
        //遍历之前先要清空ol里面的元素内容
        $("ol,ul").empty();
        var todoCount = 0;
        var doneCount = 0;
        //遍历数组
        $.each(data, function(i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'> <p>" +
                    n.title + "</p> <a href='javascript:;' id=" + i + "></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'> <p>" +
                    n.title + "</p> <a href='javascript:;' id=" + i + "></a></li>");
                todoCount++;
            }

        })
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);

    }


})