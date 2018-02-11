/**
 * @description 安装 eslint 相关依赖
 * @author lucaPeng
 */

const shell = require('shelljs');
const chalk = require('chalk');
const detectInstalled = require('detect-installed');
import pmTool from '../utils/pm_tool';
import { DepConfig, commonDeps, pluginDeps, configDeps } from '../config';

interface InstallResult {
  [index: string]: boolean
}

/**
 * 安装具体的npm包
 * @param {String} packageName 包名
 * @param {*} version 版本
 */
async function installDep(packageName: string, version: string): Promise<boolean> {
  console.log(chalk.green(`${packageName}${version ? '@' + version : ''}`));
  try {
    const pmToolName = await pmTool(packageName);
    const packageStr = `${packageName}${version ? '@' + version : '@latest'}`;
    if (await detectInstalled(packageName, {local: true})) {
      if (pmToolName === 'yarn') {
        shell.exec(`yarn upgrade ${packageStr}`, { silent: false });
      } else {
        shell.exec(`${pmToolName} install ${packageStr} --save-dev`, { silent: false });
      }
    } else {
      if (pmToolName === 'yarn') {
        shell.exec(`yarn add ${packageStr} --dev`, { silent: false });
      } else {
        shell.exec(`${pmToolName} install ${packageStr} --save-dev`, { silent: false });
      }
    }
  } catch (e) {
    console.log(chalk.red(`fail to install ${packageName}`), e);
    return false;
  }
  return true;
}

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
 * 安装所需依赖
 * @param {Object} config 依赖配置
 */
async function installDeps(projectType: string): Promise<InstallResult> {
  // install commonDeps
  const commonResult = await installDepList(commonDeps);
  // install pluginDeps
  let pluginResult = {};
  if (pluginDeps[projectType]) {
    pluginResult = await installDepList(pluginDeps[projectType])
  }
  // install configDeps
  const configResult = await installDepList(configDeps[projectType] || configDeps.default);
  return Object.assign(commonResult, pluginResult, configResult);
}

export default installDeps;
