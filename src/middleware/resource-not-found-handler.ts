import { writeFileSync } from 'fs';
import { finished } from 'stream';
//
import express from 'express';
import { StatusCodes } from 'http-status-codes';
//
import { createLogStrings, createErrorLogHeading } from './_service';

const logStyle = 'red.bold';

const resourceNotFoundHandler: express.RequestHandler = (req, res, next) => {
  if (res.statusCode !== StatusCodes.NOT_FOUND) {
    next();
  }

  const [dateTime, network] = createErrorLogHeading(req, StatusCodes.NOT_FOUND);
  const [logPlain, logColorized] = createLogStrings([
    [dateTime, logStyle],
    [network, logStyle],
    [`Not Found: Resource does not exist.`, logStyle],
  ]);

  res.status(StatusCodes.NOT_FOUND).send(logPlain);

  writeFileSync('error-log.txt', logPlain, {
    encoding: 'utf-8',
    flag: 'a',
  });

  finished(res, () => {
    setImmediate(() => {
      process.stdout.write(logColorized);
    });
  });
};

export default resourceNotFoundHandler;
