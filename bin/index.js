#!/usr/bin/env node

const params = process.argv.slice(2);
let index = 0;
const initer = require('../dist/index');

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

for(;index < params.length; index++) {
  var param = params[index];
  if(projectTypeMap[param]) {
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
  ciSolution: initer.CiSolution.husky
});