var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: ['.'],
    livereload: true,
    port: 3001
  });
});

gulp.task('default', ['connect'], function() {
  // place code for your default task here
});
