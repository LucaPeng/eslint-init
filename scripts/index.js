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
var installDeps_1 = require("./lib/installDeps");
var installConfig_1 = require("./lib/installConfig");
var config_1 = require("./lib/config");
var context_1 = require("./lib/context");
var logger_1 = require("./lib/logger");
var ci_1 = require("./lib/ci");
var chalk = require('chalk');
module.exports = {
    CiSolution: ci_1.CiSolution,
    init: function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var projectType, supportTypeScript, ciSolution, sharedEslintConfig, silent, pmTool, log, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        projectType = config.type, supportTypeScript = config.supportTypeScript, ciSolution = config.ciSolution, sharedEslintConfig = config.sharedEslintConfig, silent = config.silent, pmTool = config.pmTool;
                        context_1.default.silent = silent || false;
                        log = logger_1.getConsisLogger(silent);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        log(chalk.green('正在安装 eslint 相关依赖 ...'));
                        return [4, installDeps_1.default(projectType, supportTypeScript, pmTool)];
                    case 2:
                        _a.sent();
                        log(chalk.green('eslint 依赖安装完成'));
                        log(chalk.green('正在配置 eslint...'));
                        return [4, installConfig_1.default(sharedEslintConfig, pmTool)];
                    case 3:
                        _a.sent();
                        return [4, config_1.default(projectType, supportTypeScript, sharedEslintConfig)];
                    case 4:
                        _a.sent();
                        log(chalk.green('eslint 配置完成'));
                        log(chalk.green('正在设置持续集成检查方案'));
                        log(chalk.green('开始配置package.json...'));
                        return [4, ci_1.interEslintToCI(ciSolution, projectType, supportTypeScript, pmTool)];
                    case 5:
                        _a.sent();
                        log(chalk.green('持续集成检查方案配置成功'));
                        log(chalk.green('eslint初始化完成, happy coding~'));
                        return [2, true];
                    case 6:
                        err_1 = _a.sent();
                        log(chalk.red('ESLint 配置接入失败'));
                        log(err_1);
                        return [2, err_1];
                    case 7: return [2];
                }
            });
        });
    },
};
