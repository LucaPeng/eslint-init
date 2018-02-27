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
const installDeps_1 = require("./lib/installDeps");
const installConfig_1 = require("./lib/installConfig");
const config_1 = require("./lib/config");
const ci_1 = require("./lib/ci");
const chalk = require('chalk');
module.exports = {
    CiSolution: ci_1.CiSolution,
    init(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type: projectType, supportTypeScript, ciSolution, sharedEslintConfig, } = config;
            console.log(chalk.green('正在安装 eslint 相关依赖 ...'));
            yield installDeps_1.default(projectType, supportTypeScript);
            console.log(chalk.green('eslint 依赖安装完成'));
            console.log(chalk.green('正在配置 eslint...'));
            yield installConfig_1.default(sharedEslintConfig);
            yield config_1.default(projectType, supportTypeScript, sharedEslintConfig);
            console.log(chalk.green('eslint 配置完成'));
            console.log(chalk.green('正在设置持续集成检查方案'));
            console.log(chalk.green('开始配置package.json...'));
            yield ci_1.interEslintToCI(ciSolution, projectType, supportTypeScript);
            console.log(chalk.green('持续集成检查方案配置成功'));
            console.log(chalk.green('eslint初始化完成, happy coding~'));
            return true;
        });
    },
};
