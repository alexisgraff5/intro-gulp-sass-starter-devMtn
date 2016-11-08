/*var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    del = require('del'),
    sass = require('gulp-sass'),
    karma = require('gulp-karma'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    spritesmith = require('gulp.spritesmith'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    ngAnnotate = require('browserify-ngannotate');*/

    var gulp = require('gulp'),
        del = require('del'),
        sass = require('gulp-sass'),
        sourcemaps = require('gulp-sourcemaps'),
        uglify = require('gulp-uglify'),
        concat = require('gulp-concat'),
        print = require('gulp-print'),
        babel = require('gulp-babel');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

gulp.task('build-css', function() {
  return gulp.src('./styles/*')
    .pipe(sourcemaps.init())  // iniitalizing sourcemaps - helps debugger remember how you set things up
    .pipe(sass())
    .pipe(cachebust.resources())
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('clean', function (cb) {
    del([
         'dist'
     ], cb);
 });

//gulp.task('build-css', ['clean'], function () {
    //return gulp.src('./styles/*')
      //  .pipe(sourcemaps.init())
      //  .pipe(sass())
//         .pipe(cachebust.resources())
//         .pipe(sourcemaps.write('./maps'))
//         .pipe(gulp.dest('./dist'));
// });


gulp.task('build-js', function() {
 return gulp.src('js/**/*.js')
     .pipe(sourcemaps.init())
     .pipe(print())
     .pipe(babel({ presets: ['es2015'] }))
     .pipe(concat('bundle.js'))
     .pipe(sourcemaps.write('./'))
     .pipe(gulp.dest('./dist/js'));
});

gulp.task('build', ['clean', 'build-css'], function() {
     return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
 });
//'./js/**/*.js'
gulp.task('watch', function() {
    return gulp.watch(['./index.html', './styles/*.*css'], ['build']);
});


// gulp.task('webserver', ['watch','build'], function() {
//     gulp.src('.')
//         .pipe(webserver({
//             livereload: false,
//             directoryListing: true,
//             open: "http://localhost:8000/dist/index.html"
//         }));
// });

// gulp.task('dev', ['watch', 'webserver']);
