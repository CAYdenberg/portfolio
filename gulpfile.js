require('dotenv').config();

const gulp = require('gulp');
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const imagemin = require('gulp-imagemin');

const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');


gulp.task('css', function() {
  gulp.src('./src/_main.scss')
    .pipe(rename('style.css'))
    .pipe(sass())
    .on('error', gutil.log)
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
  return gulp.src('./src/icons/fonts/**')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('images', function() {
  return gulp.src('src/img/**')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('lint', function() {

  return gulp.src(['**/*.js','!node_modules/**', '!dist/**/*.js'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format());

});

gulp.task('js', function () {

});


gulp.task('watch', function () {

  gulp.watch(['src/**/*.scss'], ['css']);
  // watch CLIENT SIDE JS
  gulp.watch(['src/**/*.js'], ['js']);
  // trigger browserSync reload when HBS files change
  gulp.watch(['**/*.hbs'], browserSync.reload);

  return nodemon({

    script: 'keystone.js',

    // watch SERVER SIDE files
    // note we are NOT watching components even though most of these render
    // server-side as well.
    watch: ['app.js', 'routes/**/*.js', 'models/**/*.js', 'templates/**/*.js']

  })
  .once('start', function() {
    browserSync.init({
      proxy: 'http://localhost:' + process.env.PORT,
      port: (parseInt(process.env.PORT, 10) + 1)
    });
  }).on('restart', browserSync.reload);

});

gulp.task('default', ['css', 'fonts', 'lint', 'js']);
