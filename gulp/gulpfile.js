var gulp = require("gulp");
var ugilfy = require("gulp-uglify");
var minifycss = require("gulp-minify-css");
var minifyhtml = require("gulp-minify-html");
var imagemin = require("gulp-imagemin");
//定义任务
gulp.task("yasuojs",function(){
	//导入需要被压缩的js文件
	return gulp.src("./test.js")
	//执行压缩
	.pipe(ugilfy())
	.pipe(gulp.dest("./dist"))
})

gulp.task("yasuocss",function(){
	//导入需要被压缩的js文件
	return gulp.src("./test.css")
	//执行压缩CSS
	.pipe(minifycss())
	.pipe(gulp.dest("./dist"))
})

gulp.task("yasuohtml",function(){
	//导入需要被压缩的js文件
	return gulp.src("./test.html")
	//执行压缩HTML
	.pipe(minifyhtml())
	.pipe(gulp.dest("./dist"))
})

gulp.task("yasuoimg",function(){
	//导入需要被压缩的js文件
	return gulp.src("./test.jpg")
	//执行压缩HTML
	.pipe(imagemin())
	.pipe(gulp.dest("./dist"))
})

gulp.task("default",["yasuojs","yasuocss","yasuohtml","yasuoimg"]);
