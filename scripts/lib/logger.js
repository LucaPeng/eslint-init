"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = function (silent) { return function (content) {
    if (!silent && content) {
        console.log(content);
    }
}; };
var consisLogger;
exports.getConsisLogger = function (silent) {
    if (silent === void 0) { silent = false; }
    if (!consisLogger) {
        consisLogger = exports.logger(silent);
    }
    return consisLogger;
};
