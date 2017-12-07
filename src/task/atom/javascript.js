
/**
 * javascript 操作
 */

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rap = require('./rap.js');

module.exports = function (config, startCb, endCb) {

    const { src, srcBase, dest, isDelRap, isMinify } = config;

    startCb && startCb();

    let stream = gulp.src(src, { base: srcBase })

    if (isDelRap) {
        stream = stream.pipe(rap())
    }

    if (isMinify) {
        stream = stream.pipe(uglify())
    }

    stream = stream.pipe(gulp.dest(dest))
        .on('end', function () {
            endCb && endCb();
        });

    return stream;
}


