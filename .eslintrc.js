//https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  extends: [
    'eslint-config-mfe/eslintrc.node.js',
    'eslint-config-mfe/eslintrc.typescript-node.js'
  ],
  rules: {
    indent: [2, 2],
    'no-console': 0
  }
};
