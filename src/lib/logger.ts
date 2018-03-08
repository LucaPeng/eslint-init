// 日志打印
export const logger = (silent: boolean) => (content: any) => {
  if (!silent && content) {
    console.log(content);
  }
};

let consisLogger: Function;

export const getConsisLogger = (silent: boolean = false) => {
  if (!consisLogger) {
    consisLogger = logger(silent);
  }
  return consisLogger;
};
