import * as winston from 'winston';
//
import winstonConfig from '../common/winston.config';

const logger = winston.createLogger(winstonConfig);

export const logFatalError = (comment: string, error: Error): void => {
  logger.error(`${comment}: ${error.name} ${error.message}`);
};

export const logDebug = (message: string): void => {
  logger.debug(message);
};
