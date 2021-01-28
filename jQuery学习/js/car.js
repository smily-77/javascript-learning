$(function() {

    //全选控制其它
    $(".checkall").change(function() {
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
        //选中的添加背景
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item ");
        } else {
            $(".cart-item").removeClass("check-cart-item ");
        }

    })

    //其它控制全选
    $(".j-checkbox").change(function() {
        //如果被选中的复选框的个数=全部复选框的个数
        if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    })

    //增减商品和小计


    function compute(that, n) {
        //小计
        var p = $(that).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        var price = (p * n).toFixed(2); //保留两位小数
        $(that).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    }



    //增加
    $(".increment").click(function() {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);

        // //小计
        // var p = $(this).parents(".p-num").siblings(".p-price").html();
        // p = p.substr(1);
        // var price = (p * n).toFixed(2); //保留两位小数
        // $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        // getSum();
        compute(this, n);
    })

    //减少
    $(".decrement").click(function() {
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);

        // //小计
        // var p = $(this).parents(".p-num").siblings(".p-price").html();
        // p = p.substr(1);
        // var price = (p * n).toFixed(2); //保留两位小数
        // $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        // getSum();
        compute(this, n);

    })

    //文本框变化，小计变化
    $(".itxt").change(function() {
        var n = $(this).val(); //获得文本框的个数

        // var p = $(this).parents(".p-num").siblings(".p-price").html(); //获得单价
        // p = p.substr(1); //去掉前面的￥符号
        // var price = (P * n).toFixed(2); //保留两位小数
        // $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        // getSum();
        compute(this, n);


    })

    function getp() {
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        var price = (p * n).toFixed(2); //保留两位小数
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        getSum();
    }

    //计算总件和总额
    getSum();

    function getSum() {
        var count = 0; //总件
        var money = 0; //总额
        //总件
        $(".itxt").each(function(i, ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);

        //总额
        $(".p-sum").each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1));
        })
        $(".price-sum em").text("￥" + money.toFixed(2))

    }


    //删除商品
    //1.点击删除按钮，删除当前商品
    $(".p-action a").click(function() {
        $(this).parents(".cart-item").remove();
        getSum();
    });
    //2.点击选中的商品会删除
    $(".remove-batch").click(function() {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });
    //3.点击清空购物车
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getSum();
    })







})