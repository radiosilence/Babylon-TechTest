import gulp from 'gulp';
import yarn from 'gulp-yarn';

gulp.task('yarn', (done) => gulp.src(['./package.json'])
    .pipe(yarn()));
