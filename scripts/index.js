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
const installDeps_1 = require("./lib/installDeps");
const installConfig_1 = require("./lib/installConfig");
const config_1 = require("./lib/config");
var CiSolution;
(function (CiSolution) {
    CiSolution[CiSolution["husky"] = 1] = "husky";
    CiSolution[CiSolution["mfe"] = 2] = "mfe";
})(CiSolution || (CiSolution = {}));
module.exports = {
    CiSolution,
    init(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type: projectType, ciSolution, sharedEslintConfig } = config;
            console.log(chalk.green('正在安装 eslint 相关依赖 ...'));
            yield installDeps_1.default(projectType);
            console.log(chalk.green('eslint 依赖安装完成'));
            console.log(chalk.green('正在配置 eslint...'));
            yield installConfig_1.default(sharedEslintConfig);
            yield config_1.default(projectType, sharedEslintConfig);
            console.log(chalk.green('eslint 配置完成'));
            console.log(chalk.green('正在设置持续集成检查方案'));
            console.log(chalk.green('eslint初始化完成, happy coding~'));
        });
    }
};
