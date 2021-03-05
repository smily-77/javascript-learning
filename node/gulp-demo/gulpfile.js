//应用gulp模块
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin'); //html任务插件
const fileinclude = require('gulp-file-include');
const less = require('gulp-less'); //css任务插件
const csso = require('gulp-csso');
const babel = require('gulp-babel'); //js任务插件
const uglify = require('gulp-uglify');
const gulpCopy = require('gulp-copy'); //文件拷贝

//使用gulp.task建立任务
//1.任务的名称
//2.任务的回调函数
gulp.task('first', (done) => {
    console.log('第一个gulp任务执行');
    //1.使用gulp.src获取要处理的文件
    gulp.src('./src/css/index.css')
        .pipe(gulp.dest('dist/css'));
    done();
});


//html任务
//1.html文件中代码的压缩操作
//2.抽取html文件中的公共代码
gulp.task('htmlmin', (done) => {
    gulp.src('./src/*.html')
        .pipe(fileinclude()) //将文件中的公共代码放入文件插件
        //压缩HTML文件中的代码
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
    done();

});



//css任务
//1.less语法转换
//2.css代码压缩
gulp.task('cssmin', (done) => {
    //选择css目录下的所有的less文件和css文件
    gulp.src(['./src/css/*.less', './src/css/normalize.css'])
        //将less语法转换为css语法
        .pipe(less())
        //将css代码进行压缩
        .pipe(csso())
        //将处理好的代码进行输出
        .pipe(gulp.dest('dist/css'))
    done();
});


//js任务
//1.es6代码转换
//2.代码压缩
gulp.task('jsmin', (done) => {
    gulp.src('./src/js/*.js')
        //1.将es6代码转换为es5代码
        .pipe(babel({
            //它可以判断当前代码的运行环境，将代码转换为当前运行环境所支持的代码
            presets: ['@babel/env']
        }))
        //2.将js代码进行压缩
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
    done();
});



//复制文件夹
gulp.task('copy', (done) => {
    gulp.src('./src/images/*')
        .pipe(gulp.dest('dist/images'));
    gulp.src('./src/upload/*')
        .pipe(gulp.dest('dist/upload'))
    done();
});



//构建任务
gulp.task('default', gulp.series('htmlmin', 'cssmin', 'jsmin', 'copy'));