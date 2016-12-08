var gulp = require('gulp');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');
var scsslint = require('gulp-scss-lint');

gulp.task('img', function() {
    return gulp.src([
                'app/img/**'
            ])
        .pipe(gulp.dest('dist/img'))
});

gulp.task('fonts', function() {
    return gulp.src([
                'app/fonts/**'
            ])
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('css', function() {
    return gulp.src('app/sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
          browsers: ['> 1%', 'last 2 versions']
        }))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function() {
    return gulp.src('app/js/*.js')
        //.pipe(sourcemaps.init())
        //.pipe(babel())
        .pipe(gulp.dest('dist/js'))
        //.pipe(rename({suffix: '.min'}))
        //.pipe(uglify())
        //.pipe(gulp.dest('dist'))
});

gulp.task('html', function() {
    return gulp.src(['app/*.html'])
        //.pipe(replace('.css', '.min.css'))
        //.pipe(replace('.js', '.min.js'))
        .pipe(gulp.dest('dist'))
});

gulp.task('browser-sync', function() {
    browserSync.init(['app/*'], {
        server: {
            host: "local.dev",
            baseDir: "./dist/"
        },
        ghostMode: false
    });
});

/* Watch Files For Changes */
gulp.task('watch', function() {
    gulp.watch(['app/*.html'], ['html']);
    gulp.watch('app/img/**', ['img']);
    gulp.watch(['app/sass/**'], ['css']);
    gulp.watch(['app/js/**'], ['js']);
    gulp.watch([
       'dist/**/*.html',
       'dist/js/**/*.js',
       'dist/img/**/*',
       'dist/css/main.css'
    ]).on('change', browserSync.reload);
});

gulp.task('default', ['html', 'img', 'fonts', 'css', 'js', 'watch', 'browser-sync']);
