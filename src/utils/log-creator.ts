import chalk from 'chalk';

export default (arr: [str: string, style?: string][]): [string, string] => {
  const plain = arr.reduce((result, [str]) => `${result}${str}\n`, '');
  const colorized = arr.reduce((result, [str, style = 'white']) => {
    const section = chalk`{${style} ${str}}`;
    return `${result}${section}\n`;
  }, '');

  return [`${plain}\n`, `${colorized}\n`];
};
