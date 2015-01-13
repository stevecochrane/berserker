var gulp = require("gulp");

var autoprefixer = require("gulp-autoprefixer"),
    browserify = require("browserify"),
    combineMediaQueries = require("gulp-combine-media-queries"),
    imagemin = require("gulp-imagemin"),
    jshint = require("gulp-jshint"),
    less = require("gulp-less"),
    liveReload = require("gulp-livereload"),
    minifyCss = require("gulp-minify-css"),
    minifyHtml = require("gulp-minify-html"),
    pixrem = require("gulp-pixrem"),
    uglify = require("gulp-uglify"),
    vinylBuffer = require("vinyl-buffer"),
    vinylSourceStream = require("vinyl-source-stream"),
    watch = require("gulp-watch");

gulp.task("copy-assets", function() {
    gulp.src("./node_modules/normalize.css/normalize.css")
        .pipe(gulp.dest("./src/css"));
});

gulp.task("imagemin", function() {
    gulp.src("./src/img/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/img"))
        .pipe(liveReload());
});

gulp.task("css", function() {
    gulp.src("./src/less/main.less")
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(pixrem())
        .pipe(combineMediaQueries())
        .pipe(minifyCss({ noAdvanced: true }))
        .pipe(gulp.dest("./dist/css"))
        .pipe(liveReload());
});

gulp.task("js", function() {
    gulp.src("./src/js/main.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter("fail"));

    return browserify("./src/js/main.js")
        .bundle()
        .pipe(vinylSourceStream("main.js"))
        .pipe(vinylBuffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"))
        .pipe(liveReload());
});

gulp.task("html", function() {
    gulp.src("./src/**/*.{html,php}")
        .pipe(minifyHtml())
        .pipe(gulp.dest("./dist"))
        .pipe(liveReload());
});

gulp.task("watch", function() {
    liveReload.listen();
    watch("./src/less/main.less", function() {
        gulp.start("css");
    });
});

gulp.task("default", ["imagemin", "js", "css", "html"]);