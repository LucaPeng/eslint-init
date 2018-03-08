#!/usr/bin/env node --harmony

const params = process.argv.slice(2);
let index = 0;
const initer = require('../scripts/index');

let method;
let projectType;
if (params[0] == 'init' || params[0] == 'update') {
  method = params[0];
  index++;
} else {
  method = 'init';
}

var projectTypeMap = {
  '--react': 'react',
  '--vue': 'vue',
  '--node': 'node',
  '--es6': 'es6'
};

let typescript = false;
let silence = false;

for(;index < params.length; index++) {
  var param = params[index];
  if (param === '--ts' || param === '--typescript') {
    typescript = true;
  } else if (param === '--silence') {
    silence = true;
  } else if(projectTypeMap[param]) {
    if (projectType) {
      console.log('project type must be single, es6、vue、react、nodejs are supported');
    } else {
      projectType = projectTypeMap[param];
    }
  }
}

projectType = projectType || 'es6';
initer.init({
  type: projectType,
  ciSolution: initer.CiSolution.husky,
  supportTypeScript: typescript,
  silence: silence,
});
