export interface DepConfig {
  [index: string]: string
}

export const commonDeps: DepConfig = {
  'eslint': '^4.9.0',
  'babel-eslint': ''
};

export const pluginDeps: {
  [index: string]: DepConfig
} = {
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

export const configDeps: {
  [index: string]: DepConfig
} = {
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

export const DeafultSharedEslintConfig = 'eslint-config-mfe';
