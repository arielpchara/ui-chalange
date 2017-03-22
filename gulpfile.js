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
const less = require('gulp-less');
const lesshint = require('gulp-lesshint');
const changed = require('gulp-changed');
const notify = require('gulp-notify');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

gulp.task('esliint', function lint() {
    return gulp.src(['src/app/**/*.js'])
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('scripts', function scripts() {
    const DEST = './dist/js/';
    const b = browserify({
            entries: './src/app/app.js'
        })
        .transform("babelify", { presets: ["es2015"] })
        .transform('brfs')
        .transform('browserify-ngannotate');

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(DEST))
        .pipe(notify('scripts complete'));
});

gulp.task('fonts', function fonts() {
    gulp.src('src/lib/font-awesome-less/assets/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('styles', function styles() {
    const DEST = 'dist/styles';
    return gulp.src('src/styles/styles.less')
        .pipe(less({
            plugins: [autoprefix],
            paths: [
                '.',
                './node_modules/bootstrap-less',
                './src/lib/font-awesome-less/assets/stylesheets',
            ]
        }))
        .pipe(gulp.dest(DEST))
        .pipe(notify('styles complete'));
});

gulp.task('watch', ['scripts', 'styles'], function watch() {
    gulp.watch(['src/app/**/*.js', 'src/app/**/*.html'], ['build']);
    gulp.watch(['src/styles/**/*.less'], ['styles']);
});


gulp.task('build', ['fonst', 'styles', 'scripts']);