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
var npm_install_1 = require("../utils/npm_install");
var config_1 = require("../config");
var fs = require("fs");
var file_1 = require("../utils/file");
var _ = require("lodash");
var logger_1 = require("../lib/logger");
var chalk = require('chalk');
var CiSolution;
(function (CiSolution) {
    CiSolution[CiSolution["none"] = 1] = "none";
    CiSolution[CiSolution["husky"] = 2] = "husky";
    CiSolution[CiSolution["mfe"] = 3] = "mfe";
})(CiSolution = exports.CiSolution || (exports.CiSolution = {}));
function installDeps(deps, pmTool) {
    return __awaiter(this, void 0, void 0, function () {
        var result, keys, i, dep, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    result = {};
                    keys = Object.keys(deps);
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < keys.length)) return [3, 4];
                    dep = keys[i];
                    _a = result;
                    _b = dep;
                    return [4, npm_install_1.installPackage(dep, deps[dep], pmTool)];
                case 2:
                    _a[_b] = _c.sent();
                    _c.label = 3;
                case 3:
                    i += 1;
                    return [3, 1];
                case 4: return [2];
            }
        });
    });
}
function configPackage(eslintPath) {
    var packagePath = process.cwd() + "/package.json";
    var packageExist = file_1.default.checkExist(packagePath, false);
    if (packageExist) {
        var fileContent = fs.readFileSync(packagePath, 'utf-8');
        var fileJSON = JSON.parse(fileContent);
        fileJSON.scripts = _.assign(fileJSON.scripts || {}, {
            precommit: 'lint-staged',
        });
        fileJSON['lint-staged'] = (_a = {},
            _a[eslintPath] = 'eslint',
            _a);
        var fileNewContent = JSON.stringify(fileJSON, null, 2);
        fs.writeFileSync(packagePath, fileNewContent);
        console.log(chalk.bgYellow("\u5F53\u524Dlint\u6587\u4EF6\u4E3A\"" + eslintPath + "\",\u53EF\u6839\u636E\u9879\u76EE\u5177\u4F53\u60C5\u51B5\u8C03\u6574(\u89C1package.json)"));
    }
    else {
        var log = logger_1.getConsisLogger();
        log(chalk.red('ERROR: 未找到package.json文件，请使用 npm init 进行初始化'));
        throw (new Error('package.json not found'));
    }
    var _a;
}
function interEslintToCI(solutionType, projectType, supportTypeScript, pmTool) {
    return __awaiter(this, void 0, void 0, function () {
        var suffix, eslintPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(solutionType === CiSolution.mfe)) return [3, 2];
                    return [4, installDeps(config_1.mfeCiDeps, pmTool)];
                case 1:
                    _a.sent();
                    return [3, 4];
                case 2: return [4, installDeps(config_1.huskyCiDeps, pmTool)];
                case 3:
                    _a.sent();
                    suffix = ['js'];
                    if (projectType === 'vue') {
                        suffix.push('vue');
                    }
                    else if (projectType === 'react') {
                        suffix.push('jsx');
                    }
                    if (supportTypeScript) {
                        suffix.push('ts');
                        if (projectType === 'react') {
                            suffix.push('tsx');
                        }
                    }
                    eslintPath = "*." + (suffix.length > 1 ? "{" + suffix.join(',') + "}" : suffix[0]);
                    configPackage(eslintPath);
                    _a.label = 4;
                case 4: return [2];
            }
        });
    });
}
exports.interEslintToCI = interEslintToCI;
