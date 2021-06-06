import { createFatalErrorLogs, writeToFile } from './logger';

export default (): void => {
  process.on('uncaughtException', (err) => {
    const [plainLog, colorizedLog] = createFatalErrorLogs(err);
    writeToFile('./logs/combined.log', plainLog);
    writeToFile('./logs/fatal-errors.log', plainLog);
    process.stderr.write(colorizedLog);
    process.exit(1);
  });

  process.on('unhandledRejection', (_, promise) => {
    promise.catch((err) => {
      const [plainLog, colorizedLog] = createFatalErrorLogs(err);
      writeToFile('./logs/combined.log', plainLog);
      writeToFile('./logs/fatal-errors.log', plainLog);
      process.stderr.write(colorizedLog);
      process.exit(1);
    });
  });
};
