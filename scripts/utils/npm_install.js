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
const pm_tool_1 = require("./pm_tool");
const shell = require("shelljs");
function installPackage(packageName, version) {
    return __awaiter(this, void 0, void 0, function* () {
        const pmToolName = yield pm_tool_1.default(packageName);
        const packageStr = `${packageName}${version ? `@${version}` : '@latest'}`;
        try {
            if (pmToolName === 'yarn') {
                shell.exec(`yarn add ${packageStr} --dev`, { silent: false });
            }
            else {
                shell.exec(`${pmToolName} install ${packageStr} --save-dev --save-exact`, { silent: false });
            }
        }
        catch (e) {
            console.log(e);
            return false;
        }
        return true;
    });
}
exports.installPackage = installPackage;
function upgradePackage(packageName, version) {
    return __awaiter(this, void 0, void 0, function* () {
        const pmToolName = yield pm_tool_1.default(packageName);
        const packageStr = `${packageName}${version ? `@${version}` : ''}`;
        try {
            if (pmToolName === 'yarn') {
                shell.exec(`yarn upgrade ${packageStr} --dev`, { silent: false });
            }
            else {
                if (version) {
                    shell.exec(`${pmToolName} install ${packageStr} --save-dev --save-exact`, { silent: false });
                }
                else {
                    shell.exec(`${pmToolName} update ${packageStr}`, { silent: false });
                }
            }
        }
        catch (e) {
            console.log(e);
            return false;
        }
        return true;
    });
}
exports.upgradePackage = upgradePackage;
