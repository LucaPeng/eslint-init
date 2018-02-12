/**
 * @description 安装团队公用的 eslint 规范配置
 * @author lucaPeng
 */

const shell = require('shelljs');
const chalk = require('chalk');
import { installPackage } from '../utils/npm_install';
import { DeafultSharedEslintConfig, DepConfig } from '../config';

/**
 * 安装共享的 ESLint 规则集
 * @param sharedEslintConfig 共享的 ESLint 规则集
 */
const installConfig = async (sharedEslintConfig?: DepConfig) => {
  console.log(chalk.green('正在安装 eslint 配置集'));
  let configDep = sharedEslintConfig || DeafultSharedEslintConfig;
  const packageName = Object.keys(configDep)[0];
  const version = configDep[packageName];
  const result = await installPackage(packageName, version);
  console.log(chalk.green('eslint 配置集安装完成'));
  return result;
};

export default installConfig;
