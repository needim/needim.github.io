'use strict';

const { src, dest, watch } = require('gulp');
const rigger = require('gulp-rigger');
const browserSync = require('browser-sync');
const download = require('gulp-download-stream');
const rename = require('gulp-rename');

const path = {
  build: {
    html: './'
  },
  src: {
    html: 'src/*.html'
  },
  watch: {
    html: 'src/**/*.html'
  }
};

function downloadStats() {
  download('http://git-awards.com/api/v0/users/needim', {
    headers: {
      'User-Agent': 'ned.im personal page'
    }
  })
    .pipe(rename('gitawards.json'))
    .pipe(dest(path.build.html));
}

function html() {
  return src(path.src.html)
    .pipe(rigger())
    .pipe(dest(path.build.html));
}

function serve() {
  const config = {
    server: {
      baseDir: './'
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: 'needim-pp',
    open: false,
    watch: true
  };

  downloadStats();
  html();
  watchHTML();
  browserSync.init(config);
}

function watchHTML() {
  return watch(path.watch.html).on('change', () => {
    html();
  });
}

exports.download = downloadStats;
exports.html = html;
exports.default = serve;
