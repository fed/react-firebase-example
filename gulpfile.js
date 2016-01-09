var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var server = require('gulp-server-livereload');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

var bundler = watchify(browserify({
  entries: ['./src/app.jsx'],
  extensions: ['.jsx'],
  debug: true
}));

function bundle () {
  return bundler
    .transform('babelify', {presets: ['react']})
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.js'))
    .pipe(gulp.dest('./'))
}

bundler.on('update', bundle);

gulp.task('build', function() {
  bundle();
});

gulp.task('serve', function(done) {
  gulp.src('')
    .pipe(server({
      livereload: {
        enable: true,
        filter: function(filePath, cb) {
          if(/main.js/.test(filePath)) {
            cb(true)
          } else if(/style.css/.test(filePath)){
            cb(true)
          }
        }
      },
      port: 6789,
      open: true
    }));
});

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['build', 'serve', 'sass', 'watch']);

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
