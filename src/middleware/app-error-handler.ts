import { writeFileSync } from 'fs';
import { finished } from 'stream';
//
import express from 'express';
import { StatusCodes } from 'http-status-codes';
//
import { createErrorLogHeading, createLogStrings } from './_service';

interface HandledError extends Error {
  code?: string;
}

const appErrorStyle = 'red.bold';

const appErrorHandler = (
  err: HandledError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const handleAppError = (code: number): void => {
    const [dateTime, network] = createErrorLogHeading(req, code);
    const [logPlain, logColorized] = createLogStrings([
      [dateTime, appErrorStyle],
      [network, appErrorStyle],
      [err.message, appErrorStyle],
    ]);

    res.status(code).send(logPlain);

    writeFileSync('error-log.txt', logPlain, {
      encoding: 'utf-8',
      flag: 'a',
    });

    finished(res, () => {
      process.stdout.write(logColorized);
    });
  };

  switch (err.code) {
    case 'ERR_ENTITY_NOT_FOUND': {
      handleAppError(StatusCodes.NOT_FOUND);
      break;
    }
    case 'ERR_INVALID_OPERATION': {
      // TODO: change code to StatusCodes.BAD_REQUEST after cross-check
      handleAppError(StatusCodes.INTERNAL_SERVER_ERROR);
      break;
    }
    case 'ERR_CUSTOM_ERROR':
    case 'ERR_DATA_CORRUPTED': {
      handleAppError(StatusCodes.INTERNAL_SERVER_ERROR);
      break;
    }
    default: {
      next(err);
    }
  }
};

export default appErrorHandler;
