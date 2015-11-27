"use strict";

var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var testFiles = ["src/**/*.spec.js"];
var srcFiles = ["src/**/*.js","!src/**/*.spec.js"];
var allFiles = [].concat(srcFiles, testFiles);

gulp.task("lint", function () {
    return gulp.src(allFiles)
        .pipe($.jshint(".jshintrc"))
        .pipe($.plumber())
        .pipe($.jscs())
        .pipe($.jshint.reporter("jshint-stylish"));
});

gulp.task("test", ["lint"], function () {
    return gulp.src(testFiles)
        .pipe($.jasmine());
});

gulp.task("default", ["test"], function () {
    $.watch(allFiles, {readDelay: 50 }, function () {
        gulp.start("test");
    });
});
