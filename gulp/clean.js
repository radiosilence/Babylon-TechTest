import gulp from 'gulp';
import clean from 'gulp-clean';

gulp.task('clean', (done) =>
  gulp.src(['./build/**/*.js'])
    .pipe(clean({ read: false, force: true })),
);
