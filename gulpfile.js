var gulp        = require('gulp');
var htmlmin     = require('gulp-htmlmin');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var stylus      = require('gulp-stylus');
var browserSync = require('browser-sync').create();

gulp.task('copy-img', function () {
    return gulp.src([
            './src/image/**.*',
        ])
        .pipe(gulp.dest('./dist/image'));
});

gulp.task('copy-fonts', function () {
    return gulp.src([
            './src/fonts/**.*',
        ])
        .pipe(gulp.dest('./dist/fonts'));
    });

gulp.task('tao-js', function () {
    return gulp.src([
            './src/js/*.js',
        ])
        .pipe(gulp.dest('./dist/js'));
});
gulp.task('html', function () {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

gulp.task('css', function () {
    return gulp.src('./src/css/*.css')
        .pipe(stylus({ compress: true }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('css-min', function () {
    gulp.src('./src/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('tao-php', function () {
    return gulp.src([
            './src/assets/*.php',
        ])
        .pipe(gulp.dest('./dist/assets'));
});



gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        open: false
    });

   
});
gulp.task('watch', function () {
   
    gulp.watch('./src/css/*.css', ['css']);
    gulp.watch('./src/image/**/*.*', ['copy-img']);
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/js/**/*.js', ['tao-js']);
    gulp.watch('./src/assets/*.php', ['tao-php']);
    gulp.watch("./dist/**/*.*").on('change', browserSync.reload);
});
gulp.task('default', [
    'copy-img',
    'copy-fonts',
    'tao-js',
    'html',
    'css',
    'css-min',
    'tao-php',
    'watch',
    'browser-sync'
]);
