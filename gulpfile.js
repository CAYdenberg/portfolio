require('dotenv').config();

const isProduction = () => (process.env.ENV === 'production');

const gulp = require('gulp');
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const imagemin = require('gulp-imagemin');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const minify = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');

gulp.task('css', function() {
  gulp.src('./src/scss/_main.scss')
    .pipe(rename('style.css'))
    .pipe(sass())
    .on('error', gutil.log)
    // minify in production, stream to browser in dev
    .pipe(gulpif(isProduction(), minify(), browserSync.stream()))
    .pipe(gulp.dest('./dist'));
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
  browserify('./src/js/script.js')
    .transform('babelify')
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    // minify in production, stream to browser in dev
    .pipe(gulpif(isProduction(), uglify(), browserSync.stream()))
    .pipe(gulp.dest('./dist'));
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

gulp.task('default', ['css', 'images', 'lint', 'js']);
