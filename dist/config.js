"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonDeps = {
    'eslint': '^4.9.0',
    'babel-eslint': ''
};
exports.pluginDeps = {
    ['base-es6']: {
        'eslint-plugin-import': ''
    },
    vue: {
        'eslint-plugin-import': '',
        'eslint-plugin-vue': '',
        'eslint-plugin-html': ''
    },
    react: {
        'eslint-plugin-import': '',
        'eslint-plugin-react': '',
        'eslint-plugin-jsx-a11y': ''
    },
    node: {
        'eslint-plugin-import': '',
        'eslint-plugin-node': ''
    }
};
exports.configDeps = {
    ['base-es6']: {
        'eslint-config-airbnb-base': ''
    },
    vue: {
        'eslint-config-airbnb-base': ''
    },
    react: {
        'eslint-config-airbnb': ''
    },
    node: {
        'eslint-config-airbnb-base': ''
    },
    default: {
        'eslint-config-airbnb-base': ''
    }
};
exports.DeafultSharedEslintConfig = 'eslint-config-mfe';
