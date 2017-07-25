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
var fs = require('fs');

//开发
gulp.task('bundle', ['publish-img-dev'], function (done) {
    webpack(webpackConfig(true, true), function (err, stats) {
        if (err) {
            throw new gulpUtil.PluginError('webpack', err);
        }
        gulpUtil.log('[webpack]', stats.toString({colors: true}));
        //done();
    });
});

//发布图片资源
gulp.task('publish-img-dev', ['publish-static-js-dev'], function () {
    return gulp.src(path.join(__dirname, '/src/img/**/*.*'))
        .pipe(gulp.dest(path.join(__dirname, '/dist/img/')));
});

//发布静态js
gulp.task('publish-static-js-dev', function () {
    return gulp.src([path.join(__dirname, '/src/dep/jquery-3.1.1.min.js'), path.join(__dirname, '/src/dep/swiper-3.3.1.min.js')])
        .pipe(gulp.dest(path.join(__dirname, '/dist/dep/')));
});

//线上
gulp.task('package', ['publish-img-dev'], function (done) {
    webpack(webpackConfig(false, false), function (err, stats) {
        if (err) {
            throw new gulpUtil.PluginError('webpack', err);
        }
        gulpUtil.log('[webpack]', stats.toString({colors: true}));
        //done();
    });
});

//发布图片资源
gulp.task('publish-img-dev', ['publish-static-js'], function () {
    return gulp.src(path.join(__dirname, '/src/img/**/*.*'))
        .pipe(gulp.dest(path.join(__dirname, '/dist/img/')));
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

// 得到图片路径，为了预加载
gulp.task('getImgName', function () {
    var str = '';
    fs.readdir(path.join(__dirname, 'src', 'img'), function (err, files) {
        if (err) {
            throw err;
        }
        files.forEach(function (file, index) {
            if (/\.(png|jpeg|jpg|gif|mp4|mp3)$/.test(file)) {
                str += '\'img/' + file + '\',\n';
            } else {
                fs.writeFile('result.txt', '发现img文件夹下有格式不详的文件，请核实！', 'utf-8', function (err) {
                    if (err) throw err;
                });
                return false;
            }
        });

        fs.writeFile('result.txt', str, 'utf-8', function (err) {
            if (err) throw err;
        });
    });
});
