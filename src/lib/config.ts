/**
 * @description set eslintrc.js config
 * @author songpeng02
 */

import question from '../utils/question';
import fileUtil from '../utils/file';
import { DeafultSharedEslintConfig, DepConfig } from '../config';
// import * as _ from 'lodash';
import { getConsisLogger } from './logger';

const chalk = require('chalk');
const fs = require('fs');

function hasSpecialTsConfig(projectType: string): boolean {
  return ['node', 'react'].indexOf(projectType) > -1;
}

function getEslintExtendsConfig(packageName: string, projectType: string, supportTypeScript: boolean) {
  let result;
  if (!supportTypeScript) {
    result = `[
    '${packageName}/eslintrc.${projectType}.js'
  ]`;
  } else {
    result = `[
    '${packageName}/eslintrc.${projectType}.js',
    '${packageName}/eslintrc.typescript${hasSpecialTsConfig(projectType) ? `-${projectType}` : ''}.js'
  ]`;
  }
  return result;
}

/**
 * 配置 eslintrc.js 文件的内容
 * 如果存在 eslintrc.js，只修改 extends 字段
 * 如果不存在 eslintrc.js，提供默认的 eslintrc.js 文件
 * @param projectType 工程类型
 * @param sharedEslintConfig 共享的eslint规则集
 */
async function configEslintRC(projectType: string, supportTypeScript: boolean, sharedEslintConfig?: DepConfig) {
  const eslintRcPath = `${process.cwd()}/.eslintrc.js`;
  const exsit = await fileUtil.checkExist(eslintRcPath, false);
  const configDep = sharedEslintConfig || DeafultSharedEslintConfig;
  const packageName = Object.keys(configDep)[0];
  const eslintConfigPath = getEslintExtendsConfig(packageName, projectType, supportTypeScript);
  const log = getConsisLogger();
  const eslintConfigContent = `//https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  extends: ${eslintConfigPath}
}`;
  // 根据优先级规则，eslintrc.js 的优先级最高，如果该项目目前不存在 eslintrc.js,
  // 则生成 eslintrc.js 作为最优配置文件，以优先级覆盖其他配置
  // 旧的配置文件不进行处理，也不进行规则的拷贝处理
  if (exsit) {
    // 存在 eslint 配置文件, 询问是否扩展
    await question('eslint配置文件已存在，是否要增加团队标准配置扩展(Y/n)').then((ans: string) => {
      if (ans !== 'n') {
        log(chalk.green('更新当前 eslintrc.js 配置文件，增加 extend...'));
        const modifyResult = fileUtil.syncModifyFile(eslintRcPath, 'utf-8', /(?<=["']?extends["']?:\s)('[^']+?'|"[^"]+?"|\[[^]+?\])/, eslintConfigPath);
        if (modifyResult === 1) {
          log(chalk.green('eslintrc.js 配置文件更新完成'));
        } else if (modifyResult === 0) {
          const addExtendsResult = fileUtil.syncModifyFile(eslintRcPath, 'utf-8', /(?<=module.exports[\s]?=[\s]?{)/, `
  extends: ${eslintConfigPath},`);
          if (addExtendsResult === 1) {
            log(chalk.green('eslintrc.js 配置文件更新完成'));
          } else {
            log(chalk.red('eslintrc.js 配置文件更新失败，请查看具体的错误信息'));
            throw (new Error('fail to update eslintrc.js'));
          }
        } else {
          log(chalk.red('eslintrc.js 配置文件更新失败，请查看具体的错误信息'));
          throw (new Error('fail to update eslintrc.js'));
        }
      }
    });
  } else {
    // const eslintRcOld = `${process.cwd()}/.eslintrc`;
    // const oldExsit = await fileUtil.checkExist(eslintRcOld, false);
    // if (oldExsit) {
    //   // 存在 .eslintrc 文件，该配置方式已被废弃，升级到 .eslintrc.js 的配置方式
    //   const choice = await question('检查到已废弃的配置方式 .eslintrc, 是否升级为 .eslintrc.js, 原有配置会被迁移(Y/n)');
    //   if (choice !== 'n') {
    //     const fileContent = fs.readFileSync(eslintRcOld, 'utf-8');
    //     const fileJSON = JSON.parse(fileContent);
    //     // 增加 precommit hook
    //     const newFileJSON = _.assign({
    //       extends: eslintConfigPath,
    //     }, fileJSON);
    //     if (newFileJSON && newFileJSON.rules) {
    //       const choiceToDeleteOldRules = await question('检测到存在已有的 eslint 规则，是否保留Y/n?');
    //       if (choiceToDeleteOldRules === 'n') {
    //         delete newFileJSON.rules;
    //       }
    //     }
    //     const newFileContent = `module.exports = ${JSON.stringify(newFileJSON, null, 2)};\n`;
    //     fs.writeFileSync(eslintRcPath, newFileContent);
    //     // fs.unlinkSync(eslintRcOld);
    //     log(chalk.green('eslint 配置升级并更新完成，please check for sure'));
    //   } else {
    //     console.log(chalk.red('放弃升级eslint配置，请手动进行eslint配置'));
    //   }
    // } else {
    // 不存在 eslint 配置文件, copy 模板到新建 eslintrc.js 文件
    log(chalk.green('检测到该项目尚无 eslintrc.js 配置文件'));
    log(chalk.green('复制标准 eslintrc.js 配置模板到项目空间...'));
    fs.writeFileSync(`${process.cwd()}/.eslintrc.js`, eslintConfigContent, 'utf-8');
    log(chalk.green('eslint配置完成'));
    log(chalk.bkGreen('如果该项目中已经存在 eslintrc.js 之外的其他eslint配置文件，可以删除~'));
    // }
  }
}

export default configEslintRC;
