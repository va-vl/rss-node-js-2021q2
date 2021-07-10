import * as winston from 'winston';
//
import winstonConfig from '../common/winston.config';

export const logger = winston.createLogger(winstonConfig);

export const logRequestResponse = (
  level: string,
  requestStart: Date,
  method: string,
  url: string,
  statusCode: number,
  queryParamsString: string,
  bodyString: string,
  errorMessage?: string,
) => {
  const messageParts = [
    `${method} ${url} [${statusCode}] [${Date.now() - +requestStart} ms]`,
    `query params: ${queryParamsString}`,
  ];

  if (bodyString !== 'null') {
    messageParts.push(`body: ${bodyString}`);
  }

  if (errorMessage) {
    messageParts.push(errorMessage);
  }

  logger.log(level, messageParts.join(' | '));
};

export const logFatalError = (comment: string, error: Error): void => {
  logger.error(`${comment}: ${error.name} ${error.message}`);
};

export const logDebug = (message: string): void => {
  logger.debug(message);
};
