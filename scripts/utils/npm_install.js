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
var pm_tool_1 = require("./pm_tool");
var shell = require("shelljs");
var logger_1 = require("../lib/logger");
var context_1 = require("../lib/context");
function installPackage(packageName, version, assignPmTool) {
    return __awaiter(this, void 0, void 0, function () {
        var pmToolName, _a, packageStr, log;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = assignPmTool;
                    if (_a) return [3, 2];
                    return [4, pm_tool_1.default(packageName)];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    pmToolName = _a;
                    packageStr = "" + packageName + (version ? "@" + version : '@latest');
                    try {
                        if (pmToolName === 'yarn') {
                            shell.exec("yarn add " + packageStr + " --dev", { silent: context_1.default.silent });
                        }
                        else {
                            shell.exec(pmToolName + " install " + packageStr + " --save-dev --save-exact", { silent: context_1.default.silent });
                        }
                    }
                    catch (e) {
                        log = logger_1.getConsisLogger();
                        log(e);
                        return [2, false];
                    }
                    return [2, true];
            }
        });
    });
}
exports.installPackage = installPackage;
function upgradePackage(packageName, version, assignPmTool) {
    return __awaiter(this, void 0, void 0, function () {
        var pmToolName, _a, packageStr, log;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = assignPmTool;
                    if (_a) return [3, 2];
                    return [4, pm_tool_1.default(packageName)];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    pmToolName = _a;
                    packageStr = "" + packageName + (version ? "@" + version : '');
                    try {
                        if (pmToolName === 'yarn') {
                            shell.exec("yarn upgrade " + packageStr + " --dev", { silent: context_1.default.silent });
                        }
                        else {
                            if (version) {
                                shell.exec(pmToolName + " install " + packageStr + " --save-dev --save-exact", { silent: context_1.default.silent });
                            }
                            else {
                                shell.exec(pmToolName + " update " + packageStr, { silent: context_1.default.silent });
                            }
                        }
                    }
                    catch (e) {
                        log = logger_1.getConsisLogger();
                        log(e);
                        return [2, false];
                    }
                    return [2, true];
            }
        });
    });
}
exports.upgradePackage = upgradePackage;
