/**
 * @description 安装团队公用的 eslint 规范配置
 * @author lucaPeng
 */

const shell = require('shelljs');
const chalk = require('chalk');
import pmTool from '../utils/pm_tool';
import { DeafultSharedEslintConfig } from '../config';

const installConfig = async (sharedEslintConfig?: string) => {
  console.log(chalk.green('正在安装 eslint 配置集'));
  let dep = sharedEslintConfig || DeafultSharedEslintConfig;
  if (dep.indexOf('@') == -1 || dep.lastIndexOf('@') == 0) {
    dep = dep + '@latest';
  }
  const pmToolName = await pmTool(dep);  
  if (pmToolName === 'yarn') {
    shell.exec(`yarn add ${dep} --dev`, { silent: false });
  } else {
    shell.exec(`${pmToolName} install ${dep} --save-dev`, { silent: false });
  }
  console.log(chalk.green('eslint 配置集安装完成'));
};

export default installConfig;
