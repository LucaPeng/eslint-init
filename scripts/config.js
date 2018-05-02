"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonDeps = {
    eslint: '4.17.0',
    'babel-eslint': '8.2.1',
};
exports.pluginDeps = {
    'base-es6': {
        'eslint-plugin-import': '2.8.0',
    },
    es6: {
        'eslint-plugin-import': '2.8.0',
    },
    vue: {
        'eslint-plugin-import': '2.8.0',
        'eslint-plugin-vue': '4.2.2',
        'eslint-plugin-html': '4.0.2',
    },
    react: {
        'eslint-plugin-import': '2.8.0',
        'eslint-plugin-react': '7.6.1',
        'eslint-plugin-jsx-a11y': '6.0.3',
    },
    'react-native': {
        'eslint-plugin-import': '2.8.0',
        'eslint-plugin-react': '7.6.1',
        'eslint-plugin-jsx-a11y': '6.0.3',
        'eslint-plugin-react-native': '3.2.1',
    },
    node: {
        'eslint-plugin-import': '2.8.0',
        'eslint-plugin-node': '6.0.0',
    },
};
exports.configDeps = {
    react: {
        'eslint-config-airbnb': '16.1.0',
    },
    'react-native': {
        'eslint-config-airbnb': '16.1.0',
    },
    default: {
        'eslint-config-airbnb-base': '12.1.0',
    },
};
exports.tsDeps = {
    'typescript-eslint-parser': '15.0.0',
    'eslint-plugin-typescript': '0.8.1',
};
exports.DeafultSharedEslintConfig = {
    'eslint-config-mfe': '',
};
exports.mfeCiDeps = {
    '@mfe/precommit-eslint': '1.0.9',
};
exports.huskyCiDeps = {
    husky: '0.14.3',
    'lint-staged': '6.1.0',
};
