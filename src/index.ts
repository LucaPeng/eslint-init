import installDeps from './lib/installDeps';
import installConfig from './lib/installConfig';
import configEslint from './lib/config';
import context from './lib/context';
import { getConsisLogger } from './lib/logger';
import { CiSolution, interEslintToCI } from './lib/ci';
import { DepConfig } from './config';

const chalk = require('chalk');


interface EslintConfig {
  type: string;
  supportTypeScript: boolean;
  ciSolution: CiSolution;
  silent?: boolean;
  sharedEslintConfig?: DepConfig;
  pmTool?: string;
}

module.exports = {
  CiSolution,
  async init(config: EslintConfig) {
    const {
      type: projectType,
      supportTypeScript,
      ciSolution,
      sharedEslintConfig,
      silent,
      pmTool,
    } = config;
    context.silent = silent || false;
    const log = getConsisLogger(silent);
    try {
      // 安装相关依赖
      log(chalk.green('正在安装 eslint 相关依赖 ...'));
      await installDeps(projectType, supportTypeScript, pmTool);
      log(chalk.green('eslint 依赖安装完成'));
      log(chalk.green('正在配置 eslint...'));
      // 安装eslint 配置包
      await installConfig(sharedEslintConfig, pmTool);
      // 配置 eslint
      await configEslint(projectType, supportTypeScript, sharedEslintConfig);
      log(chalk.green('eslint 配置完成'));
      log(chalk.green('正在设置持续集成检查方案'));
      // 配置 package.json
      log(chalk.green('开始配置package.json...'));
      await interEslintToCI(ciSolution, projectType, supportTypeScript, pmTool);
      log(chalk.green('持续集成检查方案配置成功'));
      log(chalk.green('eslint初始化完成, happy coding~'));
      return true;
    } catch (err) {
      log(chalk.red('ESLint 配置接入失败'));
      log(err);
      return err;
    }
  },
};
