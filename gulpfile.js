'use strict';
const gulp = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

var config = {
    pugDirectory: './_pugfiles/',
    serverDirectory: './'
};


// Compile pug files to html
gulp.task('pug', () =>{
  return gulp.src( config.pugDirectory + '*.pug')
    .pipe(pug())
    .pipe(gulp.dest(config.serverDirectory))
});

// the working directory
gulp.task('browser-sync',['pug'],function() {
    browserSync.init({
        server: {
            baseDir: config.serverDirectory,
        }
    });
});



// Watch files comiling
gulp.task('watch', function () {
  gulp.watch(config.pugDirectory + '*.pug', ['pug']);
  gulp.watch( config.serverDirectory+'*.html').on('change', reload);
});

gulp.task('default', ['watch', 'browser-sync']);
