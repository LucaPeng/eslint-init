const chalk = require('chalk');
import installDeps from './lib/installDeps';
import installConfig from './lib/installConfig';
import configEslint from './lib/config';

enum CiSolution {
  husky = 1,
  mfe
}

interface EslintConfig {
  type: string,
  ciSolution: CiSolution,
  sharedEslintConfig?: string
}

module.exports = {
  CiSolution,
  async init(config: EslintConfig) {
    const { type: projectType, ciSolution, sharedEslintConfig } = config;
    // 安装相关依赖
    console.log(chalk.green('正在安装 eslint 相关依赖 ...'));
    await installDeps(projectType);
    console.log(chalk.green('eslint 依赖安装完成'));
    console.log(chalk.green('正在配置 eslint...'));
    // 安装eslint 配置包
    installConfig(sharedEslintConfig);
    // 配置 eslint
    await configEslint(projectType, sharedEslintConfig);
    console.log(chalk.green('eslint 配置完成'));
    console.log(chalk.green('正在设置持续集成检查方案'));
    // 配置 package.json
    // const options = {
    //   eslintPath: typeof argv.path === 'string' ? argv.path : 'src/**/*.{js,vue}'
    // };
    // console.log(chalk.green('开始配置package.json...'));
    // packageConfiger.configPackage(options);
    // console.log(chalk.green('持续集成检查方案配置成功'));
    console.log(chalk.green('eslint初始化完成, happy coding~'));
  }
};
