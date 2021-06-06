import { finished } from 'stream';
//
import express from 'express';
import { StatusCodes } from 'http-status-codes';
//
import { createRequestErrorLogs, writeToFile } from '../logger';

const createMessage = (method: string, url: string): string =>
  `Not Found: Resource ${method} ${url} does not exist.`;

const resourceNotFoundHandler: express.RequestHandler = (req, res, next) => {
  if (res.statusCode !== StatusCodes.NOT_FOUND) {
    next();
  }

  const { method, url } = req;
  const { statusCode } = res;
  const [plainLog, colorizedLog] = createRequestErrorLogs(
    method,
    url,
    statusCode,
    createMessage(method, url)
  );

  res.status(StatusCodes.NOT_FOUND).send(plainLog);

  finished(res, () => {
    setImmediate(() => {
      writeToFile('log-combined.log', plainLog);
      writeToFile('log-request-errors.log', plainLog);
      process.stdout.write(colorizedLog);
    });
  });
};

export default resourceNotFoundHandler;
