import gulp from 'gulp';
import eslint from 'gulp-eslint';

gulp.task('lint', (done) =>
   gulp.src(['./src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()),
);
