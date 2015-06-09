import gulp from 'gulp';
import co from 'co';
import path from 'path';
import plumber from 'gulp-plumber';
import * as config from './config';

import * as gb from 'greasebox';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';


gulp.task('build', ['clean:build'], (cb) => {
  gulp.src('source/**/*.js')
  .pipe(plumber({
    errorHandler: cb
  }))
  .pipe(sourcemaps.init())
  .pipe(babel(config.babelOptions))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('build'))
  .on('end', cb);
});

gulp.task('clean:build', (cb) => {
  gb.rm(path.resolve(__dirname, '../build'))
    .then(cb)
    .catch(cb);
});
