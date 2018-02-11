const readline = require('readline');

/**
 * 借助 readline 进行命令行询问式交互功能的promise化
 * @param {String} query 询问内容
 * @return {Promise} 延迟结果，用户的输入反馈
 */
export default function question(query: string): Promise<string> {
  return new Promise(function(resolve) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(query, (ans: string) => {
      rl.close();
      resolve(ans);
    });
  });
};
