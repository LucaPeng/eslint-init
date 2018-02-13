"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require('chalk');
const fs = require('fs');
const question_1 = require("../utils/question");
const file_1 = require("../utils/file");
const config_1 = require("../config");
function hasSpecialTsConfig(projectType) {
    return ['node', 'react'].indexOf(projectType) > -1;
}
function getEslintExtendsConfig(packageName, projectType, supportTypeScript) {
    if (!supportTypeScript) {
        return `[
    '${packageName}/eslintrc.${projectType}.js'
  ]`;
    }
    else {
        return `[
    '${packageName}/eslintrc.${projectType}.js',
    '${packageName}/eslintrc.typescript${hasSpecialTsConfig(projectType) ? '-' + projectType : ''}.js'
  ]`;
    }
}
function default_1(projectType, supportTypeScript, sharedEslintConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        const eslintRcPath = process.cwd() + '/.eslintrc.js';
        const exsit = yield file_1.default.checkExist(eslintRcPath, false);
        let configDep = sharedEslintConfig || config_1.DeafultSharedEslintConfig;
        const packageName = Object.keys(configDep)[0];
        const eslintConfigPath = getEslintExtendsConfig(packageName, projectType, supportTypeScript);
        const eslintConfigContent = `//https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  extends: ${eslintConfigPath}
}`;
        if (exsit) {
            yield question_1.default('eslint配置文件已存在，是否要增加团队标准配置扩展(Y/n)').then((ans) => {
                if (ans !== 'n') {
                    console.log(chalk.green('更新当前 eslintrc.js 配置文件，增加 extend...'));
                    const modifyResult = file_1.default.syncModifyFile(eslintRcPath, 'utf-8', /(?<=extends:\s)('[^']+'|\[[^]+\])/, eslintConfigPath);
                    if (modifyResult === true) {
                        console.log(chalk.green('eslintrc.js 配置文件更新完成'));
                    }
                    else {
                        console.log(chalk.red('eslintrc.js 配置文件更新失败，请查看具体的错误信息'));
                        process.exit(1);
                    }
                }
            });
        }
        else {
            const eslintRcOld = process.cwd() + '/.eslintrc';
            const oldExsit = yield file_1.default.checkExist(eslintRcOld, false);
            if (oldExsit) {
                const choice = yield question_1.default('检查到已废弃的配置方式 .eslintrc, 是否升级为 .eslintrc.js, 原有配置会被迁移(Y/n)');
                if (choice !== 'n') {
                    try {
                        const fileContent = fs.readFileSync(eslintRcOld, 'utf-8');
                        const fileJSON = JSON.parse(fileContent);
                        const newFileJSON = Object.assign({
                            extends: eslintConfigPath
                        }, fileJSON);
                        if (newFileJSON && newFileJSON.rules) {
                            const choiceToDeleteOldRules = yield question_1.default('检测到存在已有的 eslint 规则，是否保留Y/n?');
                            if (choiceToDeleteOldRules === 'n') {
                                delete newFileJSON.rules;
                            }
                        }
                        const newFileContent = 'module.exports = ' + JSON.stringify(newFileJSON, null, 2) + ';\n';
                        fs.writeFileSync(eslintRcPath, newFileContent);
                        console.log(chalk.green('eslint 配置升级并更新完成，please check for sure'));
                    }
                    catch (e) {
                        console.log(chalk.red('自动升级失败，请手动升级'), e);
                    }
                }
                else {
                    console.log(chalk.red('放弃升级eslint配置，请手动进行eslint配置'));
                }
            }
            else {
                console.log(chalk.green('检测到该项目尚无 eslint 配置文件'));
                console.log(chalk.green('复制标准 eslintrc 配置模板到项目空间...'));
                fs.writeFileSync(process.cwd() + '/.eslintrc.js', eslintConfigContent, 'utf-8');
                console.log(chalk.green('eslint配置完成'));
            }
        }
    });
}
exports.default = default_1;
;
