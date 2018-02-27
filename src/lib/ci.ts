/**
 * @author lucaPeng
 * @desc integrate eslint into ci flow, provide husky & mfe solutions
 */

import { installPackage } from '../utils/npm_install';
import { DepConfig, mfeCiDeps, huskyCiDeps } from '../config';
import * as fs from 'fs';
import fileUtil from '../utils/file';

const chalk = require('chalk');

export enum CiSolution {
  none = 1,
  husky,
  mfe,
}

/**
 * 安装所需依赖
 * @param deps 依赖信息
 */
async function installDeps(deps: DepConfig) {
  const result: {
    [index: string]: boolean
  } = {};
  const keys = Object.keys(deps);
  for (let i = 0; i < keys.length; i++) {
    const dep = keys[i];
    result[dep] = await installPackage(dep, deps[dep]);
  }
}

/**
 * 配置 package.json
 * @param eslintPath eslint检查路径
 */
function configPackage(eslintPath: string) {
  const packagePath = `${process.cwd()}/package.json`;
  const packageExist = fileUtil.checkExist(packagePath, false);
  if (packageExist) {
    // 如果package.json存在，进行修改
    const fileContent = fs.readFileSync(packagePath, 'utf-8');
    const fileJSON = JSON.parse(fileContent);
    // 增加 precommit hook
    fileJSON.scripts = Object.assign(fileJSON.scripts || {}, {
      precommit: 'lint-staged',
    });
    // 配置 lint-staged
    fileJSON['lint-staged'] = {
      [eslintPath]: 'eslint',
    };
    const fileNewContent = JSON.stringify(fileJSON, null, 2);
    // 写入
    fs.writeFileSync(packagePath, fileNewContent);
    console.log(chalk.bgYellow(`当前lint文件为"${eslintPath}",可根据项目具体情况调整(见package.json)`));
  } else {
    // 如果 package.json 不存在，初始化失败，提示用户进行 npm 初始化
    console.log(chalk.red('ERROR: 未找到package.json文件，请使用 npm init 进行初始化'));
    process.exit(1);
  }
}

/**
 * 集成eslint到工作流中
 * @param solutionType 解决方案类型
 * @param projectType 项目类型
 */
export async function interEslintToCI(solutionType: CiSolution, projectType: string, supportTypeScript: boolean) {
  if (solutionType === CiSolution.mfe) {
    await installDeps(mfeCiDeps);
  } else {
    await installDeps(huskyCiDeps);
    const suffix = ['js'];
    if (projectType === 'vue') {
      suffix.push('vue');
    } else if (projectType === 'react') {
      suffix.push('jsx');
    }
    if (supportTypeScript) {
      suffix.push('ts');
      if (projectType === 'react') {
        suffix.push('tsx');
      }
    }
    const eslintPath = `*.${suffix.length > 1 ? `{${suffix.join(',')}}` : suffix[0]}`;
    configPackage(eslintPath);
  }
}
