import { utilities } from 'nest-winston';
import * as winston from 'winston';

export default {
  transports: [
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
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    utilities.format.nestLike(),
  ),
  exitOnError: true,
};
