const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('dist', {read: false, allowEmpty:true})
        .pipe(clean());
});

gulp.task('assets', function () {
    return gulp.src('./src/assets/**/*.*')
        .pipe(gulp.dest('./dist/assets'));
});

gulp.task('sassVendor', function () {
    return gulp.src('./style.scss')
        .pipe(sass())
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('./dist/css')).pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('sass', function () {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist/css')).pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browserifyVendor', function () {
    return browserify('./vendor.js')
        .bundle()
        .pipe(source('vendor.js'))
        .pipe(gulp.dest('./dist/js')).pipe(browserSync.reload({
            stream: true
        }));
})

gulp.task('browserify', function () {
    return browserify('./src/app/app.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./dist/js')).pipe(browserSync.reload({
            stream: true
        }));
})

gulp.task('html', function () {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browser-sync', function () {
    browserSync.init(null, {
        open: true,
        server: {
            baseDir: 'dist',
        }
    })
});

gulp.task('watch', function (done) {
    gulp.watch(['./src/app/**/*.js'], { ignoreInitial: false }, gulp.series('browserify'));
    gulp.watch(['./src/app/**/*.html'], { ignoreInitial: false }, gulp.series('html'));
    gulp.watch(['./src/**/*.scss'], { ignoreInitial: false }, gulp.series('sass'));
    gulp.watch(['./src/assets/**'], { ignoreInitial: false }, gulp.series('assets'));
    done();
});

gulp.task('build', gulp.series('clean','assets','browserifyVendor', 'sassVendor', 'sass', 'html', 'browserify'), function (done) {
    done();
});

gulp.task('default', gulp.series('build', 'watch', 'browser-sync'), function (done) {
    done();
});
