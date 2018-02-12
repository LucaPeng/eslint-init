"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonDeps = {
    'eslint': '4.9.0',
    'babel-eslint': '8.2.1'
};
exports.pluginDeps = {
    ['base-es6']: {
        'eslint-plugin-import': '2.8.0'
    },
    vue: {
        'eslint-plugin-import': '2.8.0',
        'eslint-plugin-vue': '4.2.2',
        'eslint-plugin-html': '4.0.2'
    },
    react: {
        'eslint-plugin-import': '2.8.0',
        'eslint-plugin-react': '7.6.1',
        'eslint-plugin-jsx-a11y': '6.0.3'
    },
    node: {
        'eslint-plugin-import': '2.8.0',
        'eslint-plugin-node': '6.0.0'
    }
};
exports.configDeps = {
    react: {
        'eslint-config-airbnb': '16.1.0'
    },
    default: {
        'eslint-config-airbnb-base': '12.1.0'
    }
};
exports.DeafultSharedEslintConfig = {
    'eslint-config-mfe': '0.0.1'
};
