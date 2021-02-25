var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssbeautify = require('gulp-cssbeautify');
var removeComments = require('gulp-strip-css-comments');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var minify = require('gulp-minify');

function css_style(done){
  /* minifi css */
  gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css/'));
  done();
  /* uncompresed css */
  gulp.src('./scss/**/*.scss')
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'expanded' 
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
      cascade: true
    }))
    .pipe(removeComments())
    .pipe(cssbeautify())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
  done();
}
function js_minify(done){
  gulp.src('./js_src/**/*.js')
  .pipe(minify({
    errorLogToConsole: true,
    ext: {
        min: '.min.js'
    },
    ignoreFiles: ['-min.js']
    }))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('./js/'))
  done();
}
function Sync(done){
  browserSync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
}
function browserReload(done){
  browserSync.reload();
  done();
}
function watchFiles(){
  gulp.watch("./scss/**/*", css_style);
  gulp.watch("./**/*.html", browserReload);
  gulp.watch("./**/*.php", browserReload);
  gulp.watch("./js_src/*.js", js_minify);
  gulp.watch("./js/**/*.js", browserReload);
}
//gulp.task('default', css_style);
//gulp.task(start);
//exports.default = StartGulp;
//gulp.task('default', gulp.series(start, watchSass));

gulp.task('default', gulp.parallel(Sync, watchFiles));