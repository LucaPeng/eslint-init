"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("../lib/logger");
var fs = require('fs');
var chalk = require('chalk');
var readline = require('readline');
function hasFile(filePath) {
    if (filePath) {
        var s = void 0;
        try {
            s = fs.statSync(filePath);
        }
        catch (e) {
            return false;
        }
        return s;
    }
    else {
        return false;
    }
}
function checkExist(filePath, askForOverWrite) {
    if (askForOverWrite === void 0) { askForOverWrite = false; }
    return new Promise(function (resolve) {
        var fileStat = hasFile(filePath);
        if (fileStat && fileStat.isFile()) {
            if (askForOverWrite) {
                var rl_1 = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                });
                rl_1.question(filePath + "\u6587\u4EF6\u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8981\u8986\u76D6(Y/n)?", function (ans) {
                    rl_1.close();
                    if (ans !== 'n') {
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                });
            }
            else {
                resolve(true);
            }
        }
        else {
            resolve(false);
        }
    });
}
function syncModifyFile(filePath, encode, pattern, replace) {
    if (encode === void 0) { encode = 'utf8'; }
    var fileContent;
    var log = logger_1.getConsisLogger();
    try {
        fileContent = fs.readFileSync(filePath, encode);
    }
    catch (err) {
        log(chalk.red("read " + filePath + " failed"));
        return -1;
    }
    var newFileContent;
    if (fileContent && fileContent.match(pattern)) {
        newFileContent = fileContent.replace(pattern, replace);
    }
    else {
        return 0;
    }
    try {
        fs.writeFileSync(filePath, newFileContent);
    }
    catch (err) {
        log(chalk.red("modify " + filePath + " failed"));
        return -1;
    }
    return 1;
}
exports.default = {
    hasFile: hasFile,
    checkExist: checkExist,
    syncModifyFile: syncModifyFile,
};
