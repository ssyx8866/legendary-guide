const gulp = require("gulp");

gulp.task("hello",function(){
    console.log("hello word")
})


const htmlmin = require("gulp-htmlmin");
gulp.task("copy-html",function(){
    return gulp.src("*.html")
    .pipe(htmlmin({
        removeEmptyAttibutes:true,
        collapseWhitespace:true,
    }))
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload())
})
gulp.task("images",function(){
    return gulp.src("images/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload())
    
})

gulp.task("js",function(){
    return gulp.src(["*.js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload())
})


gulp.task("data",function(){
    return gulp.src(["json/*.json","xml/*.xml","!xml/04.xml"]).pipe(gulp.dest("dist/data"))
    .pipe(connect.reload())
})

gulp.task("bulid", ["copy-html", "images",  "data","sass","script","js",'sass2'], function(){
    console.log("项目建立成功")
    // .pipe(connect.reload())
  })



const sass = require("gulp-sass");
sass.complier = require("node-sass");
const rename = require("gulp-rename");
const minifyCSS = require("gulp-minify-css");

gulp.task("sass2",function(){
    return gulp.src("./scss/index2.scss")
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("index2.min.css"))
    .pipe(gulp.dest("dist/css") )
    .pipe(connect.reload())
})

gulp.task("sass",function(){
    return gulp.src("./scss/index.scss")
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css") )
    .pipe(connect.reload())
})


const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel")



gulp.task("script",function(){
    return gulp.src(["./javascript1/*.js","./javascript2/*.js"])
    .pipe(concat("index.js"))
    .pipe(babel({presets:['es2015'],
}))
    .pipe(gulp.dest("dist/js"))
    .pipe(uglify())
    .pipe(rename("index.min.js"))
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload())
})




  //监听
  gulp.task("watch",function(){
      gulp.watch("*.html",['copy-html']);
      gulp.watch("images/**/*",['images'])
      gulp.watch(["json/*.json","xml/*.xml","!xml/04.xml"],['data'])
      gulp.watch("./scss/index.scss",['sass'])
      gulp.watch(["./javascript1/*.js","./javascrit2/*.js"],['script'])
      gulp.watch(["*.js","!gulpfile.js"],["js"])
      gulp.watch(["./scss/index2.scss"],['sass2'])
})

const connect = require("gulp-connect");
gulp.task("server",function(){
    connect.server({
        root:"dist",
        port:12138,
        livereload:true
    })
})

gulp.task("default",["watch","server"]);