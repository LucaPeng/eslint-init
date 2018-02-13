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
const npm_install_1 = require("../utils/npm_install");
const config_1 = require("../config");
const fs = require("fs");
const file_1 = require("../utils/file");
const chalk = require('chalk');
var CiSolution;
(function (CiSolution) {
    CiSolution[CiSolution["none"] = 1] = "none";
    CiSolution[CiSolution["husky"] = 2] = "husky";
    CiSolution[CiSolution["mfe"] = 3] = "mfe";
})(CiSolution = exports.CiSolution || (exports.CiSolution = {}));
;
function installDeps(deps) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = {};
        const keys = Object.keys(deps);
        for (let i = 0; i < keys.length; i++) {
            const dep = keys[i];
            result[dep] = yield npm_install_1.installPackage(dep, deps[dep]);
        }
    });
}
function configPackage(eslintPath) {
    const packagePath = process.cwd() + '/package.json';
    const packageExist = file_1.default.checkExist(packagePath, false);
    if (packageExist) {
        const fileContent = fs.readFileSync(packagePath, 'utf-8');
        const fileJSON = JSON.parse(fileContent);
        fileJSON.scripts = Object.assign(fileJSON.scripts || {}, {
            precommit: 'lint-staged'
        });
        fileJSON['lint-staged'] = {
            [eslintPath]: 'eslint'
        };
        const fileNewContent = JSON.stringify(fileJSON, null, 2);
        fs.writeFileSync(packagePath, fileNewContent);
        console.log(chalk.bgYellow(`当前lint文件为"${eslintPath}",可根据项目具体情况调整(见package.json)`));
    }
    else {
        console.log(chalk.red('ERROR: 未找到package.json文件，请使用 npm init 进行初始化'));
        process.exit(1);
    }
}
function interEslintToCI(solutionType, projectType, supportTypeScript) {
    return __awaiter(this, void 0, void 0, function* () {
        if (solutionType === CiSolution.mfe) {
            yield installDeps(config_1.mfeCiDeps);
        }
        else {
            yield installDeps(config_1.huskyCiDeps);
            const suffix = ['js'];
            if (projectType == 'vue') {
                suffix.push('vue');
            }
            else if (projectType == 'react') {
                suffix.push('jsx');
            }
            if (supportTypeScript) {
                suffix.push('ts');
                if (projectType == 'react') {
                    suffix.push('tsx');
                }
            }
            const eslintPath = `*.${suffix.length > 1 ? '{' + suffix.join(',') + '}' : suffix[0]}`;
            configPackage(eslintPath);
        }
    });
}
exports.interEslintToCI = interEslintToCI;
;
