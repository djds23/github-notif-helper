'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require("browserify")
var esdoc = require("gulp-esdoc");;

gulp.task('default', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './src/app.js',
    debug: true,
  }).transform("babelify", { presets: ["es2015"] });

  return b.bundle()
    .pipe(source('./app/app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dev/'));
});

gulp.task('release', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './src/app.js',
  }).transform("babelify", { presets: ["es2015"] });

  return b.bundle()
    .pipe(source('./app/app.js'))
    .pipe(buffer())
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(gulp.dest('./dist/'));
});

gulp.task('doc', function () {
  return gulp.src('./src').pipe(esdoc({ destination: "./esdoc" }));
});

