/**
 * @description 安装 eslint 相关依赖
 * @author lucaPeng
 */

import { installPackage, upgradePackage } from '../utils/npm_install';
import { DepConfig, commonDeps, pluginDeps, tsDeps, configDeps } from '../config';

const chalk = require('chalk');
const detectInstalled = require('detect-installed');

interface InstallResult {
  [index: string]: boolean;
}

/**
 * 安装具体的npm包
 * @param {String} packageName 包名
 * @param {*} version 版本
 */
async function installDep(packageName: string, version: string): Promise<boolean> {
  console.log(chalk.green(`${packageName}${version ? '@' + version : ''}`));
  if (await detectInstalled(packageName, { local: true })) {
    return await upgradePackage(packageName, version);
  } else {
    return await installPackage(packageName, version);
  }
}

/**
 * 安装具体依赖
 * @param deps 依赖集配置
 */
async function installDepList(deps: DepConfig): Promise<InstallResult> {
  const result: InstallResult = {};
  const keys = Object.keys(deps);
  for (let i = 0; i < keys.length; i++) {
    const dep = keys[i];
    result[dep] = await installDep(dep, deps[dep]);
  }
  return result;
}

/**
 * 安装工程所需依赖
 * @param {string} projectType 工程类型
 * @returns {Promise} 安装结果
 */
async function installDeps(projectType: string, supportTypeScript: boolean): Promise<InstallResult> {
  // install commonDeps
  const commonResult = await installDepList(commonDeps);
  // install pluginDeps
  let pluginResult = {};
  if (pluginDeps[projectType]) {
    pluginResult = await installDepList(pluginDeps[projectType]);
  }
  // install configDeps
  const configResult = await installDepList(configDeps[projectType] || configDeps.default);
  let tsResult = {};
  if (supportTypeScript) {
    tsResult = await installDepList(tsDeps);
  }
  return Object.assign(commonResult, pluginResult, configResult, tsResult);
}

export default installDeps;
