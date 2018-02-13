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
const shell = require('shelljs');
const chalk = require('chalk');
const detectInstalled = require('detect-installed');
const npm_install_1 = require("../utils/npm_install");
const config_1 = require("../config");
function installDep(packageName, version) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk.green(`${packageName}${version ? '@' + version : ''}`));
        if (yield detectInstalled(packageName, { local: true })) {
            return yield npm_install_1.upgradePackage(packageName, version);
        }
        else {
            return yield npm_install_1.installPackage(packageName, version);
        }
    });
}
function installDepList(deps) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = {};
        const keys = Object.keys(deps);
        for (let i = 0; i < keys.length; i++) {
            const dep = keys[i];
            result[dep] = yield installDep(dep, deps[dep]);
        }
        return result;
    });
}
function installDeps(projectType, supportTypeScript) {
    return __awaiter(this, void 0, void 0, function* () {
        const commonResult = yield installDepList(config_1.commonDeps);
        let pluginResult = {};
        if (config_1.pluginDeps[projectType]) {
            pluginResult = yield installDepList(config_1.pluginDeps[projectType]);
        }
        const configResult = yield installDepList(config_1.configDeps[projectType] || config_1.configDeps.default);
        let tsResult = {};
        if (supportTypeScript) {
            tsResult = yield installDepList(config_1.tsDeps);
        }
        return Object.assign(commonResult, pluginResult, configResult, tsResult);
    });
}
exports.default = installDeps;
