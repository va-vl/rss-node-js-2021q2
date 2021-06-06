import { resolve } from 'path';
import { writeFileSync } from 'fs';
//
import chalk from 'chalk';

type LogsConfig = [string, string?][];

export const createLogLine = (...str: string[]): string => str.join(' | ');

export const createColorizedLog = (arr: LogsConfig): string =>
  `${arr.reduce((result, [str, style = 'white']) => {
    const section = chalk`{${style} ${str}}`;
    return `${result}${section}\n`;
  }, '')}\n`;

export const createPlainLog = (arr: string[][]): string =>
  `${arr.reduce(
    (result, lineElements) => `${result}${createLogLine(...lineElements)}\n`,
    ''
  )}\n`;

export const writeToFile = (filePath: string, text: string): void => {
  writeFileSync(resolve(filePath), text, {
    encoding: 'utf-8',
    flag: 'a',
  });
};

export const createDateTimeLine = (date: Date): string =>
  `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

export const STYLE = {
  REQUEST_SUCCESS: 'green',
  REQUEST_ERROR: 'yellow',
  FATAL_ERROR: 'red.bold',
};
