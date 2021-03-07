//1.在普通函数前加上async关键字，普通函数变成了异步函数
//2.异步函数的默认返回值是promise对象
//3.异步函数内部使用throw关键字进行错误输出

//await关键字
//1.它只能出现在异步函数中
//2.await promise它可以暂停异步函数的执行，等待 promise对象返回结果后在向下执行函数

async function fn() {
    throw '发生了错误';
    return 123;
}

//console.log(fn());

fn().then(function(data) {
    console.log(data);
}).catch(function(err) {
    console.log(err);
})




/* async function p1() {
    return 'p1';
}
async function p2() {
    return 'p2';
}
async function p3() {
    return 'p3';
}
async function run() {
    let r1 = await p1()
    let r2 = await p2()
    let r3 = await p3()
    console.log(r1)
    console.log(r2)
    console.log(r3)
}
run(); */