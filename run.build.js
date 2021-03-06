
/**
 *  run build task
 */

const webpack = require('webpack');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');
const path = require('path');
const async = require('async');
const babel = require('gulp-babel');
const es2015 = require('babel-preset-es2015');
const ora = require('ora');
const del = require('del');

const webpackDistConfig = require('./webpack.dist.config');

const SRC_PATH = path.resolve('./src');
const ELECTRON_PATH = path.join(SRC_PATH, 'electron');
const TASK_PATH = path.join(SRC_PATH, 'task');
const CONNECT_PATH = path.join(SRC_PATH, 'connect');
const NODE_MODULES_PATH = path.resolve('./node_modules');
const PACKAGE_JSON_PATH = path.resolve('./package.json');
const BUILD_PATH = path.resolve('./build');
const BUILD_ELECTRON_PATH = path.resolve('./build/electron');
const BUILD_TASK_PATH = path.resolve('./build/task');
const BUILD_CONNECT_PATH = path.resolve('./build/connect');
const BUILD_NODE_MODULES_PATH = path.resolve('./build/node_modules');
const BUILD_PACKAGE_JSON_PATH = BUILD_PATH;

const CONFIG_FILE_PATH = path.resolve('./.eslintrc.js');

class Log {
    constructor(msg) {
        this.target = ora({
            color: 'yellow',
            text: msg
        });
    }
    start(msg) {
        this.target.start(msg);
    }
    stop() {
        this.target.stop();
    }
    destory() {
        this.target.clear();
    }
    success(msg) {
        this.target.succeed(msg);
        this.target.start('...');
    }
}

const log = new Log("'dist模式正在运行,请耐心等待... '");

log.start();

async.series([
    // clean build
    function (next) {
        del(BUILD_PATH, {
            force: true
        }).then(() => {
            log.success('[1/8] build目录已清除干净');
            next();
        });
    },
    // copy connect
    function (next) {
        gulp.src([`${CONNECT_PATH}/**/*`, '!*.js'])
            .pipe(gulp.dest(BUILD_CONNECT_PATH))
            .on('end', () => {
                next();
            });
    },
    function (next) {
        gulp.src(`${CONNECT_PATH}/**/*.js`)
            .pipe(eslint({
                fix: true,
                configFile: CONFIG_FILE_PATH
            }))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError())
            .pipe(babel({ presets: [es2015] }))
            .pipe(uglify())
            .pipe(gulp.dest(BUILD_CONNECT_PATH))
            .on('end', () => {
                log.success('[2/8] connect目录文件已压缩拷贝至build目录');
                next();
            });
    },
    // copy electron
    function (next) {
        gulp.src([`${ELECTRON_PATH}/**/*.*`, '!*.js'])
            .pipe(gulp.dest(BUILD_ELECTRON_PATH))
            .on('end', () => {
                next();
            });
    },
    function (next) {
        gulp.src(`${ELECTRON_PATH}/**/*.js`)
            .pipe(eslint({
                fix: true,
                configFile: CONFIG_FILE_PATH
            }))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError())
            .pipe(babel({ presets: [es2015] }))
            .pipe(uglify())
            .pipe(gulp.dest(BUILD_ELECTRON_PATH))
            .on('end', () => {
                log.success('[3/8] electron目录文件已压缩拷贝至build目录');
                next();
            });
    },
    // copy task
    function (next) {
        gulp.src([`${TASK_PATH}/**/*.*`, '!*.js'])
            .pipe(gulp.dest(BUILD_TASK_PATH))
            .on('end', () => {
                next();
            });
    },
    function (next) {
        gulp.src([`${TASK_PATH}/**/*.js`, `!${TASK_PATH}/lib/**/*.js`])
            .pipe(eslint({
                fix: true,
                configFile: CONFIG_FILE_PATH
            }))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError())
            .pipe(babel({ presets: [es2015] }))
            .pipe(uglify())
            .pipe(gulp.dest(BUILD_TASK_PATH))
            .on('end', () => {
                log.success('[4/8] task目录文件已压缩拷贝至build目录');
                next();
            });
    },
    function (next) {
        gulp.src(`${TASK_PATH}/lib/**/*.js`, { base: `${TASK_PATH}/` })
            .pipe(gulp.dest(BUILD_TASK_PATH))
            .on('end', () => {
                log.success('[5/8] task目录文件下lib目录拷贝纸build目录下');
                next();
            });
    },
    // copy node_modules
    function (next) {
        gulp.src(`${NODE_MODULES_PATH}/**/*.*`)
            .pipe(gulp.dest(BUILD_NODE_MODULES_PATH))

            .on('end', () => {
                log.success('[6/8] node_module包已拷贝至build目录');
                next();
            });
    },
    // copy package.json
    function (next) {
        gulp.src(PACKAGE_JSON_PATH)
            .pipe(gulp.dest(BUILD_PACKAGE_JSON_PATH))
            .on('end', () => {
                log.success('[7/8] package.json文件已拷贝至build目录');
                next();
            });
    },
    // webpack
    function (next) {
        webpack(webpackDistConfig, (err/* , stats */) => {
            if (err) throw err;
            // console.log(stats.toString({
            //     colors: true,
            //     modules: false,
            //     children: false,
            //     chunks: false,
            //     chunkModules: false
            // }) + '\n')
            log.success('[8/8] app目录已拷贝至build目录');
            log.success('dist已结束 ！');
            log.stop();
            next();
        });
    }
], (error) => {
    if (error) {
        throw new Error(error);
    }
});
