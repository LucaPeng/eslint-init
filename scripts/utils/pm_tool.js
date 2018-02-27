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
const file_1 = require("./file");
const commandExists = require('command-exists');
function getPmTool(packageName) {
    return __awaiter(this, void 0, void 0, function* () {
        let pmTool;
        if ((yield file_1.default.checkExist(`${process.cwd()}/yarn.lock`, false)) && (yield commandExists('yarn'))) {
            pmTool = 'yarn';
        }
        else {
            if (packageName && packageName[0] === '@') {
                pmTool = 'mnpm';
            }
            else {
                pmTool = 'npm';
            }
        }
        return pmTool;
    });
}
exports.default = getPmTool;
