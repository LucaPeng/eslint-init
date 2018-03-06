/**
 * @author lucaPeng
 * @desc 获取包管理工具
 */

import fileUtil from './file';

const commandExists = require('command-exists');

async function getPmTool(packageName?: string): Promise<string> {
  let pmTool;
  try {
    if (await fileUtil.checkExist(`${process.cwd()}/yarn.lock`, false) && await commandExists('yarn')) {
      // 如果当前项目下有 yarn.lock 且 安装了 yarn
      pmTool = 'yarn';
    } else if (packageName && packageName[0] === '@' && await commandExists('mnpm')) {
      // 如果是有scope的包，用 mnpm
      pmTool = 'mnpm';
    } else {
      pmTool = 'npm';
    }
  } catch (err) {
    pmTool = 'npm';
  }
  return pmTool;
}

export default getPmTool;
