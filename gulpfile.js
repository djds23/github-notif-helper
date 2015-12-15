'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require("browserify");

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
    .pipe(gulp.dest('./dist/'));
});
