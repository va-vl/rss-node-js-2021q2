import * as winston from 'winston';
//
import winstonConfig from './winston.config';

const logger = winston.createLogger(winstonConfig);

export const logRequest = (message: string): void => {
  logger.http(message);
};

export const logRequestError = (message: string): void => {
  logger.warn(message);
};

export const logFatalError = (message: string): void => {
  logger.error(message);
};

export const logDebug = (message: string): void => {
  logger.debug(message);
};

export const createRequestResponseMessage = (
  requestStart: Date,
  method: string,
  url: string,
  statusCode: number,
  queryParamsStr: string,
  bodyStr: string,
): string =>
  [
    `${method} ${url} ${statusCode} [${Date.now() - +requestStart} ms]`,
    `Query params: ${queryParamsStr}`,
    `Request body: ${bodyStr}`,
  ].join(' | ');

export const createRequestErrorResponseMessage = (
  method: string,
  url: string,
  statusCode: number,
  errorMessage: string,
): string => `${method} ${url} ${statusCode} | ${errorMessage}`;

export const createFatalErrorLogMessage = (error: Error): string =>
  `${error.name} ${error.message}`;
