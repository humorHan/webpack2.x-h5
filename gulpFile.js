/**
 * Created by humorHan on 2017/2/4.
 */
var gulp = require('gulp');
var path = require('path');
var webpack = require('webpack');
var gulpUtil = require('gulp-util');
var webpackConfig = require('./webpack-config.js');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var tiny = require('gulp-tinypng');

//压缩img
gulp.task('tinyPng', ['del-img'], function () {
    gulp.src(path.join(__dirname, '/src/img/**/*.{png,jpg}'))
        .pipe(tiny('ESUKcbJt9lRkplqmVQLZ9Ot5uAeY2f95'))
        .pipe(gulp.dest(path.join(__dirname, '/dist/img/')));
});

gulp.task('del-img', function(){
    return gulp.src(path.join(__dirname, '/dist/img'), {read: false})
        .pipe(vinylPaths(del));
});

//开发
gulp.task('bundle', ['publish-static-js-dev'], function (done) {
    webpack(webpackConfig(true, true), function (err, stats) {
        if (err) {
            throw new gulpUtil.PluginError('webpack', err);
        }
        gulpUtil.log('[webpack]', stats.toString({colors: true}));
        //done();
    });
});

//发布静态js
gulp.task('publish-static-js-dev', function () {
    return gulp.src([path.join(__dirname, '/src/dep/jquery-3.1.1.min.js'), path.join(__dirname, '/src/dep/swiper-3.3.1.min.js')])
        .pipe(gulp.dest(path.join(__dirname, '/dist/dep/')));
});

//线上
gulp.task('package', ['publish-static-js'], function (done) {
    webpack(webpackConfig(false, false), function (err, stats) {
        if (err) {
            throw new gulpUtil.PluginError('webpack', err);
        }
        gulpUtil.log('[webpack]', stats.toString({colors: true}));
        //done();
    });
});

//发布静态js
gulp.task('publish-static-js', ['del'], function () {
    return gulp.src([path.join(__dirname, '/src/dep/jquery-3.1.1.min.js'), path.join(__dirname, '/src/dep/swiper-3.3.1.min.js')])
        .pipe(gulp.dest(path.join(__dirname, '/dist/dep/')));
});

//清理文件夹
gulp.task('del', function () {
    return gulp.src(path.join(__dirname, '/dist'), {read: false})
        .pipe(vinylPaths(del));
});