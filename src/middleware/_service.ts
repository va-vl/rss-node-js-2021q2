import { writeFileSync } from 'fs';
//
import express from 'express';
import chalk from 'chalk';

const writeToFile = (filePath: string, text: string) => {
  writeFileSync(filePath, text, {
    encoding: 'utf-8',
    flag: 'a',
  });
};

export const createLogStrings = (
  arr: [str?: string, style?: string][]
): [string, string] => {
  const plain = arr.reduce((result, [str]) => `${result}${str}\n`, '');
  const colorized = arr.reduce((result, [str, style = 'white']) => {
    if (str === undefined) {
      return result;
    }
    const section = chalk`{${style} ${str}}`;
    return `${result}${section}\n`;
  }, '');

  return [`${plain}\n`, `${colorized}\n`];
};

export const createErrorLogHeading = (
  req: express.Request,
  code: number
): [string, string] => {
  const { method, url } = req;
  const responseTime = new Date();
  return [
    `${responseTime.toLocaleDateString()} ${responseTime.toLocaleTimeString()}`,
    `${method} ${url} ${code}`,
  ];
};

export const logMessage = (
  plainMessage: string,
  colorizedMessage: string,
  filePath = 'request-log.txt'
): void => {
  writeToFile(filePath, plainMessage);
  process.stdout.write(colorizedMessage);
};

export const logUnhandledError = (
  plainMessage: string,
  colorizedMessage: string,
  filePath = 'error-log.txt'
): void => {
  writeToFile(filePath, plainMessage);
  process.stderr.write(colorizedMessage);
};
