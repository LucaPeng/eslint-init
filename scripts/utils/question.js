"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require('readline');
function question(query) {
    return new Promise(function (resolve) {
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question(query, function (ans) {
            rl.close();
            resolve(ans);
        });
    });
}
exports.default = question;
