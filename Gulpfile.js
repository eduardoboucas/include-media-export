'use strict';

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var packageInfo = require('./package.json');


// -----------------------------------------------------------------------------
// Dist
// -----------------------------------------------------------------------------

gulp.task('compress', function() {
  return gulp.src('./include-media.js')
    .pipe(plugins.uglify())
    .pipe(plugins.rename({
      suffix: '-' + packageInfo.version + '.min'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('concat-scss', function() {
    return gulp.src(['./src/helpers/_breakpoints-to-json.scss', './src/helpers/_export.scss', './src/_include-media-export.scss'])
        .pipe(plugins.concat('_include-media-export.scss'))
        .pipe(gulp.dest('./dist'));
});

// -----------------------------------------------------------------------------
// Test
// -----------------------------------------------------------------------------

gulp.task('test-scss', function() {
    return gulp.src('test/test.scss')
        .pipe(plugins.sass({
            cwd: 'test',
            pipeStdout: true,
            sassOutputStyle: 'expanded',
            includePaths: 'node_modules'
        }).on('error', plugins.sass.logError))
        .pipe(gulp.dest('tmp'))
});


// -----------------------------------------------------------------------------
// Default task
// -----------------------------------------------------------------------------

gulp.task('default', gulp.parallel('compress', 'concat-scss'));
