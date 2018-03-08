// 日志打印
export const logger = (silence: boolean) => (content: any) => {
  if (!silence && content) {
    console.log(content);
  }
};

let consisLogger: Function;

export const getConsisLogger = (silence: boolean = false) => {
  if (!consisLogger) {
    consisLogger = logger(silence);
  }
  return consisLogger;
};
