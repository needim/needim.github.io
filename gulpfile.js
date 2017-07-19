'use strict'

const gulp = require('gulp')
const watch = require('gulp-watch')
const rigger = require('gulp-rigger')
const browserSync = require('browser-sync')
const prettify = require('gulp-jsbeautifier')
const download = require('gulp-download-stream')
const rename = require('gulp-rename')
const jsonTransform = require('gulp-json-transform')
const Showdown = require('showdown')

const path = {
  build: { // production
    html: './'
  },
  src: { // development
    html: 'src/*.html'
  },
  watch: {
    html: 'src/**/*.html'
  }
}

/* =====================================================
 SERVER
 ===================================================== */
const config = {
  server: {
    baseDir: './'
  },
  tunnel: false,
  host: 'localhost',
  port: 9000,
  logPrefix: 'NEDIM_PP',
  open: false,
  watchTask: true
}

gulp.task('webserver', () => {
  browserSync(config)
})

/* =====================================================
 HTML
 ===================================================== */

gulp.task('html:build', () => {
  return gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(prettify())
    .pipe(gulp.dest(path.build.html))
})

/* =====================================================
 RELEASES
 ===================================================== */

gulp.task('download:gitawards', () => {
  return download('http://git-awards.com/api/v0/users/needim', {
    headers: {
      'User-Agent': 'ned.im personal page'
    }
  })
    .pipe(rename('gitawards.json'))
    .pipe(gulp.dest(path.build.html))
})


/* =====================================================
 BUILD TASK
 ===================================================== */

gulp.task('build', ['html:build'])

/* =====================================================
 WATCH
 ===================================================== */

gulp.task('watch', () => {
  watch([path.watch.html], (event, cb) => {
    gulp.start('html:build')
  })
})

/* =====================================================
 DEFAULT TASK
 ===================================================== */

gulp.task('default', ['download:gitawards', 'build', 'webserver', 'watch'])
