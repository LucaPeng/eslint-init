"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require('readline');
function question(query) {
    return new Promise(function (resolve) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(query, (ans) => {
            rl.close();
            resolve(ans);
        });
    });
}
exports.default = question;
;
