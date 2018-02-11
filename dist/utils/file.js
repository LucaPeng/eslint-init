"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const chalk = require('chalk');
const readline = require('readline');
function hasFile(filePath) {
    if (filePath) {
        let s;
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
function checkExist(filePath, askForOverWrite = false) {
    return new Promise((resolve) => {
        const fileStat = hasFile(filePath);
        if (fileStat && fileStat.isFile()) {
            if (askForOverWrite) {
                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                rl.question(`${filePath}文件已存在，是否要覆盖(Y/n)?`, (ans) => {
                    rl.close();
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
function syncModifyFile(filePath, encode = 'utf8', pattern, replace) {
    let fileContent;
    try {
        fileContent = fs.readFileSync(filePath, encode);
    }
    catch (err) {
        console.log(chalk.red(`read ${filePath} failed`));
        return false;
    }
    const newFileContent = fileContent.replace(pattern, replace);
    try {
        fs.writeFileSync(filePath, newFileContent);
    }
    catch (err) {
        console.log(chalk.red(`modify ${filePath} failed`));
        return false;
    }
    return true;
}
exports.default = {
    hasFile,
    checkExist,
    syncModifyFile
};
