import * as winston from 'winston';

const CUSTOM_FORMAT = winston.format.combine(
  winston.format.timestamp({ format: 'MMMM DD YYYY hh:mm:ss' }),
  winston.format.printf(
    (info) => `[logger] [${info.level}] ${info['timestamp']}: ${info.message}`,
  ),
);

const CUSTOM_TRANSPORTS = [
  new winston.transports.File({
    dirname: './log/',
    filename: 'combined.log',
    level: 'info',
    format: winston.format.json(),
  }),
  new winston.transports.File({
    dirname: './log/',
    filename: 'errors.log',
    level: 'error',
    format: winston.format.json(),
  }),
  new winston.transports.Console({
    level: 'debug',
    stderrLevels: ['fatal'],
    format: winston.format.combine(winston.format.colorize({ all: true })),
  }),
];

const logger = winston.createLogger({
  transports: CUSTOM_TRANSPORTS,
  format: CUSTOM_FORMAT,
  exitOnError: true,
});

export const logRequest = (message: string): void => {
  logger.info(message);
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
): string => [
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

export const createFatalErrorLogMessage = (error: Error): string => `${error.name} ${error.message}`;
