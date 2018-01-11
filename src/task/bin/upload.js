
/**
 * run upload task
 */

const path = require('path');
const sshHandler = require('../atom/ssh');

const chalk = require('../util/chalk');
const { requireUncached } = require('../util/index');

const { getUploadObj } = require('../task.config.js');
const { constantConfig } = require('../common/index');

const { CONFIGNAME } = constantConfig;

function upload(projectPath, loggerhandler, fn) {
    const curConfigPath = path.join(projectPath, CONFIGNAME);
    const setting = requireUncached(curConfigPath);
    const sshObj = getUploadObj({
        path: projectPath,
        packageModules: setting.choseModules,
        setting
    });

    loggerhandler(`${chalk.blue('☆')}  Pack模式已启动...`);

    sshHandler(sshObj, {
        start() {
            loggerhandler(`${chalk.blue('○')}  Starting  '${chalk.lightBlue('zip')}'...`);
        },
        end() {
            loggerhandler(`${chalk.blue('✔')}  Finished  '${chalk.lightBlue('zip')}'...`);
            fn && fn();
        },
        log(err) {
            loggerhandler(`${chalk.red('☼  Error bug (the task has crashed and stopped, please fix the bug recompiling) :')}\n${err}`);
        }
    });
}

module.exports = upload;
