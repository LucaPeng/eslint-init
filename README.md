## eslint-init

Fast & simple integrate eslint into your project and your git flow.

Support es6, node, react, and vue project.

## Installament & Usage

install
``` 
  yarn add eslint-lint
  // npm install eslint-lint
```

use
```
  const eslintInit = require('eslint-init');
  eslintInit({
    type: 'node',
    ciSolution: eslintInit.CiSolution.husky
  });
```

## CLI

install globally
```
  npm install eslint-init -g
```

proceed
```
  eslint-init --node
```
under your project path;

Please use --react --vue --es6 to specify the type,

and add `--ts` param in command to support ts, add `--silent` to be silent.

what's more, defaultly use husky as ci solution.