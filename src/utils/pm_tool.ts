/**
 * @author lucaPeng
 * @desc 获取包管理工具
 */

import fileUtil from './file';
const commandExists = require('command-exists');

export default async function(packageName?: string): Promise<string> {
  let pmTool;
  if (await fileUtil.checkExist(process.cwd() + '/yarn.lock', false) && await commandExists('yarn')) {
    // 如果当前项目下有 yarn.lock 且 安装了 yarn
    pmTool = 'yarn';
  } else {
    // 如果是有scope的包，用 mnpm
    if (packageName && packageName[0] === '@') {
      pmTool = 'mnpm';
    } else {
      pmTool = 'npm'
    }
  }
  return pmTool;
};
