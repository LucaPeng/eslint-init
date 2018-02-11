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
const pm_tool_1 = require("../utils/pm_tool");
const config_1 = require("../config");
function installDep(packageName, version) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk.green(`${packageName}${version ? '@' + version : ''}`));
        try {
            const pmToolName = yield pm_tool_1.default(packageName);
            const packageStr = `${packageName}${version ? '@' + version : '@latest'}`;
            if (yield detectInstalled(packageName, { local: true })) {
                if (pmToolName === 'yarn') {
                    shell.exec(`yarn add ${packageStr} --dev`, { silent: false });
                }
                else {
                    shell.exec(`${pmToolName} install ${packageStr} --save-dev`, { silent: false });
                }
            }
            else {
                if (pmToolName === 'yarn') {
                    shell.exec(`yarn upgrade ${packageStr}`, { silent: false });
                }
                else {
                    shell.exec(`${pmToolName} install ${packageStr} --save-dev`, { silent: false });
                }
            }
        }
        catch (e) {
            console.log(chalk.red(`fail to install ${packageName}`), e);
            return false;
        }
        return true;
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
function installDeps(projectType) {
    return __awaiter(this, void 0, void 0, function* () {
        const commonResult = yield installDepList(config_1.commonDeps);
        let pluginResult = {};
        if (config_1.pluginDeps[projectType]) {
            pluginResult = yield installDepList(config_1.pluginDeps[projectType]);
        }
        const configResult = yield installDepList(config_1.configDeps[projectType] || config_1.configDeps.default);
        return Object.assign(commonResult, pluginResult, configResult);
    });
}
exports.default = installDeps;
