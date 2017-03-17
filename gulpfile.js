'use strict';

const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const eslint = require('gulp-eslint');
const plumber = require('gulp-plumber');


gulp.task('lint', () => {
    return gulp.src(['src/**/*.js'])

    .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('build', function build() {
    var b = browserify({
            entries: './src/app.js',
            debug: true
        })
        .transform("babelify", { presets: ["es2015"] })

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watch', ['build'], function watch() {
    gulp.watch(['src/**/*.js'], ['build']);
});