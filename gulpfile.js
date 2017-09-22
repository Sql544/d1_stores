//加载gulp

var gulp = require("gulp");
//加载压缩js模块
var uglify = require("gulp-uglify");

/*var concat = require("gulp-concat"); //合并文件
var connect = require("g
ulp-connect"); //热部署（即时刷新）
var sass = require("gulp-ruby-sass"); //编译sass
var rename = require("gulp-rename"); //重命名文件
var babel = require("gulp-babel"); //编译ES6
*/
var babel = require("gulp-babel");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var sass = require("gulp-ruby-sass");
var connect = require("gulp-connect"); //热部署（即时刷新）
var webserver = require("gulp-webserver");
var proxy = require('http-proxy-middleware');
gulp.task("refresh",function(){
     //src用来读取，pipe用来输送
     gulp.src("./*.html").pipe(connect.reload());
     gulp.src("./*/*.html").pipe(connect.reload());
});
gulp.task("ES6",function(){
	gulp.src("./**.js").pipe(babel({
		presets : ["es2015"]
	}))
	.pipe(uglify())
	.pipe(gulp.dest("./minjs/"));
	gulp.src("./js/*/*.js").pipe(babel({
		presets : ["es2015"]
	}))
	.pipe(uglify())
	.pipe(gulp.dest("./minjs/"));
	
	gulp.src("./js/*.js").pipe(babel({
		presets : ["es2015"]
	}))
	.pipe(uglify())
	.pipe(gulp.dest("./minjs/"));
	
	gulp.src("./html/*.js").pipe(babel({
		presets : ["es2015"]
	}))
	.pipe(uglify())
	.pipe(gulp.dest("./minjs/"));
	})
//定义一个任务
gulp.task("compile", function(){
//	//任务要执行的代码
//	gulp.src("./js/*.js")  //从指定目录读取js文件
//		.pipe(uglify()) //通过pipe输送到 压缩模块
//		.pipe(gulp.dest("./minjs/")); //通过pipe输送到 目标位置
	sass("./scss/*.scss",{
		style:"expanded"
	}).pipe(gulp.dest("./css/"))
});
gulp.task("webserver", function () {
	gulp.src('./')
		.pipe(
			webserver({
				host: 'localhost',
				port: 8080,
				livereload: true,
				directoryListing: {
					enable: true,
					path: './'
				},
				middleware: [
					proxy('/api',{
						target: 'http://www.d1.com.cn/', // target host
        				changeOrigin: true,               // needed for virtual hosted sites
        				pathRewrite : {
        					"^/api" : ""
        				}
					})
				]
				
			})
		)
	
})
gulp.task("listen",function(){
	
     //检测HTML文件的变化，执行刷新任务
    gulp.watch("./*.html", ["refresh"]);
    gulp.watch("./html/*.html", ["refresh"]);
    gulp.watch("./css/*.css", ["refresh"]);
	gulp.watch("./*.js",["ES6"]);
	gulp.watch("./js/*/*.js",["ES6"]);
	gulp.watch("./js/*.js",["ES6"]);
	gulp.watch("./html/*.js",["ES6"]);
	gulp.watch("./scss/*.scss",["compile"])
})
gulp.task('default', ["listen", "webserver"], function () {
	console.log('done.');
})
