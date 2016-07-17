import gulp from 'gulp';
import eslint from 'gulp-eslint';
import mocha from 'gulp-spawn-mocha';
import clear from 'clear';
import debug from 'gulp-debug';

const isDevelopment = !process.env.ENV
    || process.env.ENV === 'development';

const pathTo = {
  src: __dirname + '/src/**/*.js',
  tests: __dirname + '/test/**/*.test.js',
};

export function clearConsole(cb) {
  clear();
  cb();
}

export function lint() {
  return gulp.src([pathTo.src, pathTo.tests], {
      since: gulp.lastRun('lint'),
      read: true,
    })
    .pipe(eslint())
    .pipe(eslint.format());
}

export function test() {
  return gulp.src(pathTo.tests, {
      since: gulp.lastRun('test'),
      read: false,
    })
    .pipe(mocha());
}

export default function dev() {
  gulp.watch([pathTo.src, pathTo.tests],
    gulp.series('clearConsole', 'lint', 'test'));
}
