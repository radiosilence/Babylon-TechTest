
require('babel-core/register');
const gulp = require('gulp');

require('./gulp/clean');
require('./gulp/dev-bundle');
require('./gulp/lint');
require('./gulp/yarn');

gulp.task('default', ['dev-bundle']);
