"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var question_1 = require("../utils/question");
var file_1 = require("../utils/file");
var config_1 = require("../config");
var logger_1 = require("./logger");
var chalk = require('chalk');
var fs = require('fs');
function hasSpecialTsConfig(projectType) {
    return ['node', 'react'].indexOf(projectType) > -1;
}
function getEslintExtendsConfig(packageName, projectType, supportTypeScript) {
    var result;
    if (!supportTypeScript) {
        result = "[\n    '" + packageName + "/eslintrc." + projectType + ".js'\n  ]";
    }
    else {
        result = "[\n    '" + packageName + "/eslintrc." + projectType + ".js',\n    '" + packageName + "/eslintrc.typescript" + (hasSpecialTsConfig(projectType) ? "-" + projectType : '') + ".js'\n  ]";
    }
    return result;
}
function configEslintRC(projectType, supportTypeScript, sharedEslintConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var eslintRcPath, exsit, configDep, packageName, eslintConfigPath, log, eslintConfigContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    eslintRcPath = process.cwd() + "/.eslintrc.js";
                    return [4, file_1.default.checkExist(eslintRcPath, false)];
                case 1:
                    exsit = _a.sent();
                    configDep = sharedEslintConfig || config_1.DeafultSharedEslintConfig;
                    packageName = Object.keys(configDep)[0];
                    eslintConfigPath = getEslintExtendsConfig(packageName, projectType, supportTypeScript);
                    log = logger_1.getConsisLogger();
                    eslintConfigContent = "//https://eslint.org/docs/user-guide/configuring\nmodule.exports = {\n  root: true,\n  extends: " + eslintConfigPath + "\n}";
                    if (!exsit) return [3, 3];
                    return [4, question_1.default('eslint配置文件已存在，是否要增加团队标准配置扩展(Y/n)').then(function (ans) {
                            if (ans !== 'n') {
                                log(chalk.green('更新当前 eslintrc.js 配置文件，增加 extend...'));
                                var modifyResult = file_1.default.syncModifyFile(eslintRcPath, 'utf-8', /(?<=["']?extends["']?:\s)('[^']+?'|"[^"]+?"|\[[^]+?\])/, eslintConfigPath);
                                if (modifyResult === 1) {
                                    log(chalk.green('eslintrc.js 配置文件更新完成'));
                                }
                                else if (modifyResult === 0) {
                                    var addExtendsResult = file_1.default.syncModifyFile(eslintRcPath, 'utf-8', /(?<=module.exports[\s]?=[\s]?{)/, "\n  extends: " + eslintConfigPath + ",");
                                    if (addExtendsResult === 1) {
                                        log(chalk.green('eslintrc.js 配置文件更新完成'));
                                    }
                                    else {
                                        log(chalk.red('eslintrc.js 配置文件更新失败，请查看具体的错误信息'));
                                        throw (new Error('fail to update eslintrc.js'));
                                    }
                                }
                                else {
                                    log(chalk.red('eslintrc.js 配置文件更新失败，请查看具体的错误信息'));
                                    throw (new Error('fail to update eslintrc.js'));
                                }
                            }
                        })];
                case 2:
                    _a.sent();
                    return [3, 4];
                case 3:
                    log(chalk.green('检测到该项目尚无 eslintrc.js 配置文件'));
                    log(chalk.green('复制标准 eslintrc.js 配置模板到项目空间...'));
                    fs.writeFileSync(process.cwd() + "/.eslintrc.js", eslintConfigContent, 'utf-8');
                    log(chalk.green('eslint配置完成'));
                    log(chalk.bgGreen('如果该项目中已经存在 eslintrc.js 之外的其他eslint配置文件，可以删除~'));
                    _a.label = 4;
                case 4: return [2];
            }
        });
    });
}
exports.default = configEslintRC;
