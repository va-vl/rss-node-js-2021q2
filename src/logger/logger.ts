import winston from 'winston';

const CUSTOM_LEVELS = {
  levels: {
    fatal: 0,
    error: 1,
    info: 2,
    debug: 3,
    silly: 4,
  },
  colors: {
    fatal: 'bold red',
    error: 'italic yellow',
    info: 'green',
    debug: 'blue',
    silly: 'magenta',
  },
};

winston.addColors(CUSTOM_LEVELS.colors);

const CUSTOM_FORMAT = winston.format.combine(
  winston.format.timestamp({ format: 'MMMM DD YYYY hh:mm:ss' }),
  winston.format.label({ label: '[logger]' }),
  winston.format.printf(
    (info) =>
      `${info['label']} ${info['timestamp']} ${info.level}: ${info.message}`
  )
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
    level: 'info',
    stderrLevels: ['fatal'],
    format: winston.format.combine(winston.format.colorize({ all: true })),
  }),
];

const logger = winston.createLogger({
  level: 'info',
  levels: CUSTOM_LEVELS.levels,
  transports: CUSTOM_TRANSPORTS,
  format: CUSTOM_FORMAT,
  exitOnError: true,
});

export const logRequest = (message: string): void => {
  logger.log('info', message);
};

export const logRequestError = (message: string): void => {
  logger.log('error', message);
};

export const logFatalError = (message: string): void => {
  logger.log('fatal', message);
};
