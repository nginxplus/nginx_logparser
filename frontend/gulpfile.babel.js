import gulp from 'gulp';
import eslint from 'gulp-eslint';
import mocha from 'gulp-spawn-mocha';

const isDevelopment = !process.env.ENV
    || process.env.ENV === 'development';

export function lint() {
  return gulp.src(['src/**/*.js', 'test/**/*.js'], {
        since: gulp.lastRun('lint'),
        read: false,
      })
      .pipe(eslint())
      .pipe(eslint.format());
}

export function test() {
  return gulp.src('test/**/*.js', {
        since: gulp.lastRun('test'),
        read: false,
      })
      .pipe(mocha());
}
