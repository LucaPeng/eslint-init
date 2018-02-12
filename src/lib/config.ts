/**
 * @description set eslintrc.js config
 * @author songpeng02
 */

const chalk = require('chalk');
const fs = require('fs');
import question from '../utils/question';
import fileUtil from '../utils/file';
import { DeafultSharedEslintConfig, DepConfig } from '../config';

/**
 * 配置 eslintrc.js 文件的内容
 * 如果存在 eslintrc.js，只修改 extends 字段
 * 如果不存在 eslintrc.js，提供默认的 eslintrc.js 文件
 * @param projectType 工程类型
 * @param sharedEslintConfig 共享的eslint规则集
 */
export default async function (projectType: string, sharedEslintConfig?: DepConfig) {
  const eslintRcPath = process.cwd() + '/.eslintrc.js';
  const exsit = await fileUtil.checkExist(eslintRcPath, false);
  let configDep = sharedEslintConfig || DeafultSharedEslintConfig;
  const packageName = Object.keys(configDep)[0];
  const eslintConfigPath = `'${packageName}/eslintrc.${projectType}.js'`;
  const eslintConfigContent = `//https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  extends: ${eslintConfigPath}
}`;
  if (exsit) {
    // 存在 eslint 配置文件, 询问是否扩展
    await question('eslint配置文件已存在，是否要增加团队标准配置扩展(Y/n)').then((ans: string) => {
      if (ans !== 'n') {
        console.log(chalk.green('更新当前 eslintrc.js 配置文件，增加 extend...'));
        const modifyResult = fileUtil.syncModifyFile(eslintRcPath, 'utf-8', /(?<=extends:\s)('[^']+'|\[[^]+\])/, eslintConfigPath);
        if (modifyResult === true) {
          console.log(chalk.green('eslintrc.js 配置文件更新完成'));
        } else {
          console.log(chalk.red('eslintrc.js 配置文件更新失败，请查看具体的错误信息'));
          process.exit(1);
        }
      }
    });
  } else {
    const eslintRcOld = process.cwd() + '/.eslintrc';
    const oldExsit = await fileUtil.checkExist(eslintRcOld, false);
    if (oldExsit) {
      // 存在 .eslintrc 文件，该配置方式已被废弃，升级到 .eslintrc.js 的配置方式
      const choice = await question('检查到已废弃的配置方式 .eslintrc, 是否升级为 .eslintrc.js, 原有配置会被迁移(Y/n)');
      if (choice !== 'n') {
        try {
          const fileContent = fs.readFileSync(eslintRcOld, 'utf-8');
          const fileJSON = JSON.parse(fileContent);
          // 增加 precommit hook
          const newFileJSON = Object.assign({
            extends: eslintConfigPath
          }, fileJSON);
          if (newFileJSON && newFileJSON.rules) {
            const choiceToDeleteOldRules = await question('检测到存在已有的 eslint 规则，是否保留Y/n?');
            if (choiceToDeleteOldRules === 'n') {
              delete newFileJSON.rules;
            }
          }
          const newFileContent = 'module.exports = ' + JSON.stringify(newFileJSON, null, 2) + ';\n';
          fs.writeFileSync(eslintRcPath, newFileContent);
          // fs.unlinkSync(eslintRcOld);
          console.log(chalk.green('eslint 配置升级并更新完成，please check for sure'));
        } catch (e) {
          console.log(chalk.red('自动升级失败，请手动升级'), e);
        }
      } else {
        console.log(chalk.red('放弃升级eslint配置，请手动进行eslint配置'));
      }
    } else {
      // 不存在 eslint 配置文件, copy 模板到新建 eslintrc.js 文件
      console.log(chalk.green('检测到该项目尚无 eslint 配置文件'));
      console.log(chalk.green('复制标准 eslintrc 配置模板到项目空间...'));
      fs.writeFileSync(process.cwd() + '/.eslintrc.js', eslintConfigContent, 'utf-8');
      console.log(chalk.green('eslint配置完成'));
    }
  }
};
