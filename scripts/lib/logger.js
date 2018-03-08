"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = function (silence) { return function (content) {
    if (!silence && content) {
        console.log(content);
    }
}; };
var consisLogger;
exports.getConsisLogger = function (silence) {
    if (silence === void 0) { silence = false; }
    if (!consisLogger) {
        consisLogger = exports.logger(silence);
    }
    return consisLogger;
};
