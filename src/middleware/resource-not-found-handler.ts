import { finished } from 'stream';
//
import express from 'express';
import { StatusCodes } from 'http-status-codes';
//
import { createRequestErrorLogs, writeToFile } from '../logger';

const message = 'Not Found: Resource does not exist.';

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
    message
  );

  res.status(StatusCodes.NOT_FOUND).send(plainLog);

  finished(res, () => {
    writeToFile('./logs/combined.log', plainLog);
    writeToFile('./logs/request-errors.log', plainLog);
    process.stdout.write(colorizedLog);
  });
};

export default resourceNotFoundHandler;
