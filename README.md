## eslint-init

Fast & simple integrate eslint into your project and your git flow.

Support es6, node, react, vue project, and typescript.

## Installament & Usage

install
``` 
  yarn add eslint-lint
  // npm install eslint-lint
```

use
```
  const eslintInit = require('eslint-init');
  eslintInit.init({
    type: 'node',
    silent: false,
    supportTypeScript: false,
    ciSolution: eslintInit.CiSolution.husky
  });
```

you can use the sharable eslint config maintained by yourself, use the sharedEslintConfig like: 

```
  eslintInit.init({
    type: 'node',
    ciSolution: eslintInit.CiSolution.husky,
    sharedEslintConfig: {
      'eslint-config-mfe': '0.0.7'
    }
  });
```

Only need to make sure it has same structure with [eslint-config-mfe](https://www.npmjs.com/package/eslint-config-mfe) to make the generated eslintrc config effective!!!

you can use the package management tool you want, like npm、cnpm、yarn。

add pmTool to config, like 

```
{
  pmTool: 'yarn'
}
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