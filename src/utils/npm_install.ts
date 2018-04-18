/**
 * @author lucaPeng
 * @desc install npm package
 */

import pmTool from './pm_tool';
import * as shell from 'shelljs';
import { getConsisLogger } from '../lib/logger';
import context from '../lib/context';

/**
 * 安装npm包
 * @param packageName 包名称
 * @param version 版本号，如果没有设置版本，默认安装最新版本
 */
export async function installPackage(packageName: string, version?: string, assignPmTool?: string) {
  const pmToolName = assignPmTool || await pmTool(packageName);
  const packageStr = `${packageName}${version ? `@${version}` : '@latest'}`;
  try {
    if (pmToolName === 'yarn') {
      shell.exec(`yarn add ${packageStr} --dev`, { silent: context.silent });
    } else {
      shell.exec(`${pmToolName} install ${packageStr} --save-dev --save-exact`, { silent: context.silent });
    }
  } catch (e) {
    const log = getConsisLogger();
    log(e);
    return false;
  }
  return true;
}

/**
 * 升级npm包
 * @param packageName 包名称
 * @param version 版本号，如果没有设置版本，不指定版本号升级，按默认规则
 */
export async function upgradePackage(packageName: string, version?: string, assignPmTool?: string) {
  const pmToolName = assignPmTool || await pmTool(packageName);
  const packageStr = `${packageName}${version ? `@${version}` : ''}`;
  try {
    if (pmToolName === 'yarn') {
      shell.exec(`yarn upgrade ${packageStr} --dev`, { silent: context.silent });
    } else {
      if (version) {
        shell.exec(`${pmToolName} install ${packageStr} --save-dev --save-exact`, { silent: context.silent });
      } else {
        shell.exec(`${pmToolName} update ${packageStr}`, { silent: context.silent });
      }
    }
  } catch (e) {
    const log = getConsisLogger();
    log(e);
    return false;
  }
  return true;
}
