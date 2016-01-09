var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');

gulp.task('bundle', function () {
  return browserify({
      entries: './src/app.jsx',
      extensions: ['.jsx'],
      debug: true
    })
    .transform('babelify', { presets: ['es2015', 'react'] })
    .bundle()
    .on('error', function (err) {
      console.error(err);
      this.emit('end');
    })
    .pipe(source('main.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('.'));
});

gulp.task('webserver', function () {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      port: 6789
    }));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.jsx', ['bundle']);
  gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('build', ['bundle', 'sass']);
gulp.task('default', ['build', 'webserver', 'watch']);
