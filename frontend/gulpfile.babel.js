import gulp from 'gulp';
import eslint from 'gulp-eslint';
import mocha from 'gulp-spawn-mocha';
import clear from 'clear';

const isDevelopment = !process.env.ENV
    || process.env.ENV === 'development';

const pathTo = {
  src: 'src/**/*.js',
  tests: 'test/**/*.js',
};

export function clearConsole(cb) {
  clear();
  cb();
}

export function lint() {
  return gulp.src([pathTo.src, pathTo.tests], {
      since: gulp.lastRun('lint'),
      read: false,
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
